"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
router.route('/users')
    .post(user_controller_1.default.create)
    .get(user_controller_1.default.list);
router.route('/users/:userId')
    .get(auth_controller_1.default.requireSignin, user_controller_1.default.read)
    .put(auth_controller_1.default.requireSignin, auth_controller_1.default.hasAuthorization, user_controller_1.default.update)
    .delete(auth_controller_1.default.requireSignin, auth_controller_1.default.hasAuthorization, user_controller_1.default.remove);
router.param("userId", user_controller_1.default.userByID);
exports.default = router;
