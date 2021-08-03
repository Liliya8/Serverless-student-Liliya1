const User = require("./models/user-model");

module.exports.createUser = (req, res) => {
    const userDetails = req.body;
    User.create(userDetails, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.json({ success: true, data })
        }
    })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    User.find({ email, password }, (err, data) => {
        if (err) {
            res.send(err)
        } else if (!data.length) {
            res.json({ success: false, error: "User information incorrect!" })
        }
        else {
            res.json({ success: true, data: data[0] })
        }
    })
}