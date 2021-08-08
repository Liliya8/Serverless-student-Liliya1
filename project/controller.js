const User = require("./models/user-model");
const Calory = require("./models/calory-model");

//creating new user using the pre-defined user model
module.exports.createUser = (req, res) => {
    //grab registration details from the request body
    const userDetails = req.body;
    User.create(userDetails, (err, data) => {
        //if there is error, send the error back
        if (err) {
            res.send(err)
        } else {
            res.json({ success: true, data })
        }
    })
}

//login if user data exists
module.exports.login = (req, res) => {
    const { email, password } = req.body;
    //finding user data that exactly matches the existing email and password
    User.find({ email, password }, (err, data) => {
        if (err) {
            res.send(err)
        } 
        //if data is empty that means the user data is incorrect or doesn't exist
        else if (!data.length) {
            res.json({ success: false, error: "User information incorrect!" })
        }
        //returns the data if the user data exists
        else {
            res.json({ success: true, data: data[0] })
        }
    })
}

//creating new meal history using the pre-defined meal model
module.exports.addMeal = (req, res) => {
    const mealDetails = req.body;
    Calory.create(mealDetails, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.json({ success: true, data })
        }
    })
}

//get meal history for a specific user using the user id
module.exports.getMeal = (req, res) => {
    const { userId } = req.params;
    Calory.find({ userId }, (err, data) => {
        if (err) {
            res.send(err)
        }else {
            res.json({ success: true, data })
        }
    })
}