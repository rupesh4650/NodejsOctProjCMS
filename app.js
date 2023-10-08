const express = require('express')
const app = express()

//connection database
require("./model/index")

//set view engins as ejs
app.set("view engine","ejs")



//form bata data aai rahya xa paese gae or handle gar
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//all blogs
app.get("/",(req,res)=>{
    res.render("blogs")
})

//create blog
app.get("/createblog",(req,res)=>{
    res.render("createblog")
})

//create blog post
app.post("/createblog",(req,res)=>{
    console.log(req.body)
    res.send("Form submitted successfully")
})


app.listen(3000,(req,res)=>{
    console.log("nodejs project has been running on port 3000")
})
