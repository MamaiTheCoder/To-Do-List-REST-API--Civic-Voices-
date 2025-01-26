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
const user_model_1 = require("../models/user.model");
const create = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_model_1.User(request.body);
    try {
        yield newUser.save();
        return response.status(201).json({
            message: "Successfully signed up!",
        });
    }
    catch (error) {
        // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
        if (error instanceof Error) {
            console.log("Error in create controller: ", error.message);
        }
        else {
            console.log("Unknown error in create controller");
        }
        return response.status(500).json({
            error: "internal server error",
        });
    }
});
const list = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find().select("name email updated created");
        // if (users.length === 0) {
        //   return response.status(404).json({
        //     message: "No users found"
        //   });
        // }
        return response.status(200).json(users);
    }
    catch (error) {
        // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
        if (error instanceof Error) {
            console.log("Error in list controller: ", error.message);
        }
        else {
            console.log("Unknown error in create controller");
        }
        return response.status(500).json({
            error: "internal server error",
        });
    }
});
const userByID = (request, response, next, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(id).exec();
        if (!user) {
            return response.status(404).json({
                error: 'user not found'
            });
        }
        request.user = user;
        next();
    }
    catch (error) {
        // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
        if (error instanceof Error) {
            console.log('Error in userByID controller: ', error.message);
        }
        else {
            console.log('Unknown error in create controller');
        }
    }
});
const read = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    request.user.hashed_password = undefined;
    request.user.salt = undefined;
    return response.json(request.user);
});
const update = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = request.user;
        user = lodash_1.default.extend(user, request.body);
        user.updated = Date.now();
        yield user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        response.json(user);
    }
    catch (error) {
        // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
        if (error instanceof Error) {
            console.log('Error in userByID controller: ', error.message);
        }
        else {
            console.log('Unknown error in create controller');
        }
    }
});
const remove = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let user = request.user;
    let deletedUser = yield user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    response.json(deletedUser);
});
exports.default = { create, list, userByID, read, update, remove };
