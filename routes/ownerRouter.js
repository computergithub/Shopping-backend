const express = require('express')
const router = express.Router()
const ownersModel = require("../models/owner-model")
const productModel = require('../models/product')
// const upload = require('../config/multer-config')
// const multer = require('multer');
router.post('/create', async (req, res) => {
    let admin = await ownersModel.find()

    if (admin.length > 0) {
        return res.status(500).send("you don't have permission to create a new owner.")
    }

    let { email, password } = req.body
    let adminCreate = await ownersModel.create({
        email,
        password,
    })
    res.status(201).send(adminCreate)

})
router.get('/', (req, res) => {
    res.render("owner-login", { loggedin: false })
})

router.get('/create', (req, res) => {
    let success = req.flash("success")
    res.render("createproducts", { success })
})


router.get('/admin', async (req, res) => {
    let allProduct = await productModel.find()
    res.render("admin", { allProduct })
})

router.get('/delete/:id', async (req, res) => {
    try {
        const deletedProduct = await productModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.redirect('/owners/admin');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/edit/:id', async (req, res) => {
    let findUser = await productModel.findOne({ _id: req.params.id })
    res.render('update', { loggedin: false, findUser })
});

router.post('/update/:id', async (req, res) => {
    // res.send("working")
    let { name,price,discount,bgcolor,panelcolor,textcolor} = req.body
    // let {image}=req.file.buffer
    // const { image } = req.body;
    // const updateImage = { image};
    // if (req.file) {
    //     updateImage.image = req.file.buffer; // Store image in memory
    //   }
  let user = await productModel.findOneAndUpdate({ _id: req.params.id }, { name, price, discount,  bgcolor, panelcolor, textcolor },{new:true})
  res.redirect('/owners/admin')
//   console.log(user.name)
});






module.exports = router