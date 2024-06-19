import passport from "passport";
import bcrypt from 'bcryptjs'
import { GraphQLLocalStrategy } from "graphql-passport";
import User from "../models/user.model.js"

export const configurePassport = async()=>{
    passport.serializeUser((user, done)=>{
        console.log("serializing user")
        done(null, user.id)
    });

    passport.deserializeUser(async(id, done)=>{
        console.log("deserializing user")
        try{
            const userExist = await User.findById(id)
            done(null,userExist)
        }
        catch(error){
            done(error)
        }
    });

    passport.use(
        new GraphQLLocalStrategy(async(username, password, done)=>{
            try{
                const userPresent= await User.findOne({username})
                if(!userPresent){
                    throw new Error("User don't exist")
                }
                const validatePassword = await bcrypt.compare(password, userPresent.password)
                if(!validatePassword){
                    throw new Error("Invalid username or password")
                }
                return done(null, userPresent)
            }
            catch(error){
                return done(error)
            }
        })
    )
}