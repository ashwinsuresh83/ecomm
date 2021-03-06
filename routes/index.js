const express=require("express")
const router=express.Router({mergeParams:true})
const Category=require('../models/categories')
const Item=require('../models/item')
const User=require('../models/user')
const passport=require('passport')
router.get('/',(req,res)=>{
    Category.find({}).populate("items").exec((err,categories)=>{
        if(err){
            console.log(err)
        }else{
            
            res.render('index',{category:categories})
        }
    })
})
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

//AUTH ROUTES
router.get("/register",(req,res)=>{
    res.render("register")
})
//sign up logic

router.post("/register",(req,res)=>{
    let newUser=new User({username:req.body.username})
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req,res,()=>{
            res.redirect("/")
        })
    })
})
//LOGIN
router.get("/login",(req,res)=>{
    res.render("login")
})
router.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"
}),(req,res)=>{

})
router.get("/logout",(req,res)=>{
    req.logOut()
    res.redirect("/login")
})
module.exports=router