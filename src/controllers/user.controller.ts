// extend is a method from the lodash library that allows us to merge two objects
import _ from "lodash";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { User } from "../models/user.model";
import {
  RequestCustom,
  CreateUserRequestBody,
  SuccessCreateResponse
} from "../types/request";





const create = async (
  request: Request<{}, {}, CreateUserRequestBody>,
  response: Response<SuccessCreateResponse>
): Promise<any> => {
  const newUser = new User(request.body);

  try {
    await newUser.save();
    return response.status(201).json({
      message: "Successfully signed up!",
    });
  } catch (error) {
    // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
    if (error instanceof Error) {
      console.log("Error in create controller: ", error.message);
    } else {
      console.log("Unknown error in create controller");
    }
    return response.status(500).json({
      error: "internal server error",
    });
  }
};

const list = async (request: Request, response: Response): Promise<any> => {
  try {
    const users = await User.find().select("name email updated created");

    // if (users.length === 0) {
    //   return response.status(404).json({
    //     message: "No users found"
    //   });
    // }

    return response.status(200).json(users);
  } catch (error) {
    // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
    if (error instanceof Error) {
      console.log("Error in list controller: ", error.message);
    } else {
      console.log("Unknown error in create controller");
    }
    return response.status(500).json({
      error: "internal server error",
    });
  }
};

const userByID = async(
  request: RequestCustom,
  response: Response,
  next: NextFunction,
  id: string
): Promise<any> => {
  try {
    const user =  await User.findById(id).exec();

    if (!user) {
      return response.status(404).json({
          error: 'user not found'
      });
    }
    request.user = user;
    next();
  } catch (error) {
    // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
    if (error instanceof Error) {
      console.log('Error in userByID controller: ', error.message);
    } else {
      console.log('Unknown error in create controller');
    }
  }
};

const read = async (
  request: RequestCustom,
  response: Response
): Promise<any> => {
  request.user.hashed_password = undefined
  request.user.salt = undefined
  return response.json(request.user)
};

const update = async (
  request: RequestCustom,
  response: Response
): Promise<any> => {
  try {
    let user = request.user;
    user = _.extend(user, request.body);
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    response.json(user)
  } catch (error) {
    // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
    if (error instanceof Error) {
      console.log('Error in userByID controller: ', error.message);
    } else {
      console.log('Unknown error in create controller');
    }
  }
}

const remove = async (
  request: RequestCustom,
  response: Response
) => {
  let user = request.user;
  let deletedUser = await user.deleteOne();
  deletedUser.hashed_password = undefined
  deletedUser.salt = undefined
  response.json(deletedUser)
}

export default { create, list, userByID, read, update, remove };
