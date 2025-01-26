"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the Task schema
const TaskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
// Create the Task model
const Task = mongoose_1.default.model("Task", TaskSchema);
exports.default = Task;
