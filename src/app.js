import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";//cokies execess aur send karne ke liey
import router from "./routes/user.route.js"

const app= express()

app.use(cors());

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use (cookieParser())

app.use('/api/User',router)
export {app};