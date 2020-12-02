const express= require('express');
const mongoose=require('mongoose');
const myFunction=require('./localmodules/dbhelper');
require('dotenv').config()

const app=express();

app.use(express.static('public'));

app.use(express.json());//Used for parsing form data
app.use(express.urlencoded({extended:true})); //Parse URL-encoded bodies

app.get('/',(_req,res)=>{
    res.sendFile('index.html');
});
app.get('/random',async (_req,res)=>{
    const data=await myFunction.getRandom();
    // console.log('what about to send');
    // console.log(data);
    // console.log('what about to send');
    res.send(data);
});
app.post('/',async (req,res)=>{
    
    let tagsArray=req.body.intags.toLowerCase().split(',');
    tagsArray.sort((a,b)=>a.length-b.length);
    let obj={cid:req.body.cid,intags:tagsArray};
    console.log(tagsArray);
    try {
        const toSend=await myFunction.doStuff(obj,process.env.DB_URL);
        res.send(toSend);
    } catch (error) {
        console.log(error);
    }
    
});

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server started at port ${process.env.PORT || 3000}`);
});
