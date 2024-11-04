import mongoose from "mongoose";
mongoose.connect("mongodb+srv://admin:fvmQ1D2B6iDKmUM6@cluster0.ztkcnap.mongodb.net/SofteousAlign");
const adminSchema = new mongoose.Schema({
  companyname : {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  }, 
  password: {
    type: String,
    required: true,
    trim: true
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
