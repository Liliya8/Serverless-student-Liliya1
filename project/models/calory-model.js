const mongoose = require("mongoose");

const calorySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    meal: [
        {
            name: String,
            size: String,
            calories: String
        }
    ], 
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model("calory", calorySchema);