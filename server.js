import express from "express";
import dotenv, { config } from "dotenv";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000; 


app.get('/', (req, res) => {
    res.send('root')
})

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
    connectToMongoDB();
})