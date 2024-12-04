import {User} from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export async function signup(req,res){
    try {
      const {email, password, username} = req.body;
      if(!email || !password || !username){
        return res.status(400).json({success:false,massage:"All fields are required"})
      }
      //abc@xxyz
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)){
        return res.status(400).json({success:false,massage:"Invalid email format"})
      }
      if(password.length < 6){
        return res.status(400).json({success:false,massage:"Password must be at least 6 characters long"})
      }
      const existingUserByEmail = await User.findOne({email: email})

      if(existingUserByEmail){
        return res.status(400).json({success:false,massage:"Email already exists"})
      }

      const existingUserByUsername = await User.findOne({username:username})

    if(existingUserByUsername){
        return res.status(400).json({success:false,massage:"Username already exists"})
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      //12345 =>@#!^#!#!#

      const PROFILE_PICS  = ["/avatar1.png","/avatar2.png","/avatar3.png"];

      const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
        email,
        password:hashedPassword,
        username,
        image
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id,res); //gener generates token and set cookie for new user and saves it to session storage 
      await newUser.save()  // save this user to the database

      //remove password from the response before sending it to the client.
      res.status(201).json({success:true,user:{
        ...newUser._doc, 
        password:"",
      },

  //dont want to send password to the client
    });
    }

    
    
    } catch(error){
        console.log("Error in signup controller",error.message)
        res.status(500).json({success:false,massage:"Internal server error"})
    
    }
}


export async function login(req,res){
   try {
     const {email, password} = req.body;
     if(!email ||!password){
       return res.status(400).json({success:false,massage:"All fields are required"});
     }
     const user = await User.findOne({email:email});
     if(!user){
       return res.status(404).json({success:false,massage:"Invalid credentials"});
     }
     const isPasswordCorrect = await bcryptjs.compare(password, user.password);
     if(!isPasswordCorrect){
       return res.status(400).json({success:false,massage:"Invalid credentials"});
     }
     generateTokenAndSetCookie(user._id,res); //gener generates token and set cookie for new user and saves it to session storage

     res.status(200).json({
      success:true,
      user:{
        ...user._doc,
        password:""
      }
    }) //return user object and deleting the password field

   } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({success:false,massage:"Internal server error"});
   }
}
export async function logout(req,res){
    try {
      res.clearCookie("jwt-netflix");
      res.status(200).json({success:true,massage:"Logout successfully"});
    } catch (error) {
      console.log("Error in Logout controller",error.message);
      res.status(500).json({success:false,massage:"Internal server error"});
    }
}