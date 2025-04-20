const express = require('express')
const isLoggedin = require('../middlewares/isLoggedin')
const router = express.Router()
const productRouter = require('../models/product')
const userModel = require('../models/user')


router.get('/',async (req, res) => {
    let error = req.flash("error")
    res.render("index", { error: error, loggedin: false })
})

router.get("/shop", isLoggedin, async (req, res) => {
    // let products = await productRouter 
    let products = await productRouter.find();
    // console.log(products)
    let success = req.flash("success")
    res.render("shop", { products, success })
    })

router.get("/cart", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('cart')
    //  if(user.cart){
        //  } 
        res.render('cart', { user })
    })
    
    
    router.get("/addToCart/:id", isLoggedin, async (req, res) => {
        let user = await userModel.findOne({ email: req.user.email })
        user.cart.push(req.params.id)
        await user.save()
        req.flash("success", "product is added ")
        res.redirect('/shop')  
    }) 
module.exports = router