import jwt from 'jsonwebtoken';
import { createError } from '../error.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const verifyToken = async(req,res,next)=>{
    try {
        // generated token comes on header
        if(!req.headers.authorization) return next(createError(401,"Your not authorized user!"));
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token,"TokenVerify");
    
        if(!token){
            return next(createError(401,"Your not authorized user!"));
        }
        // decode the token to get the user id and other details
        const decode = jwt.verify(token,process.env.JWT)
        // set the decoded user id on req & calling the next() 
        console.log(decode,"Verifyedtoken");
        req.user = decode;
        // console.log(req.user,"userId");          
        return next()
        
    } catch (error) {
        return next(error);
    }
}
