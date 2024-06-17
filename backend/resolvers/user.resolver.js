import {user} from '../dummyData/data.js'

const userResolver={
    Query:{
        // send all users list
        users:()=>{
            return user
        },

        // send single user
        user:async(parent,{userId})=>{
            return user.find((elem)=> elem._id==userId)
        },

        // Authentication of user
        authUser:(parent, {userId})=>{
            let userExist = user.filter((elem)=>{
                if(elem._id==userId) return elem;
                }
            )
            return userExist[0]
        }
    },
    Mutation:{}

}

export default userResolver;