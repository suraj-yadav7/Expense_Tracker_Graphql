import express from 'express'
import  dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import cors from 'cors'
import http from 'http'
import passport from 'passport'
import session from 'express-session'
import {buildContext} from 'graphql-passport'
import connectMongo from 'connect-mongodb-session'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import mergedResolver from './resolvers/resolverIndex.js'
import mergedTypeDefs from './typeDefs/typeDefsIndex.js'
import connectDB from './db.js'
import { configurePassport } from './passport/passport.config.js'

dotenv.config()
configurePassport()
const PORT = process.env.PORT

const startServer = async()=>{

const app = express()

app.use(morgan('dev'))
const corsOption={
    origin:'http://locahost:5173',
    method:["GET","POST", "PUT","DELETE"],
    credentials:true,
    optionSuccessStatus:200
};

const httpServer = http.createServer(app)
const mongoDbStore = connectMongo(session);
const store = new mongoDbStore({
    uri:process.env.MONGO_URI,
    dbName:"ExpenseTrackerQl",
    collection:"sesssion"
})
store.on("error",(err)=> console.log("error at store: ", err))

app.use(
    session({
        secret:process.env.SESSION_SECERET,
        resave:false,  //It is made false as we don't want to save user each session in mongodb
        saveUninitialized:false,
        cookie:{
            maxAge:1000*60*60*24*3,
            httpOnly:true
        },
        store:store
    })
)

app.use(passport.initialize());
app.use(passport.session())

// Apollo server - graphql
const apolloServer = new ApolloServer({
    resolvers:mergedResolver,
    typeDefs: mergedTypeDefs,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
await apolloServer.start();

app.use('/', 
    cors(corsOption), 
    express.json(),
    expressMiddleware(apolloServer, {
        context:async({req})=> buildContext({req,res})
    })
    );

await new Promise((resolve)=> {
    httpServer.listen({port:PORT}, resolve)
    console.log(`Server running at Port : ${PORT}`.bgBlue.white)
});
await connectDB();

}
startServer().catch((err)=> console.log(`Error in starting the server: ${err}`.bgRed.yellow))


