import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})

const generateToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}

const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        if(!name||!email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const existEmail=await User.findOne({email})
        if(existEmail){
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            })
        }
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Invalid email"
            })
            if(password.length<6){
                return res.json({
                    success:false,
                    message:"Password must be at least 6 characters long"
                })
            }
        }
        const newUser=await User.create({name,email,password})
        const token= generateToken(newUser._id)
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:newUser,
            token
        })

    }catch(error){
        console.log("Error in user registration",error);
        res.status(500).json({
            success:false,
            message:"Error in user registration",
            error:error.message
        })
    }
}

const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
    }
    catch(error){
        console.log("Error in user login",error);
        res.status(500).json({
            success:false,
            message:"Error in user login",
            error:error.message
        })
    }
}
export {registerUser,loginUser};