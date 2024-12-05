import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"
import {ENV_VARS} from "../config/envVar.js"

export const protectRoute = async (req, res , next)=>{
    try {
        const token = req.cookies["jwt-netflix"];
        if(!token){
            return res.status(401).json({success:false, massage:"Unauthorized - No Token Provided"});
        }
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false, massage:"Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({success:false, massage:"User Not Found"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({success:false, massage:"Internal Server Error"});
    }
}