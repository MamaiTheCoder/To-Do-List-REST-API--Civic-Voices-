// extend is a method from the lodash library that allows us to merge two objects
import _ from "lodash";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express-serve-static-core";

import Task from "../models/task.model";
import { getMongooseObjectId } from "../helpers/getMongooseObjectId";
import { RequestCustom, CreateTaskRequestBody } from "../types/request";
import { ErrorResponse } from "../types/response";

const create = async (
  req: Request<{ userId: string }, {}, CreateTaskRequestBody>,
  res: Response
): Promise<any> => {
  try {
    const taskOwner = req.params.userId; // Extract the userId from params
    
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      postedBy: taskOwner,
    });

    if (!newTask) {
      return res.status(400).json({ error: "Cannot create the task" });
    }

    await newTask.save();

    return res.status(201).json(newTask);
  } catch (error) {
    // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
    if (error instanceof Error) {
      console.log("Error in create task controller: ", error.message);
    } else {
      console.log("Unknown error in create controller");
    }
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

const listByUser = async (req: RequestCustom, res: Response): Promise<any> => {
  try {
    // Get the user ID using the utility function
    const userId = getMongooseObjectId(req, res, "userId");

    // If userId is invalid, return an error response
    if (!userId) {
      const errorResponse: ErrorResponse = { error: "Invalid user ID format" };
      return res.status(400).json(errorResponse);
    }


    // Find tasks only where 'postedBy' matches the userId
    const tasks = await Task.find({ postedBy: userId }).populate(
      "postedBy", 
      "username email"
    );

    // If no tasks found, return unauthorized error
    if (tasks.length === 0) {
      return res.status(403).json({
        message: "You are not authorized to access this task",
      });
    }

    // Return the tasks as the response
    return res.status(200).json(tasks);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log("Error in listByUser controller: ", error.message);
    } else {
      console.log("Unknown error in create controller");
    }
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

// Type for a Task object (based on your database schema)
interface TaskType {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  postedBy: mongoose.Types.ObjectId;
  // add any other fields if necessary
}

const retrieveTaskByID = async(
  request: RequestCustom,
  response: Response,
  next: NextFunction,
  id: string
): Promise<any> => {
  try {
    const task =  await Task.findById(id).exec();

    if (!task) {
      return response.status(404).json({
          error: 'task not found'
      });
    }
    request.task = task;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in retrievTaskByID controller: ", error.message);
    } else {
      console.log("Unknown error in create controller");
    }
    return response.status(500).json({
      error: "internal server error",
    });
  }
};

const retrieve = async (req: RequestCustom, res: Response): Promise<any> => {
  try {
    // Get valid ObjectIds for taskId and userId
    const taskId = getMongooseObjectId(req, res, 'taskId');
    const userId = getMongooseObjectId(req, res, 'userId');

    // Check if ObjectIds are valid
    if (!userId || !taskId) {
      return res.status(400).json({
        error: 'Invalid user or task ID format',
      });
    }

    // Find the task by taskId and verify that it was posted by the user
    const task = await Task.findOne({ _id: taskId, postedBy: userId }).populate(
      'postedBy',
      'username email'
    );

    // If the task is not found or the user is not the one who posted it
    if (!task) {
      return res.status(403).json({
        message: 'You are not authorized to access this task',
      });
    }

    // Return the task if the user is authorized
    return res.status(200).json(task);
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error in update controller: ', error.message);
    } else {
      console.log('Unknown error in create controller');
    }
  }
};

const update = async (req: RequestCustom, res: Response): Promise<any> => {
  try {
    const userId = getMongooseObjectId(req, res, 'userId'); // Extract userId from the request params
    const taskId = getMongooseObjectId(req, res, 'taskId'); // Extract taskId from the request params

    // Check if both userId and taskId are valid
    if (!userId || !taskId) {
      return res.status(400).json({ error: 'Invalid user or task ID format' });
    }
    // Find the task by taskId and ensure it was posted by the user
    let task = await Task.findOne({ _id: taskId, postedBy: userId });

    // Handle the case where the task was not found
    if (!task) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to update this task' });
    }

    // Use _.extend to update the task with new values from req.body
    task = _.extend(task, req.body);

    task?.save()

    // Return the updated task
    res.status(200).json(task);
  } catch (error) {
     // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
    if (error instanceof Error) {
      console.log("Error in update controller: ", error.message);
    } else {
      console.log("Unknown error in create controller");
    }
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

const remove = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = getMongooseObjectId(req, res, "userId"); // Extract userId from the request params
    const taskId = getMongooseObjectId(req, res, "taskId"); // Extract taskId from the request params

    // Check if both userId and taskId are valid
    if (!userId || !taskId) {
      return res.status(400).json({ error: "Invalid user or task ID format" });
    }

    // Find the task by taskId and ensure it was posted by the user
    const task = await Task.findOne({ _id: taskId, postedBy: userId });

    if (!task) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" });
    }

    // Delete the task
    const deletedTask = await Task.deleteOne({ _id: taskId });

    // If the task was not deleted, return an error
    if (deletedTask.deletedCount === 0) {
      return res.status(400).json({ message: "Task could not be deleted" });
    }

    // Return a success message
    return res.status(200).json({ message: "Task successfully deleted" });
  } catch (error) {
    // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
    if (error instanceof Error) {
      console.log("Error in update controller: ", error.message);
    } else {
      console.log("Unknown error in create controller");
    }
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

export default {
  create,
  listByUser,
  retrieveTaskByID,
  retrieve,
  update,
  remove,
};
