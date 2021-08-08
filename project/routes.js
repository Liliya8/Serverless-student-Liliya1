const express = require("express");
const controller = require("./controller");
//grabbing pre-defined controller actions to be triggered on endpoint visit
const { createUser, login, addMeal, getMeal } = controller;

const app = express();

//creating application endpoints
app.post("/register", createUser);
app.post("/login", login);
app.post("/meal", addMeal);
app.get("/meal/:userId", getMeal);

//exporting app to  be used in app.js
module.exports = app;