const mongoose=require('mongoose')


const itemSchema=new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String
    
})
let Item=mongoose.model('Item',itemSchema)
module.exports=Item