import { useState } from "react";

import "./App.css";
import { Home } from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/AdminAuth/Signup/Signup";
import { Login } from "./pages/AdminAuth/Login/Login";
import  Navbar  from "./components/Navbar";
import { AdminDashboard } from "./pages/AdminDashboard/AdminDashboard";
import { EmpSignUp } from "./pages/EmployeeAuth/EmpSignup/EmpSignup";
import { EmployeeDashboard } from "./pages/EmployeeDashboard/EmployeeDashboard";
import { EmpLogin } from "./pages/EmployeeAuth/EmpLogin/EmpLogin";
import { LandingPage } from "./pages/LandingPage/LandingPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
         
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            
            <Route path="/create-employee" element={<EmpSignUp />} />
            <Route path="/employee-Login" element={<EmpLogin />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
