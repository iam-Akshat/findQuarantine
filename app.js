const express= require('express');
const mongoose=require('mongoose');
import dbInit from './helpers/dbhelper.js';
require('dotenv').config()

const app=express();
const db=dbInit();
app.use(express.static('public'));

app.use(express.json());//Used for parsing form data
app.use(express.urlencoded({extended:true})); //Parse URL-encoded bodies


app.get('/',(req,res)=>{
    res.sendFile('index.html');
});
app.post('/',(req,res)=>{
    console.log(req.body);
    res.redirect('/');
});
app.listen(process.env.PORT || 3000,()=>console.log('Server started at 3000'));