import { createPortal } from "react-dom";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { X } from "lucide-react";
import { User } from "lucide-react";
import { Upload } from "lucide-react";
import { useState } from "react";
function Login({ setLogin }) {
  const [signup, setSignup] = useState(false);
  const [name,setname] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [logo,setlogo] = useState(null);

  function handleLogo(e) {
    const file = e.target.files[0];
    if (file) setlogo(file);
  }

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[4px] ">
      <div className="bg-gray-100 rounded-lg py-4 lg:py-6 px-6 sm:px-8 md:px-10 space-y-2 sm:space-y-3">
        <div className="flex justify-end">
          <span
            className="text-gray-400 h-4 sm:h-5 cursor-pointer"
            onClick={() => setLogin(false)}
          >
            <X />
          </span>
        </div>
        <h1 className="font-semibold text-center text-lg sm:text-xl md:text-2xl tracking-wide">
          {"Recruiter Login"}
        </h1>
        <p className="font-medium text-xs sm:text-sm text-slate-600">
          {"Welcome Back! Please Sign in to continue"}
        </p>
        {signup && (
          <div className="flex items-center gap-2 rounded-full border-1 border-gray-400 px-2 md:px-4 py-2 text-sm md:text-[16px]">
            <span>
              <User className="text-gray-400 h-4 sm:h-5" />
            </span>
            <input
              type="text"
              className="focus:outline-none text-gray-400 placeholder:text-gray-400"
              placeholder="Company Name"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
        )}
        <div className="flex items-center gap-2 rounded-full border-1 border-gray-400 px-2 md:px-4 py-2 text-sm md:text-[16px]">
          <span>
            <Mail className="text-gray-400 h-4 sm:h-5" />
          </span>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            className="focus:outline-none text-gray-400 placeholder:text-gray-400"
            placeholder="Email ID"
            required
          />
        </div>
        <div className="flex items-center gap-2 rounded-full border-1 border-gray-400 px-2 md:px-4 py-2 text-sm md:text-[16px]">
          <span>
            <Lock className="text-gray-400 h-4 sm:h-5" />
          </span>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            className="focus:outline-none text-gray-400 placeholder:text-gray-400"
            placeholder="Password"
            required
          />
        </div>
        {signup && (
          <div className="text-sm md:text-[16px] flex gap-2 items-center rounded-full border-1 border-gray-400 px-2 md:px-4 py-2">
            <label
              htmlFor="logo"
              className="cursor-pointer"
            >
              <span className=" flex gap-2 items-center">
                <p className="text-gray-400">Company Logo</p>{logo?<img src = {URL.createObjectURL(logo)} className="h-4 md:h-6 rounded-full w-4 md:w-6"/>:<Upload className="text-blue-600 h-4 md:h-6"/>}
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              hidden
              id="logo"
              className="focus:outline-none text-gray-400 placeholder:text-gray-400"
              placeholder="Company Name"
              required
              onChange={handleLogo}
            />
          </div>
        )}
        {/* {!signup && (
          <p className="my-4 text-blue-600 cursor-pointer">Forgot Password?</p>
        )} */}
        <div className="flex items-center justify-center">
          {!signup && (
            <button className="rounded-full bg-blue-600 text-white py-2 px-6 cursor-pointer w-full text-sm md:text-[16px]">
              Login
            </button>
          )}
          {signup && (
            <button className="rounded-full bg-blue-600 text-white py-2 px-6 cursor-pointer w-full text-sm md:text-[16px]">
              Create Account
            </button>
          )}
        </div>
        <p className="text-gray-500 text-xs sm:text-sm text-center">
          {!signup ? "Don't have an account ?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => setSignup(!signup)}
          >
            {!signup ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>,
    document.getElementById("root")
  );
}

export default Login;
