const {default: mongoose} = require('mongoose');

const dbConnect = async () =>{
    try{
        const db = await mongoose.connect(process.env.MONGO_CONNECT_STRING)
        if(db.connection.readyState === 1) console.log("CONNECT TO DB SUCCESSFUL")
        else console.log("CONNECT TO DB FAILED")
    }catch(error){
        console.log("Error connecting to database");
        throw new Error(error);
    }
}
module.exports = dbConnect;