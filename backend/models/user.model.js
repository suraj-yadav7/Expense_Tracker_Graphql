import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:['male','female']
    },
},{timestamps:true})

const User = mongoose.model("user", UserSchema)
export default User;