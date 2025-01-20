import express from "express";
import dotenv, { config } from "dotenv";

import connectToMongoDB from "./db/connectToMongoDB.js";
import userRoute from './routers/user.router.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.json());

app.use('/', userRoute)


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
    connectToMongoDB();
})
