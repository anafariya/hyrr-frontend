import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  async function sendRequest() {
    
      const response = await fetch(
        `http://localhost:3001/signup`,
        {
            method: 'POST',
            body:JSON.stringify(postInputs),
            headers:{'Content-Type': 'application/json'}
        }
       
      );
      if(response.status !== 200){
        alert("Registration failed")
      }
      else{
        setTimeout(() => {
          alert("We just sent you a welcome email!");
          navigate("/posts");
      }, 2000);      
      }
    
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex lg:ml-20 justify-center">
        <div>
          <div className="text-3xl font-extrabold">Create an Account</div>
          <LabelledInput
            label="Name"
            placeholder="Ana"
            onChange={(e) =>
              setPostInputs({ ...postInputs, name: e.target.value })
            }
          />
          <LabelledInput
            label="Email"
            placeholder="Ana786@gmail.com"
            onChange={(e) =>
              setPostInputs({ ...postInputs, email: e.target.value })
            }
          />
          <LabelledInput
            label="Username"
            placeholder="Ana786"
            onChange={(e) =>
              setPostInputs({ ...postInputs, username: e.target.value })
            }
          />
          <label className="block mb-2 text-sm font-medium text-black">
            Password
          </label>
          <div className="relative">
            <input
              onChange={(e) =>
                setPostInputs({ ...postInputs, password: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              placeholder="123456"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
              required
            />
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.485 14.121A7 7 0 0112 19.95a7 7 0 01-5.485-2.829m2.121-2.122a2 2 0 002.828 2.828M7.758 9.172a7 7 0 010-5.656 7 7 0 015.656 0m2.828 2.828a2 2 0 00-2.828-2.828"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={() => setTermsChecked(!termsChecked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="underline cursor-pointer">
                Terms and Conditions
              </span>
            </span>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={sendRequest}
          >
            Sign-up
          </button>
          <div>
            Already have an account?{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => navigate("/signin")}
            >
              Sign-in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function LabelledInput({ label, placeholder, onChange }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={"text"}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Signup;
