import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    paymentType:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        default:"Unknown"
    },
    date:{
        type:Date,
        required:true
    }
},{timestamps:true})

const Transaction = mongoose.model("transaction", TransactionSchema);

export default Transaction;