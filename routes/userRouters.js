const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { genrateToken } = require('../utils/genrateToken')
const user = require('../models/user')

require('dotenv').config()

router.post('/register', async (req, res) => {
    try {
        // let error=req.flash("error")
        let { email, fullname, password } = req.body
        let user = await userModel.findOne({ email: email })
        req.flash("you have already an accoount ! please log in ☺")
        if (user) return res.redirect('/')
            bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.send(err.message)
                else {
            let user = await userModel.create({
                email,
                password: hash,
                fullname
            })
            
            const token = genrateToken(user)
            res.cookie("token", token)
            let error=req.flash("error")
            res.render('index',{error})
        }
    })
})
} catch (err) {
    res.send(err.message)
}
})
router.post('/login', async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email: email })
        // 
        // (user.fullname)
    if (!user) return res.status(201).send("somthing went wrong !")
        bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
        let token = genrateToken(user)
        res.cookie("token", token)
        res.redirect("/shop" ,{user})
        // console.log(user.fullname)
    } else {
        // req.flash("error","somthing went wrong")
        return res.send("somthing went wrong !@")
    }
})
})

router.get("/logout", (req, res) => {
    res.cookie("token", "")
    res.redirect('/')
    // console.log(user)
})
    
// router.get("/car")
module.exports = router