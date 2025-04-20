const mongoose=require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/ShopWeb")

const userSchema=mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    picture:String,
    contact:Number,
    cart:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"prodoct",
    }],
    orders:{
        type:Array,
        default:[],
    },
})
module.exports=mongoose.model("user",userSchema)