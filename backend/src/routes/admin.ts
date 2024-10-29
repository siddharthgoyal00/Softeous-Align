import express, { NextFunction, Request, Response } from "express";
import { z } from "zod";
import Admin from "../models/db"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const adminRouter  = express.Router();

const signupSchema = z.object({
   name: z.string(),
   email: z.string().email(),
  password: z.string()
})

adminRouter.post("/signup", async (req:Request, res: Response) => {
    const parsed = signupSchema.safeParse(req.body);
    console.log("Zod parsing error ",parsed.error);
    if (!parsed.success && !req.body) {
      res.json({
        msg: "wrong inputs / Email already taken",
      });
    } else {
      const existingUser = await Admin.findOne({
        email: req.body.email,
      });
      if (existingUser) {
        res.json({
          msg: "wrong inputs / Email already taken",
        });
      } else {
        const admin = await Admin.create({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        const adminId: any = admin._id;
        const token = jwt.sign({ adminId }, JWT_SECRET); // creates the jwt token using their id and the secret key
        res.json({
          msg: "admin created successfully",
          token: token, 
        });
      }
    }
  });



export{ adminRouter} ;