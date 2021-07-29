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