const mongoose=require('mongoose');
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
async function getRandom(){
    //const data={'sameTags':,'cid':cid}
    console.log('RANDOM FUCNTION HERE');
    return Person.find({}).then((foundPeople)=>{
        console.log("list"+foundPeople);
        const randomGuy=foundPeople[Math.floor(foundPeople.length-1)];
        console.log(randomGuy)
        const data={'sameTags':randomGuy.intags.slice(0,2),'cid':randomGuy.cid}
        return data;
    });
}
async function doStuff(obj,url){
    const newUser=new Person(obj);

    tagsArr=obj.intags;
    try {
        await init(url);
    } catch (error) {
        if(error);  
    }
    newUser.save();
    console.log('This array was received in find function');
    console.log(tagsArr);
    const dat=Person.find({intags:{$in:tagsArr}}).then((val)=>{
        if(val.length>0){
            return processResult(tagsArr,val) ;
        }else{
            return {};
        }
        
    });
    return dat;
    // Person.find({intags:{$in:tagsArr}},(err,res)=>{
    //     if(!err){
    //         //checks if any tags match at all
    //         if(res.length>0){
    //             console.log('step 3');
    //             //let m=processResult(tagsArr,res).then((val)=>{return val});
    //             //console.log(m);
    //             return res;
    //         }else{
    //             console.log('step err');
    //             return -1;
    //         }
    //     }
    //     return 'why js why';
    // });
    // await closeCon();
    // let t2=process.hrtime(t1);
    // console.log("TIME TAKEN TO PREPARE A RESPONSE "+t2[0]+"s  "+t2[1]/1000000+"ms");
}
// let ar=['coding','sleeping'];
// doStuff(ar);


//compares array sent by current user with matching arrays
//sent by db to find array with max common elements
function processResult(tagsArr,resultAr){
    // console.log('step processing found items');
    let maxLen=0;
    let cid;
    let bestSet=new Set();   //stores set with most number of common
    let tagSet=new Set(tagsArr);
    let l=resultAr.length;
    for(let t=0;t<l;t++){
        let set=new Set(resultAr[t].intags);
        let commonTags=intersection(tagSet,set);
        if(commonTags.size>maxLen){
            maxLen=commonTags.size;
            bestSet=commonTags;
            cid=resultAr[t].cid;
        }

    }
    const _h=Array.from(bestSet);
    const data={'sameTags':_h,'cid':cid}
    // console.log(_h);
    console.log('Processign was done')
    return data;
    
}
///set intersection function
function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection;
}
//console.log(processResult(['a','bc','afas','atlos'],[{intags:['m','rt','afas']},{intags:['a','afas']}]));
module.exports={doStuff,getRandom};