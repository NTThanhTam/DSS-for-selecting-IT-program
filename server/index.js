import express from "express";
import appRoute from "./routes/index.js";
import authRouter from './routes/auth.js'
import {connectToDatabase} from "./DB/index.js";
import cors from 'cors';


const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ 
    origin: ['http://localhost:3000', 'https://dss-for-selecting-it-program-0263d785f8b3.herokuapp.com/'],
    credentials: true
 }));
// make this location origin, send request


connectToDatabase()
    .then(() => {
        app.listen(PORT, () => console.log("Server open at port: ", PORT));
    })
    .catch((err) => {
        console.log("Error occured with mysql connection. Error = ", err);
        process.exit(0);
    })

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend is running");
  });  
app.use("/api/app", appRoute); //http://localhost:5000/api/app
app.use("/api/auth", authRouter); 


