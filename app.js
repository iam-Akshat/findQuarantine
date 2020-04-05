const express= require('express');
const mongoose=require('mongoose');
const dbHelper=require('./localmodules/dbhelper');
require('dotenv').config()

const app=express();

app.use(express.static('public'));

app.use(express.json());//Used for parsing form data
app.use(express.urlencoded({extended:true})); //Parse URL-encoded bodies



app.get('/',(req,res)=>{
    res.sendFile('index.html');
});
app.post('/',(req,res)=>{
    console.log(req.body);
    res.send({'MYDATA':'value','wfe':'FEWSDC'});
});
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server started at 3000');
});

