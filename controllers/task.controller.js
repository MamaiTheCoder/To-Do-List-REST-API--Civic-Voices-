// extend is a method from the lodash library that allows us to merge two objects
import extend from "lodash/extend.js";
import mongoose from "mongoose";

import Task from "../models/task.model.js";

const getMongooseObjectId = (req, res, paramName) => {
  const id = req.params[paramName];
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'Invalid user ID format'
    });
  }
  const objectId = new mongoose.Types.ObjectId(id);

  return objectId;
}

const create = async (req, res) => {
  try {
    const taskOwner = req.params.userId;
    const newTask = await new Task({
      'title': req.body.title,
      'description': req.body.description,
      'postedBy': taskOwner
    });

    if (!newTask) {
      return res.status(400).json({ error: "Cannot create your account" });
    }

    await newTask.save();

    return res.status(201).json(newTask);
  } catch (error) {
    console.log("error in create task controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const listByUser = async (req, res) => {
  try {
    const userId = getMongooseObjectId(req, 'userId');

    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    // Find tasks only where 'postedBy' matches the userId
    const tasks = await Task.find({ postedBy: userId }).populate('postedBy', 'username email');

    // If the task is not found or the user is not the one who posted it
    if (!tasks) {
      return res.status(403).json({
        message: 'You are not authorized to access this task'
      });
    }

    // if (tasks.length === 0) {
    //   return res.status(400).json({
    //     message: "You have no todos"
    //   });
    // }

    return res.status(200).json(tasks);
  } catch (error) {
    console.log("error in list tasks controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const retrieveTaskByID = async (req, res, next, id) => {
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Todos not found",
      });
    }

    req.task = task;
    next();
  } catch (error) {
    console.log("error in taskById controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const retrieve = async (req, res) => {

  try {
    const taskId = getMongooseObjectId(req, 'taskId');
    const userId = getMongooseObjectId(req, 'userId');

     // Check if ObjectIds are valid
    if (!userId || !taskId) {
      return res.status(400).json({
        error: 'Invalid user or task ID format'
      });
    }

    // Find the task by taskId and verify that it was posted by the user
    const task = await Task.findOne({ _id: taskId, postedBy: userId }).populate('postedBy', 'username email');

    // If the task is not found or the user is not the one who posted it
    if (!task) {
      return res.status(403).json({
        message: 'You are not authorized to access this task'
      });
    }

    // Return the task if the user is authorized
    return res.status(200).json(task);
  } catch (error) {
    console.log("error in retrieve task controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const userId = getMongooseObjectId(req, 'userId');  // Extract userId from the request params
    const taskId = getMongooseObjectId(req, 'taskId');  // Extract taskId from the request params

    // Check if both userId and taskId are valid
    if (!userId || !taskId) {
      return res.status(400).json({ error: 'Invalid user or task ID format' });
    }

    // Find the task by taskId and ensure it was posted by the user
    let task = await Task.findOne({ _id: taskId, postedBy: userId });

    if (!task) {
      return res.status(403).json({ message: 'You are not authorized to update this task' });
    }

    // Extend the task with the new values from req.body (update the task)
    task = extend(task, req.body);
    task.updated = Date.now();  // Update the 'updated' timestamp

    // Save the updated task
    await task.save();

    // Return the updated task
    return res.status(200).json(task);

  } catch (error) {
    console.log("Error in update task controller: ", error.message);
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const userId = getMongooseObjectId(req, 'userId');  // Extract userId from the request params
    const taskId = getMongooseObjectId(req, 'taskId');  // Extract taskId from the request params

    // Check if both userId and taskId are valid
    if (!userId || !taskId) {
      return res.status(400).json({ error: 'Invalid user or task ID format' });
    }

    // Find the task by taskId and ensure it was posted by the user
    const task = await Task.findOne({ _id: taskId, postedBy: userId });

    if (!task) {
      return res.status(403).json({ message: 'You are not authorized to delete this task' });
    }

    // Delete the task
    const deletedTask = await Task.deleteOne({ _id: taskId });

    // If the task was not deleted, return an error
    if (deletedTask.deletedCount === 0) {
      return res.status(400).json({ message: 'Task could not be deleted' });
    }

    // Return a success message
    return res.status(200).json({ message: 'Task successfully deleted' });

  } catch (error) {
    console.log("Error in remove task controller: ", error.message);
    return res.status(400).json({
      error: error.message,
    });
  }
};


export default { create, listByUser, retrieveTaskByID, retrieve, update, remove };
