import passport from "passport";
import bcrypt from 'bcryptjs'
import { GraphQLLocalStrategy } from "graphql-passport";
import User from "../models/user.model.js"

export const configurePassport = async()=>{
    passport.serializeUser((user, done)=>{
        console.log("serializing user id: ", user)
        // done is callback functin, first param is err and second is userId
        done(null, user.id)
    });

    passport.deserializeUser(async(id, done)=>{
        console.log("deserializing user", id)
        try{
            const userExist = await User.findById(id)
            done(null,userExist)
            console.log("deserial user: ", userExist)
        }
        catch(error){
            done(error)
        }
    });

    passport.use(
        new GraphQLLocalStrategy(async(username, password, done)=>{
            console.log("passport runn")
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
};