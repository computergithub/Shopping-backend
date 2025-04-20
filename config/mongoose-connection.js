const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ShopWeb").then(function () {
    console.log("DB connection is ok")
}).catch(function (err) {
    console.log(err)
})
module.exports=mongoose.connection