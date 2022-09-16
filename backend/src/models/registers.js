//definig our schema for json file to store data
const mongoose = require("mongoose");
const newSkima = new mongoose.Schema({
    email: {
        type:String,
        // required: true,
        unique: true
    },
    name: {
        type: String,
        // required: true
    },
    // rollno:{
    //     type:Number,
    //     // required:true,
    //     unique:true
    // },
    // phone :{
    //     type:Number,
    //     // required:true,
    //     unique:true
    // },
    // gender:{
    //     type:String,
    //     // required:true
    // },
    password:{
        type:String,
        // required:true
    },
    cpassword:{
        type:String,
    }
})
//first letter capital(singular),   nitj is name of ur collection
const Register= new mongoose.model("Nitj",newSkima)
//then export this collection of schema newskima
module.exports=Register;