

async function dbInit(DB_URL){
    console.log('asds');
    return await mongoose.createConnection(DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

}

export default dbInit();