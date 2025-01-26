import mongoose from "mongoose";
import { Response } from "express-serve-static-core";
import { RequestCustom } from "../types/request";

const getMongooseObjectId = (
  req: RequestCustom,
  res: Response,
  paramName: string
) => {
  const id = req.params[paramName];

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid user ID format",
    });
  }

  // Create a Mongoose ObjectId instance from the string
  const objectId = new mongoose.Types.ObjectId(id);

  return objectId;
};

export { getMongooseObjectId };
