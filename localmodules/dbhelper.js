const mongoose=require('mongoose');
const tempUrl='mongodb+srv://admin-akshat:IVyDhLEFJVX1coO6@cluster0-1viwd.mongodb.net/findQ?retryWrites=true&w=majority';
const personSchema=mongoose.Schema({
    cid:String,
    intags:Array
});
const Person=mongoose.model('Person',personSchema);

async function init(url){
    try {
        // let t1=process.hrtime();
        const db= await mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true});
        console.log('db connected');
        // let t2=process.hrtime(t1);
    } catch (error) {
        console.log(error);
    }
}
async function closeCon(){
     await mongoose.disconnect().then(()=>{
        console.log('disconnected');
    })
}
async function doStuff(intags){
    let t1=process.hrtime();
    await init(tempUrl);
    await Person.where({'intags':'sfa'}).find((err,res)=>{
        if(!err) console.log(res); 
    })
    await closeCon();
    let t2=process.hrtime(t1);
    console.log("TIME TAKEN TO PREPARE A RESPONSE"+t2[0]+"s  "+t2[1]/1000000+"ms");
}




// 


module.exports={init};