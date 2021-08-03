const express = require("express");
const controller = require("./controller");
const { createUser, login } = controller;

const app = express();

app.post("/register", createUser);
app.post("/login", login);

module.exports = app;