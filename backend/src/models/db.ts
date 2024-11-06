import mongoose  from "mongoose";
mongoose.connect("mongodb+srv://admin:fvmQ1D2B6iDKmUM6@cluster0.ztkcnap.mongodb.net/SofteousAlign");

const adminSchema = new mongoose.Schema ({
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
})
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  const employeeSchema = new mongoose.Schema({
    
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
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
    phoneNo: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      required: true,
      trim: true,
    },
});

const Admin = mongoose.model("Admin", adminSchema);
const Employee = mongoose.model("Employee", employeeSchema)
export  {Admin, Employee};

