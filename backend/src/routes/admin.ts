import express, { NextFunction, Request, Response } from "express";
import { z } from "zod";
import Admin from "../models/db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const adminRouter = express.Router();

// signup route
const signupSchema = z.object({
  companyname: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

adminRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    console.log("request body:", req.body)
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("input validation failed !!");
      console.log("Zod parsing error ", parsed.error);
      res.status(400).json({
        msg: "check data format or ensure all required fields are provided ",
        errors: parsed.error.errors
      });
    }
    const existingAdmin = await Admin.findOne({
      email: req.body.email,
    });
    if (existingAdmin) {
      console.log("email already taken");
      res.status(409).json({
        msg: "Email already taken",
      });
    }
    const newadmin = await Admin.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      companyname: req.body.companyname,
    });
    const adminId: any = newadmin._id;
    const token = jwt.sign({ adminId }, JWT_SECRET); // creates the jwt token using their id and the secret key
    res.status(201).json({
      msg: "admin created successfully",
      token: token,
    });
  } catch (error) {
    console.error("an error occured", error);
    res.status(500).json({
      msg: "error occured !!!",
    });
  }
}); 

// login route
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

adminRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        msg: "at login input validation failed !!",
      });
    }
    const admin = await Admin.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (admin) {
      const token = jwt.sign({ adminId: admin._id }, JWT_SECRET);
      res.json({
        token: token,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Error while logging in",
    });
  }
});

export { adminRouter };
