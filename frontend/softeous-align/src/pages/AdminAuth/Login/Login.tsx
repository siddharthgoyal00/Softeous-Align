import { useState } from "react";
import { BottomWarning } from "../../../components/BottomWarning";
import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import { InputBox } from "../../../components/InputBox";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="bg-slate-100 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-xl">
            <Heading label={"Login"} />
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
                    "http://localhost:3000/admin/login",
                    {
                      email: email,                    
                      password: password,
                    }
                  );
                  localStorage.setItem("AdminToken", response.data.token);
                  navigate("/admin-dashboard");
                }}
                label={"Login"}
              />
            </div>
            <BottomWarning
              label={"Don't have any account?"}
              buttonText={"Create an Account"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
