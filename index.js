require('dotenv').config();
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const userRouter = require("./routes/user.js");
const { executionAsyncResource } = require("async_hooks")

mongoose
.connect("mongodb://127.0.0.1:27017/encrptX")
.then(console.log("Database Connected"));

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({extended : false}));
app.use("",userRouter);

app.get("/",(req,res)=>{
    res.render("home.ejs")
});

app.get("/newPage",(req,res)=>{
    res.render("home.ejs")
});


const PORT = 8000;
app.listen(PORT,()=>{
    console.log("Server Started at PORT : ",PORT);
});