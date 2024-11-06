import { useState } from "react";
import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import { InputBox } from "../../../components/InputBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EmpSignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-slate-100 h-screen flex justify-center mt-8">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-150 text-center p-2 h-max px-4 shadow-xl">
            <Heading label={"Create Employee"} />
            <div className="grid grid-cols-2 gap-4 pt-1">
              <InputBox
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setfirstName(e.target.value);
                }}
                placeholder="Abc"
                label={"First Name"}
              />
              <InputBox
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setlastName(e.target.value);
                }}
                placeholder="abc"
                label={"Last Name"}
              />
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
              <InputBox
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhoneNo(e.target.value);
                }}
                placeholder="xxxxxx"
                label={"PhoneNo"}
              />
              <InputBox
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAddress(e.target.value);
                }}
                placeholder="address"
                label={"Address"}
              />
              <InputBox
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setGender(e.target.value);
                }}
                placeholder="gender"
                label={"Gender"}
              />
              <InputBox
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setJobTitle(e.target.value);
                }}
                placeholder="job title"
                label={"Job Title"}
              />
              <InputBox
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSalary(e.target.value);
                }}
                placeholder="salary"
                label={"salary"}
              />
            </div>
            <div className="pt-4">
              <Button
                onClick={async () => {
                  const adminToken = localStorage.getItem("AdminToken");
                  const response = await axios.post(
                    "http://localhost:3000/employee/createEmployee",
                    {
                      firstName: firstName,
                      lastName: lastName,
                      email: email,
                      password: password,
                      phoneNo: phoneNo,
                      gender: gender,
                      address: address,
                      jobTitle: jobTitle,
                      salary: salary,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${adminToken}`, // Using admin token
                      },
                    }
                  );
                  localStorage.setItem("employeeToken", response.data.token);
                  navigate("/employee-dashboard");
                }}
                label={"Create Employee"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
