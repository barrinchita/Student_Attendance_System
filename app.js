import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authv1Routes from './routes/authv1Routes.js';

// importing middlewares here

import authenticate from './middlewares/authMiddleWare.js';

const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 6000;

// mongoose connection

mongoose
  .connect("mongodb://localhost/attendanceSystem")
  .then(() => {
    console.log("connection created");
  })
  .catch((e) => {
    console.log(`Error connecting to db, Error: ${e}`);
    res.status(500).json({failure: "Data base error"})
  });

  app.get("/", (req, res)=>{console.log("welcome")});

  app.use("/api/authv1", authv1Routes);

  app.post("/authVerify", authenticate, (req, res)=>{
    console.log("Welcome, you've been authenticated");
    res.json({message: "authentication okay"});
  })

app.listen(PORT, ()=>console.log("App running on port: ", PORT));