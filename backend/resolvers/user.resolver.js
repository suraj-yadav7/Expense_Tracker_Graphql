import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const userResolver={
    Query:{
        // send single user
        user:async(_,{userId})=>{
            try{
                const singleUser= await  User.findByID(userId)
                return singleUser
            }
            catch(err){
                console.err("Error in single user: ", err)
                throw new Error(err.message || "Internal server error")
            }
        },

        // Authentication of user
        authUser: async (_,_,context)=>{
            try{
                const user = await context.getUser()
                return user
            }
            catch(err){
                console.error("Error in auth: ", err)
                throw new Error(err.message || "Internal server error")
            }
        }
    },
    Mutation:{
        // Signup new user
        signUp: async(_,{input},context)=>{
            try{
                const {username, name, password,gender}=input
                if(!username || !name || !password || !gender){
                    throw new Error("All input fields are required")
                }
                let userExist=await User.findOne({username})
                if(userExist){
                    throw new Error ("User already exist")
                }

                const maleProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
                const femaleProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

                let salt = await bcrypt.genSalt(10)
                let hashedPassword = await bcrypt.hash(password, salt)
                
                let createUser = await new User({
                    username,
                    name,
                    password:hashedPassword,
                    gender,
                    profilePicture:gender==="male"?maleProfilePic:femaleProfilePic
                })
                await createUser.save()
                await context.login(createUser)
                return createUser

            }catch(err){
                console.log("Error in signup: ", err)
                throw new Error(err.message||"Internal server error")

            }
        },
        // Login user
        login:async(_,{input}, context)=>{
            try {
                const {username, password} = input
                if(!username || !password){
                    throw new Error("All input fields required")
                }
                const {user}=await context.authenticate('graphql-local',{username, password})
                await context.login(user)
                return user
            } catch (error) {
                console.log("Error in login: ", error)
                throw new Error(error.message || "Internal server error")
            }
        },

        logout:async(_,_,context)=>{
            try {
                await context.logout()
                req.session.destroy((err)=> {
                    if(err) throw err
                })
                res.clearCookies("connection.id")
                return {message:"logged out successfully"}
            } catch (error) {
                console.log("Error in logout: ", err)                
                throw new Error(error.message || "Internal server error")
            }
        }
    }

}

export default userResolver;