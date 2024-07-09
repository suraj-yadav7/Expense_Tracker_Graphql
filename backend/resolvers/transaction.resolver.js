import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
    Query:{
        transactions:async(_,__,context)=>{
            try{
                if(!context.getUser()) throw new Error("User is not authorized")
                let userid= await context.getUser()._id
                let allTransactions= await Transaction.find({userID:userid})
                return allTransactions
            }catch(err){
                console.error("Error in getting all tansactins")
                throw new Error(err.message || 'Internal server error')
            }
        },
        singleTransaction: async(_,{transactionId})=>{
            try{
                let singleTrans = await Transaction.findById(transactionId)
                if(!singleTrans){
                    throw new Error("Failed to get transaction of user")
                }
                return singleTrans
            }
            catch(err){
                console.error("Error in getting single user transactins")
                throw new Error(err.message || 'Internal server error')
            }
        },
        categoryTransaction:async(_,__,context)=>{
            try{
                if(!context.getUser()) throw new Error("Unauthorized")
                let userID=await context.getUser()._id
                // userID must same as mongoose schema id name
                let transactions=await Transaction.find({userID})
                let categoryMap={}
                transactions.forEach((trans)=>{
                    if(!categoryMap[trans.category]){
                        categoryMap[trans.category]=0
                    }
                    categoryMap[trans.category] +=trans.amount
                    
                })
                console.log("category map: ", categoryMap)
                let category= Object.entries(categoryMap).map(([category, totalAmount])=> ({category, totalAmount}))
                return category;
            }
            catch(error){
                console.log("error in category resolver: ", error)
                throw new Error(error.message || "Internal server error")
            }
        }
    },
    Mutation:{
        createTransaction:async(_,{input},context)=>{
            try {
                const {description,paymentType,category,amount,date, location} = input
                if(!description || !paymentType || !category || !amount ||!date){
                    throw new Error("All fields are required")
                }
                const userID = await context.getUser()._id
                const creatTrans = await new Transaction({
                    userID,
                    description,
                    paymentType,
                    category,
                    amount,
                    date,
                    location
                })
                await creatTrans.save()
                return creatTrans
            } catch (error) {
                console.error("Error in creating user transactins")
                throw new Error(error.message || 'Internal server error')
            }
        },

        updateTransaction:async(_,{input})=>{
            const {_id} = input
            try {
                let updateTrans = await Transaction.findByIdAndUpdate(_id, input)
                return updateTrans
            } catch (error) {
                console.error("Error in updating user transactins")
                throw new Error(err.message || 'Internal server error')
            }
        },

        deleteTransaction:async(_,{transactionId})=>{
            try {
                let deletedTrans = await Transaction.findByIdAndDelete(transactionId)
                return deletedTrans
            } catch (error) {
                console.error("Error in deleting user transactins")
                throw new Error(err.message || 'Internal server error')
            }
        }
    },
    // Relationship Transaction with user
    Transaction:{
        user:async(parent)=>{
            try {
                let user=await User.findById(parent.userID)
                return user
            } catch (error) {
                console.log("Error in getting relationship user", err);
            }
        }
    }
};

export default transactionResolver;