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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_jwt_1 = require("express-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../models/user.model");
dotenv_1.default.config();
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_model_1.User.findOne({
            email: req.body.email,
        });
        if (!user) {
            res.status(401).json({
                error: "User not found",
            });
            return; // Ensure no further processing happens after the response is sent
        }
        if (!user.authenticate(req.body.password)) {
            res.status(401).json({
                error: "Email and password don't match",
            });
            return; // Ensure no further processing happens after the response is sent
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("t", token, {
            expires: new Date(Date.now() + 9999),
        });
        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Could not sign in",
        });
    }
});
const signout = (req, res) => {
    // Clear the cookie 't'
    res.clearCookie("t");
    // Return a JSON response indicating the user has signed outs
    res.status(200).json({
        message: "signed out",
    });
};
const requireSignin = (0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_SECRET, // Ensure that `JWT_SECRET` is always a string
    algorithms: ['HS256'],
    userProperty: 'auth', // Attach the decoded JWT payload to `req.auth`
});
const hasAuthorization = (req, res, next) => {
    const authorized = req.user && req.auth && req.user._id === req.auth._id;
    if (!authorized) {
        // Instead of returning the response here, we let Express handle the response and just exit the middleware.
        res.status(403).json({
            error: 'User is not authorized',
        });
        return; // End middleware without returning anything (which matches expected type)
    }
    next(); // Proceed to the next middleware or route handler
};
exports.default = { signin, signout, requireSignin, hasAuthorization };
