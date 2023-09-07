const express=require('express')
require('dotenv').config()


const workoutRoutes=require('./routes/workouts')
const mongoose=require('mongoose')
const app=express()
app.use(express.json())

app.use((req,res, next)=>{
    console.log(req.path,req.method);
    next()
})


app.use('/api/workouts',workoutRoutes)

app.get('/',(req,res)=>{
    res.json({mssg :'Welcome'})
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
}

mongoose.connect(process.env.MONG_URI)
 .then(()=>{
    app.listen(process.env.PORT || 4000,()=>{
        console.log('Connecting to database and Listening on Port',process.env.PORT);
    })
 })
 .catch((error)=>{
    console.log(error);
 })

