import React, { useState, useEffect } from "react";
import background from "../assets/background.png";
import firs from "../assets/firs.png";
import { Link } from "react-router-dom";

function Login(props) {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });

  let [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  let [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    console.log(email, password);
  });

  useEffect(() => {
    if (email.indexOf("@") > 0) {
      //   console.log("valid");
    } else {
      //   console.log("invalid");
    }
  }, [email]);

  useEffect(() => {
    document.title = "Login - firs";
  }, []);

  useEffect(() => {
    return () => {
      console.log("Component Unmount");
    };
  }, []);

  let validate = () => {
    let errorsData = {};

    errorsData.email = [];

    if (!email) {
      errorsData.email.push("Email can't be blank");
    }

    let validEmailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (email) {
      if (!validEmailRegex.test(email)) {
        errorsData.email.push("Proper email address is expected");
      }
    }

    errorsData.password = [];

    if (!password) {
      errorsData.password.push("password can't be blank");
    }

    let validPasswordRegex = /[a-z]/;
    if (password) {
      if (!validPasswordRegex.test(password)) {
        errorsData.password.push(
          "Password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit"
        );
      }
    }

    setErrors(errorsData);
  };

  useEffect(validate, [email, password]);

  let onLoginClick = async () => {
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);

    validate();

    if (isValid()) {
      let response = await fetch(
        `https://tonote-api.herokuapp.com/api/v1/user/login?email=${email}&password=${password}`,
        { method: "GET" }
      );
      if (response.ok) {
        let responseBody = await response.json();
        if (responseBody.length > 0) {
          props.history.replace("/excel");
        } else {
          setLoginMessage(
            <span className="text-red-500">
              Invalid Login, please try again
            </span>
          );
        }
      } else {
        setLoginMessage(
          <span className="text-red-500">Unable to connect to server</span>
        );
      }
    }
  };

  let isValid = () => {
    let valid = true;

    for (let control in errors) {
      if (errors[control].length > 0) valid = false;
    }

    return valid;
  };

  return (
    <div>
      <div className="px-10 font-poppins pt-4 md:pb-20 pb-4 lg:px-32 md:flex justify-between items-center">
        <div className="md:w-1/2 flex justify-center items-center">
          <div>
            <img src={background} />
          </div>
          <div className="absolute md:w-1/2 w-4/5">
            <img src={firs} />
          </div>
        </div>
        <div className="md:w-1/2 lg:mx-16 xl:mx-32 md:mx-8 mt-6 md:mt-0 mb-10 md:mb-0">
          <div>
            <h4 className="text-2xl font-semibold">Welcome Back</h4>
            <h4 className="text-xs font-medium mt-6 mb-16">
              Kindly provide the following information to login
            </h4>
          </div>
          <div className="mt-6">
            <h4 className="text-sm font-medium">Email address / Username:</h4>
            <input
              className="border-gray-300 border-2 text-xs  placeholder-gray-300 p-3 rounded-md flex mx-auto w-full mt-1 pl-6 text-black"
              name="email"
              type="text"
              placeholder="Enter email / Username here"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              onBlur={() => {
                setDirty({ ...dirty, email: true });
                validate();
              }}
            />
            <div className="text-red-500">
              {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
            </div>
          </div>
          <div className="mt-8 ">
            <h4 className="text-sm font-medium">Password:</h4>
            <input
              className="border-gray-300 border-2 text-xs text-black placeholder-gray-300 p-3 rounded-md flex mx-auto w-full mt-1 pl-6"
              name="password"
              type="password"
              placeholder="Enter your password here"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onBlur={() => {
                setDirty({ ...dirty, password: true });
                validate();
              }}
            />
            <div className="text-red-500">
              {dirty["password"] && errors["password"][0]
                ? errors["password"]
                : ""}
            </div>
          </div>

          <div className="mt-12">
            <div className="m-2">{loginMessage}</div>
            <button
              className="bg-red-600 text-white text-xs font-light w-full p-3 rounded"
              onClick={onLoginClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
