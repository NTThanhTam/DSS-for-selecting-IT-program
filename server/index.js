import express from "express";
import appRoute from "./routes/index.js";
import {connectToDatabase} from "./DB/index.js";
import cors from 'cors';
import Topsis from './handlers/topsis.js';
import Calculate from './handlers/resultHandler.js';




const app = express();

const PORT = process.env.POST || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));


connectToDatabase()
    .then(() => {
        app.listen(PORT, () => console.log("Server open at port: ", PORT));
    })
    .catch((err) => {
        console.log("Error occured with mysql connection. Error = ", err);
        process.exit(0);
    })

app.use(express.json());
app.use("/api", appRoute); //http://localhost:5000/api/food

