const express = require("express");
const controller = require("./controller");
const { createUser } = controller;

const app = express();

app.post("/register", createUser);

module.exports = app;