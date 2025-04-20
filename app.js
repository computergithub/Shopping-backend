
const express = require("express")
const app = express();

const path = require('path')
// const userModel = require('./models/user')
// const postModel = require('./models/product');
const cookieParser = require("cookie-parser");
// const cookie-cookieParser

const db=require('./config/mongoose-connection')
const ownerRouter=require('./routes/ownerRouter')
const productRouter=require('./routes/productRouter')
const userRouters=require('./routes/userRouters')
const index=require('./routes/index')
const expressSession=require("express-session")
const flash=require('connect-flash')
// _____________________   USE _________________________

app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"cat"
}))
app.use(flash())
// _____________________   USE _________________________
 
app.set('view engine', 'ejs')

app.use('/',index)
app.use('/user',userRouters)
app.use('/products',productRouter)
app.use('/owners',ownerRouter)

app.listen(3000, (err) => {
    // console.log("done !")
})