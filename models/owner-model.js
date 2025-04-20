const mongoose=require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/ShopWeb")

const ownerSchema=mongoose.Schema({
 
    email:String,
    password:String,
     products:{
        type:Array,
        default:[],
    },
    
})
module.exports=mongoose.model("owner",ownerSchema)