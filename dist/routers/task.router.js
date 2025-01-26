"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
router.route('/tasks/new/:userId')
    .post(auth_controller_1.default.requireSignin, task_controller_1.default.create);
router.route('/tasks/by/:userId')
    .get(auth_controller_1.default.requireSignin, task_controller_1.default.listByUser);
router.route('/tasks/:taskId/users/:userId')
    .get(auth_controller_1.default.requireSignin, task_controller_1.default.retrieve)
    .put(auth_controller_1.default.requireSignin, task_controller_1.default.update)
    .delete(auth_controller_1.default.requireSignin, task_controller_1.default.remove);
router.param("taskId", task_controller_1.default.retrieveTaskByID);
exports.default = router;
