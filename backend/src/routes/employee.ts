import express, { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { Employee } from "../models/db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { authMiddleware } from "../middleware";

const employeeRouter = express.Router();

//  employee signup route
const signupSchemaEmployee = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  phoneNo: z.string(),
  gender: z.string(),
  address: z.string(),
  jobTitle: z.string(),
  salary: z.string(),
});

employeeRouter.post("/createEmployee", authMiddleware , async (req: Request, res: Response) => {
  try {
    console.log("request body:", req.body);
    const parsed = signupSchemaEmployee.safeParse(req.body);
    if (!parsed.success) {
      console.log("input validation failed !!");
      console.log("Zod parsing error ", parsed.error);
      res.status(400).json({
        msg: "check data format or ensure all required fields are provided ",
        errors: parsed.error.errors,
      });
    }
    const existingEmployee = await Employee.findOne({
      email: req.body.email,
    });
    if (existingEmployee) {
      console.log("email already taken");
      res.status(409).json({
        msg: "Email already taken",
      });
    }
    const newEmployee = await Employee.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNo: req.body.phoneNo,
      gender: req.body.gender,
      address: req.body.address,
      jobTitle: req.body.jobTitle,
      salary: req.body.salary,
    });
    const employeeId: any = newEmployee._id;
    const employeeToken = jwt.sign({ employeeId }, JWT_SECRET); // creates the jwt token using their id and the secret key
    res.status(201).json({
      msg: "employee created successfully",
      token: employeeToken,
    });
  } catch (error) {
    console.error("an error occured", error);
    res.status(500).json({
      msg: "error occured !!!",
    });
  }
});

// employee login route 
const LoginSchemaEmployee = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  
  employeeRouter.post("/loginEmployee", async (req: Request, res: Response) => {
    try {
      const parsed = LoginSchemaEmployee.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          msg: "at employee login input validation failed !!",
        });
      }
      const employee = await Employee.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (employee) {
        const employeeToken = jwt.sign({ employeeId: employee._id }, JWT_SECRET);
        res.json({
          token: employeeToken,
        });
      }
    } catch (error) {
      res.status(401).json({
        message: "Error while logging in",
      });
    }
  });
  

export { employeeRouter };
