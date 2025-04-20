const express = require('express')
const router = express.Router()
const upload = require('../config/multer-config')
const productModel=require('../models/product')
router.post('/create', upload.single("image"),async (req, res) => {

    // res.send(req.file.buffer)
    try{

        let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body
        let createProduct=await productModel.create({
            image:req.file.buffer,
            name,
            price,
            discount,  
            bgcolor, 
            panelcolor,
            textcolor,
        })
        req.flash("success","prodoct created successfully. ☺ ☻")
        res.redirect('/owners/create')
    }catch(err){
        res.send(err.message)
    }

})

// router.get('/edit/:id', async (req, res) => {
//     let findUser = await productModel.findOne({ _id: req.params.id })
//     res.render('update', { loggedin: false, findUser })
// });

// router.post('/update/:id',async (req,res)=>{
//     let { name,price,discount,bgcolor,panelcolor,textcolor} = req.body
//     await productModel.findOneAndUpdate({_id:req.params.id},{ name,price,discount,bgcolor,panelcolor,textcolor},{new:true})
//    res.redirect('/owners/admin')

// })
module.exports = router