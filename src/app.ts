import express  from "express";

//import {connectToDatabase} from './service/database.service'

import connect from './db/connect'

import productRouter from './routes/product'
import userRouter from './routes/user'

var bodyParser = require('body-parser')

const app=express();

var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//app.use(urlencodedParser)
// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }))
app.use("/product",productRouter)
app.use("/user",userRouter)



app.get('/api/hi',(req, res) => {
    res.send('Hello World')
})

app.listen(3000,()=>{
    console.log("Server is running on port: ",process.env.PORT || 3000)
  //  connectToDatabase()
  connect()
  
})
