const express=require('express')
const cors= require('cors')
const dotenv=require('dotenv')
const connect =require("./Config/db")
const app = express()
const PORT=process.env.PORT||7890;

const cookieParser = require('cookie-parser');
const blogRoute=require("./Routes/blogRoute")


app.use(cookieParser());
dotenv.config()


app.use(express.json())
app.use(cors())

app.use("/BlogPersonalApp/blog",blogRoute);

app.listen(PORT,()=>{
    console.log("server is running")
    connect()
})