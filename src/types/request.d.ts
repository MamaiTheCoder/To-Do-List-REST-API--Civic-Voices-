import { Request } from "express-serve-static-core";
import { IUser, User } from "../models/user.model";
import Task from "../models/task.model";

export interface RequestCustom extends Request {
  user?: User;
  auth?: { _id: string }; // Assuming `auth` has an `_id` of type string
  task?: Task;
}

export interface CreateUserRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface SuccessCreateResponse {
  message?: string;
  error?: string;
}

export interface CreateTaskRequestBody {
  title: string;
  description: string;
}
