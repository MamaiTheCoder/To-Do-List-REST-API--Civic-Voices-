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
const mongoose_1 = __importDefault(require("mongoose"));
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoDbUri = process.env.MONGO_DB_URI;
        if (!mongoDbUri) {
            throw new Error("MONGO_DB_URI environment variable is not defined");
        }
        const conn = yield mongoose_1.default.connect(process.env.MONGO_DB_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
        if (error instanceof Error) {
            console.log(`Error in connectMongoDB.js ${error.message}`);
            process.exit(1);
        }
        else {
            console.log("Unknown error in connectMongoDB.js");
        }
    }
});
exports.default = connectToMongoDB;
