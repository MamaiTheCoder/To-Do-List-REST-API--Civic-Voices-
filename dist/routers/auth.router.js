"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
router.route('/auth/login')
    .post(auth_controller_1.default.signin);
router.route('/auth/signout')
    .get(auth_controller_1.default.signout);
exports.default = router;
