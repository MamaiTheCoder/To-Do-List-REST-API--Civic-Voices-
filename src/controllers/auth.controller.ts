import { Request, Response, NextFunction } from 'express-serve-static-core';
import jwt from "jsonwebtoken";
import { expressjwt } from 'express-jwt';
import dotenv from "dotenv";

import { User } from "../models/user.model";
import { RequestCustom } from '../types/request';

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

const signin = async (req: Request<{}, {}, SignInRequestBody>, res: Response): Promise<void> => {
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

const signout = (req: Request<{}, {}, any>, res: Response): void => {
  // Clear the cookie 't'
  res.clearCookie("t");

  // Return a JSON response indicating the user has signed outs
  res.status(200).json({
    message: "signed out",
  });
};

const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET as string, // Ensure that `JWT_SECRET` is always a string
  algorithms: ['HS256'],
  userProperty: 'auth',  // Attach the decoded JWT payload to `req.auth`

} as any);

const hasAuthorization = (req: RequestCustom, res: Response, next: NextFunction): void => {
  const authorized = req.user && req.auth && req.user._id === req.auth._id;

  if (!authorized) {
    // Instead of returning the response here, we let Express handle the response and just exit the middleware.
    res.status(403).json({
      error: 'User is not authorized',
    });
    return;  // End middleware without returning anything (which matches expected type)
  }

  next(); // Proceed to the next middleware or route handler
};

export default { signin, signout, requireSignin, hasAuthorization };
