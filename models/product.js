const mongoose=require('mongoose');

const productShema=mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0,
    },
    bgcolor:String,
    panelcolor:String,
    textcolor:String,
    // date:{
    //     type:Date,
    //     default:Date.now
    // },

})

module.exports=mongoose.model("prodoct",productShema)