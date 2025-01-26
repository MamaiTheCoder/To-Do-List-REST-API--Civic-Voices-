"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const connectToMongoDB_1 = __importDefault(require("./db/connectToMongoDB"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const task_router_1 = __importDefault(require("./routers/task.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use("/api/v1", auth_router_1.default);
app.use("/api/v1", user_router_1.default);
app.use("/api/v1", task_router_1.default);
app.use((err, // Typecast `err` to either UnauthorizedError or generic Error
req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: `${err.name}: ${err.message}` });
    }
    else if (err) {
        res.status(400).json({ error: `${err.name}: ${err.message}` });
        console.log(err);
    }
});
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    (0, connectToMongoDB_1.default)();
});
exports.default = app;
