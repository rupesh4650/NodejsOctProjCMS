const express = require('express')
const { blogs } = require('./model/index')
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
app.post("/createblog",async(req,res)=>{
        console.log(req.body)
//first approach
const title=req.body.title
const subTitle=req.body.subtitle
const description=req.body.description

//second approach
//const{title,subTitle,description}=req.body

//database ma halnu paro,database sanga kehi operation garda await halnu parxa
//aagadi,await halepaxi mathi async halnu parne hunxa
await blogs.create({
    title:title,
    subTitle:subTitle,
    description:description
})
    res.send("Form submitted successfully")
})


app.listen(3000,(req,res)=>{
    console.log("nodejs project has been running on port 3000")
})
