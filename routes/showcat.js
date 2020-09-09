const express=require('express')
const router=express.Router({mergeParams:true})
const Category=require('../models/categories')

router.get('/showcat/:id',(req,res)=>{
    Category.findById(req.params.id).populate("items").exec((err,category)=>{
        if(err){
            console.log(err)
        }else{
            
            res.render('showcat',{categories:category})
        }
    })
})

module.exports=router