import express from "express";
// const express = require('express');
import cors from "cors";
import scoutsRouter from './routes/scouts.js'
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//initialize express app
const app = express();



//use middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})


//test api request
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})


//define base api base routes
app.use('/api/scouts', scoutsRouter);


//listen to server on port #
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Connection to Mongo DB established and Server is running on port " + port);
    });
  })
  .catch((err) => console.log(err));

