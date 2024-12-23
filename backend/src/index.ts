import express  from "express"
import cors  from "cors"
import dotenv from 'dotenv';
import { adminRouter } from "./routes/admin";
import { employeeRouter } from "./routes/employee";
dotenv.config();  // This will load variables from .env into process.env

const app = express();

app.use(express.json());
app.use(cors());
app.use( "/admin" ,adminRouter ); 
app.use("/employee" , employeeRouter)

 app.listen(process.env.PORT , ()=>{
    console.log(`server is running on the port ${process.env.PORT}`)
 }) 