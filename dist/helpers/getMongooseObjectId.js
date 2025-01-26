"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongooseObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const getMongooseObjectId = (req, res, paramName) => {
    const id = req.params[paramName];
    // Check if the ID is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "Invalid user ID format",
        });
    }
    // Create a Mongoose ObjectId instance from the string
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    return objectId;
};
exports.getMongooseObjectId = getMongooseObjectId;
