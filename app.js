const exp = require("constants");
const express = require("express");//bringing express to our project
const { read } = require("fs");
const path = require("path");
const puug = require("pug");
const app = express();//fetching all the commands of express in this variable
const port = 80;
require("./backend/src/db/connect")
// express ko ye btana ki mujhe ek static folder use krna hai
//joins the path of this directory and and
const static_path = path.join(__dirname, "./backend/public")
const template_path = path.join(__dirname, "./backend/views")
app.set("views", template_path)
// console.log(path.join(__dirname,"./backend/public"));
app.use(express.static(static_path))//telling ur ecprexx that u r using static files i e html which is in public folder
//first it will check if there is any static file at public path
app.set("view engine", "pug");
// app.set('views',path.join(__dirname,'views'))

// getting our collection file from modules
const Register = require("./backend/src/models/registers")
app.get("/", (req, res) => {
    res.status(200).render("logi");

    // res.send("working");
})
app.get("/login", (req, res) => {
    res.status(200).render("login");

})
// telling my json file that im using json file
app.use(express.json());
// app.use(express.text());
app.use(express.urlencoded({ extended: false }));
// isse mai ye kaha rah ki mai apna data dekhna chahta hu use undefined mt dikhao
app.post("/register", async (req, res) => {
    try {

        // console.log(req.body.email);
        //now store it in database
        const password=req.body.password;
        const cpassword=req.body.cpassword;
        if (password==cpassword) {
            const registerData = new Register({
                name: req.body.name,
                email: req.body.email,
                // rollno: req.body.rollno,
                // phone: req.body.phone,
                // gender: req.body.gender,
                password,//because both are same
                cpassword:req.body.cpassword
    
            })
            const registered = await registerData.save();
            // res.status(201).render("form");// status code for creating
            res.send("ho gya");
        }
        else{
            res.send("passwords are not matching");
        }
        
        // console.log(registerData);
        // res.setHeader("Content-Type", "text/html")
        // res.send("tumhara data pahuch gya");
//         console.log(req.body.password);
       
    } catch (error) {
        res.status(400).send(error);
    }
})
//req is what user entered
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(`${rollno} and ${password}`);
        const a = await Register.findOne({email:email });
        // res.send(userrollno);
        console.log(a);
        if (a.password===password) {
            res.send("ho gya")
            // res.status(201).render("form");
            
        }
        else{
            res.send("lode password glt hai");
        }
    } catch (error) {
        res.status(400).send("invalid")
    }
})
app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`);

})  