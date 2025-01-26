import mongoose, { Document, Schema } from "mongoose";

// Define the TypeScript interface for the Task document
interface ITask extends Document {
  title: string;
  description?: string; // Optional property
  completed: boolean;
  postedBy: mongoose.Types.ObjectId; // Mongoose ObjectId type for user reference
  createdAt?: Date; // Optional due to timestamps
  updatedAt?: Date; // Optional due to timestamps
}

// Define the Task schema
const TaskSchema: Schema<ITask> = new mongoose.Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Create the Task model
const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
