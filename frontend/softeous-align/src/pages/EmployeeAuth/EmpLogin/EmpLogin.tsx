
import { useState } from "react";

import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import { InputBox } from "../../../components/InputBox";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const EmpLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="bg-gray-900 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-xl">
            <Heading label={"Employee Login"} />
            <InputBox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              placeholder="abc@gmail.com"
              label={"Email"}
            />
            <InputBox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
              label={"Password"}
            />
            <div className="pt-4">
            <Button
                onClick={async () => {
                  const response = await axios.post(
                    "http://localhost:3000/employee/loginEmployee",
                    {
                      email: email,                    
                      password: password,
                    }
                  );
                  localStorage.setItem("EmployeeToken", response.data.token);
                  navigate("/employee-dashboard");
                }}
                label={"Login"}
              />
            </div>
        
          </div>
        </div>
      </div>
    </div>
  );
};
