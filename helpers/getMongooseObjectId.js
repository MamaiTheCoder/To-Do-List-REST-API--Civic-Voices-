import mongoose from "mongoose";
import handleError from "./errorHandler.js";

const getMongooseObjectId = (req, res, paramName) => {
  const id = req.params[paramName];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'Invalid user ID format'
    });
  }
  const objectId = new mongoose.Types.ObjectId(id);

  return objectId;
};

export default getMongooseObjectId;
