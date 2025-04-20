const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("error", "you need login first")
        return res.redirect("/")

    }
    try {
        let decode = jwt.verify(req.cookies.token, process.env.JWT_TOKEN)
        let user = await userModel.findOne({ email: decode.email }).select("-password")
        req.user = user
        next();
    } catch (err) {
        req.flash("error","somthing went wrong !")
        res.redirect("/")

    }
}