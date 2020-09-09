const express=require("express")
const router=express.Router({mergeParams:true})
const Item=require('../models/item')
const User=require('../models/user')

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}
router.get('/cart/:id',isLoggedIn,(req,res)=>{
    Item.findById(req.params.id,(err,item)=>{
        if(err){
            console.log(err)
        }else{
            
            req.user.cart.push(item)
            req.user.save()
            User.findById(req.user._id).populate("cart").exec((err,user)=>{
                if(err){
                    console.log(err)
                }else{
                   res.render('cart',{user:user})
                   
                }
            })
            
                
            
        }
    })
})
module.exports=router