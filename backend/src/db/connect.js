 const mongoose=require("mongoose");
 //connection creation and creating a new db if not present
//  registration is the name of database
 mongoose.connect("mongodb://localhost:27017/registration",{
 }).then(()=>{
console.log(`conndection succispul`)
 }).catch((e)=>{
   console.log(`no connection`)
 })
 //it returns a promise