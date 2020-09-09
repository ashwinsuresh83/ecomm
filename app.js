const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const indexRoute=require('./routes/index.js')
const mongoose=require('mongoose')
const passport=require('passport')
const localStrategy=require('passport-local')

const Item=require('./models/item')
const Category=require('./models/categories')
const User=require('./models/user')
const showcatRoute=require('./routes/showcat.js')
const showRoute=require('./routes/show')
const cartRoute=require('./routes/cart')




mongoose.connect("mongodb://localhost/ecomm",{useNewUrlParser:true})
    .then(()=>console.log("mongodb connected"))
    .catch((err)=>console.log(err))


app.use(express.static(__dirname+"/public"))

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

 //PASSPORT CONFIG
 app.use(require("express-session")({
    secret:"once again rust wins cutest dog",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{

    Category.find({}).populate('items').exec((err,category)=>{
        if(err){
            console.log(err)
        }else{
            res.locals.category=category
            next()
        }
    })
})



app.use((req,res,next)=>{
    res.locals.currentUser=req.user
    next()
})


app.use(indexRoute)
app.use(showcatRoute)
app.use(showRoute)
app.use(cartRoute)



const PORT =process.env.PORT ||3000
app.listen(PORT,()=>{
    console.log("server started")
})