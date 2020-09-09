const express=require('express')
const router=express.Router({mergeParams:true})
const Item=require('../models/item')

router.get('/show/:id',(req,res)=>{
    Item.findById(req.params.id,(err,item)=>{
        if(err){
            console.log(err)
        }else{
            res.render('show',{item:item})
        }
    })
    
})
module.exports=router