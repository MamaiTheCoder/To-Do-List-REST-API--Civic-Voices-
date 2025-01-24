import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from 'helmet';

import connectToMongoDB from "./db/connectToMongoDB.js";
import userRoute from "./routers/user.router.js";
import authRoute from "./routers/auth.router.js";
import taskRoute from './routers/task.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", taskRoute);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  } else if (err) {
    res.status(400).json({ error: `${err.name}: ${err.message}` });
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
  connectToMongoDB();
});

export default app;
