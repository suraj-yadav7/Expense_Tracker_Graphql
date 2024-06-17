import express from 'express'
import  dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import cors from 'cors'
import http from 'http'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import mergedResolver from './resolvers/resolverIndex.js'
import mergedTypeDefs from './typeDefs/typeDefsIndex.js'

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(morgan('dev'))
const corsOption={
    origin:'http://locahost:5173',
    method:["GET","POST", "PUT","DELETE"],
    credentials:true,
    optionSuccessStatus:200
};

const httpServer = http.createServer(app)
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
        context:async({req})=> ({token:req.headers.token})
    })
    )

await new Promise((resolve)=> {
    httpServer.listen({port:PORT}, resolve)
    console.log(`Server running at Port : ${PORT}`.bgBlue.white)
});





