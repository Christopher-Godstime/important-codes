import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const accessToken = localStorage.getItem("login");

const authAxios = axios.create({
  baseURL: "https://getwordprime.herokuapp.com/api/v1/user/update",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

function AccountInfo({ logoutUser, setLogoutUser }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [requestError, setRequestError] = useState();
  const [first_name, setFirstName2] = useState();
  const [last_name, setLastName2] = useState();
  const [login, setLogin] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const result = await authAxios.get(
        "http://getwordprime.herokuapp.com/api/v1/user/profile"
      );
      setFirstName(result.data.data.first_name);
      setLastName(result.data.data.last_name);
      setEmail(result.data.data.email);
      console.log(result);
    } catch (err) {
      setRequestError(err.message);
    }
  });

  const update = useCallback(async () => {
    try {
      const result = await axios.post(
        "https://getwordprime.herokuapp.com/api/v1/user/update",
        {
          first_name,
          last_name,
        }
      );
    } catch (err) {
      setRequestError(err.message);
    }
  });

  useEffect(() => {
    fetchData();
    update();
    hydrateStateWithLocalStorage();
  }, [logoutUser]);

  const logout = () => {
    localStorage.removeItem("login");
    setLogoutUser(true);
  };

  const hydrateStateWithLocalStorage = () => {
    if (localStorage.hasOwnProperty("login")) {
      let value = localStorage.getItem("login");
      try {
        value = JSON.parse(value);
        setLogin(value);
      } catch (e) {
        setLogin("");
      }
    }
  };

  return (
    <div className="font-poppins">
      <div className="flex">
        <div className="w-[300px] hidden xl:block pt-[40px] bg-gray-100 h-[924px] pb-[60px]">
          <h4 className="px-[30px] text-base font-semibold pb-[30px]">
            Hi, {firstName}
          </h4>
          <Link to="/accountInfo">
            <h4 className="text-sm px-[30px] font-semibold bg-blue-100 py-[22.5px] text-primary cursor-pointer">
              Account Info
            </h4>
          </Link>
          <Link to="/security">
            <h4 className="text-sm px-[30px] font-normal hover:border-blue-300 hover:border-2 cursor-pointer py-[22.5px]">
              Security
            </h4>
          </Link>
          <Link to="/referrals">
            <h4 className="text-sm px-[30px] font-normal hover:border-blue-300 hover:border-2 cursor-pointer py-[22.5px]">
              Referrals
            </h4>
          </Link>
          <Link to="/history">
            <h4 className="text-sm px-[30px] font-normal hover:border-blue-300 hover:border-2 cursor-pointer py-[22.5px]">
              Transaction History
            </h4>
          </Link>
          <Link to="/apiKey">
            <h4 className="text-sm px-[30px] font-normal hover:border-blue-300 hover:border-2 cursor-pointer py-[22.5px]">
              API Key
            </h4>
          </Link>
        </div>
        <div className="pt-[40px] px-[32px] w-full">
          <div className="xl:grid xl:grid-cols-2">
            <div className="">
              <h4 className="text-xl font-semibold mb-[16px] w-">
                Account Information
              </h4>
              <div className="w-32">
                {!logoutUser && login && login.userLogin ? (
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-base p-3 rounded-md w-32"
                  >
                    Login
                  </button>
                ) : (
                  <Link to="/">
                    <button
                      type="submit"
                      className="bg-red-600 text-white text-xs font-light w-full p-3 rounded"
                    >
                      Logout
                    </button>
                  </Link>
                )}
              </div>
              <hr></hr>
              <h4 className="mt-[25px] text-sm font-medium">
                You can edit your account information here
              </h4>

              <div>
                <h4 className="mt-[42px] text-sm font-medium mb-[8px]">
                  First Name
                </h4>
                <input
                  className="border-2 w-full border-gray-200 rounded-[8px] py-[18px] pl-[32px] placeholder:text-black placeholder:text-sm placeholder:font-medium"
                  type="text"
                  placeholder={firstName}
                  value={first_name}
                  onChange={(e) => setFirstName2(e.target.value)}
                />
              </div>

              <div>
                <h4 className="mt-[24px] text-sm font-medium mb-[8px]">
                  Last Name
                </h4>
                <input
                  className="border-2 w-full border-gray-200 rounded-[8px] py-[18px] pl-[32px] placeholder:text-black placeholder:text-sm placeholder:font-medium"
                  type="text"
                  placeholder={lastName}
                  value={last_name}
                  onChange={(e) => setLastName2(e.target.value)}
                />
              </div>

              <div>
                <h4 className="mt-[24px] text-sm font-medium mb-[8px]">
                  Email
                </h4>
                <input
                  className="border-2 w-full border-gray-200 rounded-[8px] py-[18px] pl-[32px] placeholder:text-black placeholder:text-sm placeholder:font-medium"
                  type="email"
                  placeholder={email}
                  disabled
                />
              </div>
              <div className="flex justify-center xl:justify-end mb-[55px] xl:mb-[0px]">
                <button
                  onClick={() => {
                    update();
                    fetchData();
                  }}
                  className="xl:w-[174px] rounded-[8px] text-white bg-primary text-sm font-normal py-[18px] mt-[40px] xl:mt-[80px] w-[335px] hover:bg-blue-700"
                >
                  Save Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
