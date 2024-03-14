import {useContext, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {UserContext} from "../UserContext";

export const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
const [redirect,setRedirect]= useState(false)
  const [postInputs, setPostInputs] = useState({
    password: "",
    username: ""
  });
  const {setUserInfo} = useContext(UserContext);

  async function sendRequest() {
    try {
     const response = await fetch(
        `http://localhost:3001/signin`,{
          method: "POST",
          body:JSON.stringify(postInputs),
          headers:{'Content-Type': 'application/json'},
          credentials:'include'
        }
      );
      if (response.ok) {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
      } else {
        alert('wrong credentials');
      }
      
    } catch (e) {
      alert("Error while signing in");
    }
  }
if(redirect){
  return <Navigate to={'/posts'}/>
}
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex lg:ml-20 justify-center">
        <div>
          <div className="text-3xl font-extrabold">Sign in to your Account</div>
          <LabelledInput
            label="Username"
            placeholder="Ana786"
            onChange={(e) =>
              setPostInputs({ ...postInputs, username: e.target.value })
            }
          />
          <label className="block mb-2 text-sm font-medium text-black">Password</label>
          <div className="relative">
            <input
            label="Password"
              onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
              type={showPassword ? 'text' : 'password'}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
          <button onClick={sendRequest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign-in</button>
          <div>
            Don't have an account?{" "}
            <span className="underline cursor-pointer" onClick={() => navigate("/signup")}>Sign-up</span>
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
}

export default Signin;
