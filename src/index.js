
import connectDB from "./db/config.js";
import dotenv from "dotenv";
import {app} from "./app.js"
dotenv.config();
const port = process.env.PORT || 8000;



connectDB()
.then(()=>{
   app.listen(port,()=>{
    console.log(`Server Started at PORT ${port}`);
    
   })
})
.catch((err)=>{
    console.log("MONGO DB connection failed !! ",err);
});

















































/*
//approach 1
import express from "express";
const app = express();
(async ()=> {
    try{
       await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
       app.on("error",(error)=>{
        console.log("ERR: ",error);
        throw error;
       });
       app.listen(process.env.PORT,()=>{
        console.log(`App is listing on port ${process.env.PORT}`);
       });
    }catch(err){
        console.error("ERROR: ",err);
        throw err; 
    }
})();
*/

