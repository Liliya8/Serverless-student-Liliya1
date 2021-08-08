const mongoose = require("mongoose");

//creating user model, also known as schema or table - structure of the user data
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: String,
    },
})

//exporting the schema to be used for user related actions
module.exports = mongoose.model("user", userSchema);