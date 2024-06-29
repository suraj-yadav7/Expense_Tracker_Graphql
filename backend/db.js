import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const uri=process.env.MONGO_URI

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(uri,{
            dbName:process.env.DATABASE_NAME
        })
        console.log(`mongodb connect at : ${connectionInstance.connection.host}`.bgGreen.white)
    }
    catch(error){   
        console.log(`Error while connecting mongodb:${error} `.bgRed.white)
    }
};
export default connectDB;
