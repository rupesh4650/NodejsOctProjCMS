const express = require('express')
const { blogs } = require('./model/index')
const app = express()

//connection database
require("./model/index")

//set view engins as ejs
app.set("view engine","ejs")

//nodejs lai file acess garna de bhaneko yo code le
app.use(express.static("public/"))

//form bata data aai rahya xa paese gae or handle gar
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//all blogs
app.get("/",async(req,res)=>{
    //blogs vanne table bata vaye jati sabai data dey vaneko
    const allblogs=await blogs.findAll()
    console.log(allblogs)

    //blogs vanne key/name ma allblogs/data pass gareko ejs file lai
    res.render('blogs',{blogs:allblogs})
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
    res.redirect("/")
})

//for single Blog
app.get("/single/:id",async(req,res)=>{
    const id=req.params.id
    //second approach
    //const {id}=req.params

    //id ko data magnu/find garnu paro hamro table bata
   const blog = await blogs.findAll({
        where:{
            id:id
        }
        
    })
    //const blogs= await blogs.findByPk(id)
    
    res.render("singleblog",{blog:blog})
})

//delete page
app.get("/delete/:id",async(req,res)=>{
    const id=req.params.id
    //blogs vsnney table bata tyo id ko delete gar bhaneko yaha
    await blogs.destroy({
        where:{
            id:id
        }
    })
    res.redirect("/")
})

//EDIT BLOG
app.get("/edit/:id",async(req,res)=>{
    const id=req.params.id
    //find blog of what id
    const blog= await blogs.findAll({
        where:{
            id:id
        }

    })
    res.render("editblog",{blog:blog})
})
app.post("/editblog/:id",async(req,res)=>{
    const id=req.params.id
    const title=req.body.title
    const subTitle=req.body.subTitle
    const description=req.body.description

    await blogs.update({
        title:title,
        subTitle:subTitle,
        description:description
    },{
        where:{
            id:id
        }
    })
    res.redirect("/single/"+id)
})



app.listen(3000,(req,res)=>{
    console.log("nodejs project has been running on port 3000")
})
