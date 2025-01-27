import { Request, Response, NextFunction } from 'express-serve-static-core';
import jwt from "jsonwebtoken";
import { expressjwt } from 'express-jwt';
import dotenv from "dotenv";
import mongoose from 'mongoose';

import { User } from "../models/user.model";
import { RequestCustom } from '../types/request';
import { getMongooseObjectId } from '../helpers/getMongooseObjectId';

dotenv.config();

interface SignInRequestBody {
  email: string;
  password: string;
}

interface UserResponse {
  _id: string;
  name: string;
  email: string;
}

const signin = async (req: RequestCustom, res: Response): Promise<void> => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(401).json({
        error: "User not found",
      });
      return; // Ensure no further processing happens after the response is sent
    }

    if (!user.authenticate(req.body.password)) {
      res.status(401).json({
        error: "Email and password don't match",
      });
      return; // Ensure no further processing happens after the response is sent
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);

    res.cookie("t", token, {
      expires: new Date(Date.now() + 9999),
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not sign in",
    });
  }
};

const signout = (request: RequestCustom, response: Response): void => {
  // Clear the cookie 't'
  response.clearCookie("t");

  // Return a JSON response indicating the user has signed outs
  response.status(200).json({
    message: "signed out",
  });
};

const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET as string, // Ensure that `JWT_SECRET` is always a string
  algorithms: ['HS256'],
  userProperty: 'auth',  // Attach the decoded JWT payload to `req.auth`

} as any);

const hasAuthorization = (request: RequestCustom, response: Response, next: NextFunction): any => {
  const userId: any = getMongooseObjectId(request, response, "userId"); // Extract userId from the request params

  if (!userId) {
    return response.status(400).json({ error: "userId is missing or invalid" });
  }

  

  const authId = new mongoose.Types.ObjectId(request.auth?._id);
  console.log("Extracted authId:", authId);  // Log authId for debugging

  if (!authId) {
    return response.status(401).json({ error: "Unauthorized, missing auth ID" });
  }
  
  const authorized = userId && authId && new mongoose.Types.ObjectId(userId).equals(authId);
  
  if (!authorized) {
    // Instead of returning the response here, we let Express handle the response and just exit the middleware.
    response.status(403).json({
      error: 'User is not authorized',
    });
    return;  // End middleware without returning anything (which matches expected type)
  }

  next(); // Proceed to the next middleware or route handler
};

export default { signin, signout, requireSignin, hasAuthorization };
