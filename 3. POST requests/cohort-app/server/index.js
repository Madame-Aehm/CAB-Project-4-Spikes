import express from "express";
// const express = require('express');
import cors from "cors";
import scoutsRouter from './routes/scouts.js'
import petsRouter from './routes/pets.js'
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/users.js";

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
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('*', (req, res) => res.status(404).json({ error: "Endpoint not found." }));


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

