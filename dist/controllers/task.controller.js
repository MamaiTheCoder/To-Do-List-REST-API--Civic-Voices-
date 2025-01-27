"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// extend is a method from the lodash library that allows us to merge two objects
const lodash_1 = __importDefault(require("lodash"));
const task_model_1 = __importDefault(require("../models/task.model"));
const getMongooseObjectId_1 = require("../helpers/getMongooseObjectId");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskOwner = req.params.userId; // Extract the userId from params
        const newTask = new task_model_1.default({
            title: req.body.title,
            description: req.body.description,
            postedBy: taskOwner,
        });
        if (!newTask) {
            return res.status(400).json({ error: "Cannot create the task" });
        }
        yield newTask.save();
        return res.status(201).json(newTask);
    }
    catch (error) {
        // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
        if (error instanceof Error) {
            console.log("Error in create task controller: ", error.message);
        }
        else {
            console.log("Unknown error in create controller");
        }
        return res.status(500).json({
            error: "internal server error",
        });
    }
});
const listByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the user ID using the utility function
        const userId = (0, getMongooseObjectId_1.getMongooseObjectId)(req, res, "userId");
        // If userId is invalid, return an error response
        if (!userId) {
            const errorResponse = { error: "Invalid user ID format" };
            return res.status(400).json(errorResponse);
        }
        // Find tasks only where 'postedBy' matches the userId
        const tasks = yield task_model_1.default.find({ postedBy: userId }).populate("postedBy", "username email");
        // If no tasks found, return unauthorized error
        if (tasks.length === 0) {
            return res.status(403).json({
                message: "You are not authorized to access this task",
            });
        }
        // Return the tasks as the response
        return res.status(200).json(tasks);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error in listByUser controller: ", error.message);
        }
        else {
            console.log("Unknown error in create controller");
        }
        return res.status(500).json({
            error: "internal server error",
        });
    }
});
const retrieveTaskByID = (request, response, next, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findById(id).exec();
        if (!task) {
            return response.status(404).json({
                error: 'task not found'
            });
        }
        request.task = task;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error in retrievTaskByID controller: ", error.message);
            return response.status(500).json({
                error: error.message,
            });
        }
        else {
            console.log("Unknown error in create controller");
        }
    }
});
const retrieve = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get valid ObjectIds for taskId and userId
        const taskId = (0, getMongooseObjectId_1.getMongooseObjectId)(req, res, 'taskId');
        const userId = (0, getMongooseObjectId_1.getMongooseObjectId)(req, res, 'userId');
        // Check if ObjectIds are valid
        if (!userId || !taskId) {
            return res.status(400).json({
                error: 'Invalid user or task ID format',
            });
        }
        // Find the task by taskId and verify that it was posted by the user
        const task = yield task_model_1.default.findOne({ _id: taskId, postedBy: userId }).populate('postedBy', 'username email');
        // If the task is not found or the user is not the one who posted it
        if (!task) {
            return res.status(403).json({
                message: 'You are not authorized to access this task',
            });
        }
        // Return the task if the user is authorized
        return res.status(200).json(task);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('Error in update controller: ', error.message);
            return res.status(500).json({
                error: error.message,
            });
        }
        else {
            console.log('Unknown error in create controller');
        }
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, getMongooseObjectId_1.getMongooseObjectId)(req, res, 'userId'); // Extract userId from the request params
        const taskId = (0, getMongooseObjectId_1.getMongooseObjectId)(req, res, 'taskId'); // Extract taskId from the request params
        // Check if both userId and taskId are valid
        if (!userId || !taskId) {
            return res.status(400).json({ error: 'Invalid user or task ID format' });
        }
        // Find the task by taskId and ensure it was posted by the user
        let task = yield task_model_1.default.findOne({ _id: taskId, postedBy: userId });
        // Handle the case where the task was not found
        if (!task) {
            return res
                .status(403)
                .json({ message: 'You are not authorized to update this task' });
        }
        // Use _.extend to update the task with new values from req.body
        task = lodash_1.default.extend(task, req.body);
        task === null || task === void 0 ? void 0 : task.save();
        // Return the updated task
        res.status(200).json(task);
    }
    catch (error) {
        // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
        if (error instanceof Error) {
            console.log("Error in update controller: ", error.message);
            return res.status(500).json({
                error: error.message,
            });
        }
        else {
            console.log("Unknown error in create controller");
        }
        return res.status(500).json({
            error: "internal server error",
        });
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, getMongooseObjectId_1.getMongooseObjectId)(req, res, "userId"); // Extract userId from the request params
        const taskId = (0, getMongooseObjectId_1.getMongooseObjectId)(req, res, "taskId"); // Extract taskId from the request params
        // Check if both userId and taskId are valid
        if (!userId || !taskId) {
            return res.status(400).json({ error: "Invalid user or task ID format" });
        }
        // Find the task by taskId and ensure it was posted by the user
        const task = yield task_model_1.default.findOne({ _id: taskId, postedBy: userId });
        if (!task) {
            return res
                .status(403)
                .json({ message: "You are not authorized to delete this task" });
        }
        // Delete the task
        const deletedTask = yield task_model_1.default.deleteOne({ _id: taskId });
        // If the task was not deleted, return an error
        if (deletedTask.deletedCount === 0) {
            return res.status(400).json({ message: "Task could not be deleted" });
        }
        // Return a success message
        return res.status(200).json({ message: "Task successfully deleted" });
    }
    catch (error) {
        // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
        if (error instanceof Error) {
            console.log("Error in update controller: ", error.message);
            return res.status(500).json({
                error: error.message,
            });
        }
        else {
            console.log("Unknown error in create controller");
        }
    }
});
exports.default = {
    create,
    listByUser,
    retrieveTaskByID,
    retrieve,
    update,
    remove,
};
