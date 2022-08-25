import React, { useState, useEffect } from "react";
import background from "../assets/background.png";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  let history = useHistory();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("https://getwordprime.herokuapp.com/api/v1/user/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        console.log("response", response);
        localStorage.setItem("login", response.data.token);
        setError("");
        setEmail("");
        setPassword("");

        history.push("/dashboard");
      })
      .catch((error) => setError(error.response.data.errors));
  };

  return (
    <div className="lg:flex lg:items-center">
      <div className="hidden lg:flex lg:w-1/2">
        <img src={background} />
      </div>
      <div className="font-poppins px-4 lg:px-10 lg:w-1/2 sm:w-3/4 mx-auto my-[88px] lg:my-0">
        <div>
          <h4 className="flex justify-center text-3xl font-semibold mb-[16px]">
            Welcome back
          </h4>
          <h4 className="flex justify-center text-xs font-medium text-gray-400">
            Please sign in to your account
          </h4>
        </div>

        <form onSubmit={login} className="mt-[24px]">
          {error && <p className="text-red-500 mb-[15px]">{error.root}</p>}
          <div className="lg:w-3/4 mx-auto">
            <div>
              {error && <p className="text-red-500">{error.email}</p>}
              <div className="flex justify-center">
                <input
                  className="placeholder-gray-400 py-[18px] rounded-[8px] border-[0.5px] text-xs text-black pl-[32px] w-full "
                  autoComplete="on"
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Enter email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-[24px]">
              {error && <p className="text-red-500">{error.password}</p>}
              <div className="flex justify-center relative">
                <input
                  className="placeholder-gray-400 py-[18px] rounded-[8px] border-[0.5px] text-xs text-black pl-[32px] w-full "
                  autoComplete="on"
                  name="password"
                  type={open === false ? "password" : "text"}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute right-[25px] top-[15px] text-2xl">
                  {open === false ? (
                    <AiFillEye onClick={toggle} />
                  ) : (
                    <AiFillEyeInvisible onClick={toggle} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:w-3/4 mx-auto mt-[8px]">
            <h4 className="text-xs font-medium text-gray-400">
              Forgot your password?
            </h4>
            <h4 className="text-xs font-medium text-primary border-b-[1px] ml-1 border-primary">
              Click here
            </h4>
          </div>

          <div className="lg:w-3/4 mx-auto mt-[64px]">
            <button
              type="submit"
              className="text-white text-xs font-medium bg-primary w-full py-[18px] rounded-[8px] hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-[64px]">
          <h4 className="text-sm font-medium text-gray-400">New here?</h4>
          <h4 className="text-sm font-medium text-primary  ml-1 ">
            <Link to="/create">Create an account</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
