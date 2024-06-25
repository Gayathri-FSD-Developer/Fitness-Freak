import jwt from 'jsonwebtoken';
import { createError } from '../error.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const verifyToken = async(req,res,next)=>{
    try {
        // generated token comes on header
        if(!req.headers.authorization) return next(createError(401,"Your not authorized user!"));
<<<<<<< HEAD
        const token = req.headers.authorization.split(" ")[1];
        console.log(token,"verifyToken");

=======
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token,"TokenVerify");
    
>>>>>>> 03f893c7e93ed1e1d9991b3e51f05e3ab14b7c51
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
