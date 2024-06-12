const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {coursemodel}=require("./models/course")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://anusha:anusha13@cluster0.hyxpaoy.mongodb.net/courseDB?retryWrites=true&w=majority&appName=Cluster0")

app.post("/add",(req,res)=>{
    let input = req.body
    let course = new coursemodel(input)
    course.save()
    res.json({"status":"success"})
})

app.get("/view",(req,res)=>{
    coursemodel.find().then(
        (data)=>{
            res.json(data)
        }
    ).catch(
        (error)=>{
            res.json(error)
        }
    )
})

app.post("/search",(req,res)=>{
   let input=req.body
   coursemodel.find(input).then(
    (data)=>{
        res.json(data)
    }
   ).catch(
    (error)=>{
        res.json(error)
    }
   )
})

app.post("/delete",(req,res)=>{
    let input=req.body
    coursemodel.findByIdAndDelete(input._id).
    then(
        (response)=>{
            res.json({"status":"success"})
        }
    ).catch(
        (error)=>{
            res.json({"status":"error"})
        }
    )
})

app.listen(8085,()=>{
    console.log("server started")
})