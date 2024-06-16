import express from 'express'
import  dotenv from 'dotenv'

const app = express()

dotenv.config()
const port = process.env.PORT

app.get("/", async(req, res)=>{
    res.send("<h3>Expense tracker web application using graphql")
})

app.listen(port || 4000, ()=>{
    console.log(`Server running at Port : ${port}`)
});