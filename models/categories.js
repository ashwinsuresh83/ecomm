const mongoose=require('mongoose')


const categorySchema=new mongoose.Schema({
    name:String,
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    }]
})
let Category=mongoose.model("Category",categorySchema)
module.exports=Category