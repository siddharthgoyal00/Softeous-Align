import { useState } from "react";
import { BottomWarning } from "../../../components/BottomWarning";
import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import { InputBox } from "../../../components/InputBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const [companyname, Setcompanyname] = useState("");
  const [name, Setname] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-slate-100 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-xl">
            <Heading label={"Sign up"} />
            <InputBox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                Setcompanyname(e.target.value);
              }}
              placeholder="Abc"
              label={"Company Name"}
            />
            <InputBox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                Setname(e.target.value);
              }}
              placeholder="abc"
              label={"Your Name"}
            />
            <InputBox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                SetEmail(e.target.value);
              }}
              placeholder="abc@gmail.com"
              label={"Email"}
            />
            <InputBox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                SetPassword(e.target.value);
              }}
              placeholder="password"
              label={"Password"}
            />
            <div className="pt-4">
              <Button
                onClick={async () => {
                  const response = await axios.post(
                    "http://localhost:3000/admin/signup",
                    {
                      email: email,
                      companyname: companyname,
                      name: name,
                      password: password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/AdminDashboard");
                }}
                label={"Sign up"}
              />
            </div>
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Login"}
              to={"/login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};