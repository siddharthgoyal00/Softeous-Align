import { JWT_SECRET } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";
const {verify} = jwt;
export const authMiddleware = (req: any, res: any, next:any) => {     
    const authHeader = req.headers['authorization'];    
    console.log("Authorization Header:", authHeader); // Debug
    if (!authHeader || !authHeader.startsWith('Bearer ')) { 
        console.log("No valid Authorization header found"); 
         res.status(403).json({});  
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, JWT_SECRET) as JwtPayload;
        console.log("Decoded JWT Payload:", decoded); // Debugging
        if(req.body.adminId!=null){
            req.body.adminId = decoded.adminId;
        }else{
            throw new Error("admin id not found!")
        }
          
        next();
    } catch (err) {
        console.error("JWT Verification Failed:", err);
        res.status(403).json({});
    }
};