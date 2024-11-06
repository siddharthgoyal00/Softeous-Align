import { JWT_SECRET } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";
const {verify} = jwt;
export const authMiddleware = (req: any, res: any, next:any) => {     
    try {
        console.log(req.headers)
    const authHeader = req.headers['authorization'];    
    console.log("Authorization Header:", authHeader); // Debug
    if (!authHeader || !authHeader.startsWith('Bearer')) { 
        console.log("No valid Authorization header found"); 
        return  res.status(403).json({});  
    }

    const token = authHeader.split(' ')[1];

   
        const decoded:any = verify(token, JWT_SECRET) as JwtPayload;
        console.log("Decoded JWT Payload:", decoded); // Debugging
      if(!decoded && (decoded.adminId)) {
        throw new Error("Admin not found or invalid token")
      }    
        next();
    } catch (err) {
        console.error("JWT Verification Failed:", err);
        res.status(403).json({});
    }
};