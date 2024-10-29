import express  from "express"
import cors  from "cors"
import dotenv from 'dotenv';
dotenv.config();  // This will load variables from .env into process.env

const app = express();
app.use(cors());
app.use(express.json());
 app.listen(process.env.PORT , ()=>{
    console.log(`server is running on the port ${process.env.PORT}`)
 })