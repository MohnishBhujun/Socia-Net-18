const dotenv=require("dotenv");
dotenv.config()
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const config  = require("./config/config");
const errorHandler  = require("./middleware/errohandling.middleware");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)
app.use(errorHandler)
app.listen(PORT, async() => {
  mongoose.set('toJSON', { getters: true });
  await mongoose.connect(config.DB_URL)
  mongoose.connection.on("error", err => {
    console.log("err please try again")
  })
  mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose connected")
  })
    console.log(`server is running on PORT ${PORT}`);
  });

