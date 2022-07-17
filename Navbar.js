import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import burger from "../assets/burger.png";
import cancel from "../assets/cancel.png";
import dashboard from "../assets/dashboard.png";
import newc from "../assets/newc.png";
import all from "../assets/all.png";
import tutorial from "../assets/tutorial.png";
import balance from "../assets/balance.png";
import plans from "../assets/plans.png";
import profile from "../assets/profile.png";
import notification from "../assets/notification.png";
import { Link } from "react-router-dom";
import down from "../assets/down.png";

function Navbar() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const Menus = [
    {
      name: "Dashboard",
      icon: dashboard,
      width: "w-[80px]",
      link: "/Dashboard",
    },
    {
      name: "New Copy",
      icon: newc,
      width: "w-[70px]",
      link: "/NewCopy",
    },
    {
      name: "All Copy",
      icon: all,
      width: "w-[58px]",
      link: "/AllCopy",
    },
    {
      name: "Tutorials",
      icon: tutorial,
      width: "w-[62px]",
      link: "/Tutorial",
    },
    {
      name: "Word Balance",
      icon: balance,
      width: "w-[100px]",
      link: "/WordBalance",
    },
    {
      name: "Get Plans",
      icon: plans,
      width: "w-[64px]",
      link: "/GetPlan",
    },
  ];

  const [active, setActive] = useState(localStorage.getItem(0));

  useEffect(() => {
    localStorage.setItem("active", active);
  }, [active]);

  return (
    <div className="">
      <div className="bg-primary hidden xl:flex justify-between items-center font-poppins px-4 lg:px-10 py-[20px]">
        <div>
          <img className="w-[163px]" src={logo} />
        </div>

        <div className="flex">
          {Menus.map((menu, i) => (
            <Link to={menu.link}>
              <div key={i}>
                <div onClick={() => setActive(i)} className="mx-[20px] ">
                  <div className="mx-auto flex justify-center">
                    <img
                      className={`w-[20px] cursor-pointer ${
                        i === active && "w-[25px]"
                      }`}
                      src={menu.icon}
                    />
                  </div>
                  <h4
                    className={`text-sm text-secondary font-light mt-[6px] cursor-pointer ${
                      i === active && "text-white font-md font-semibold"
                    }`}
                  >
                    {menu.name}
                  </h4>
                  <div
                    className={`-mb-[20px] mt-[20px] h-[4px] flex justify-center mx-auto rounded bg-white duration-500 ${
                      active === i ? [Menus[active].width] : "opacity-0  "
                    }-translate-y-8 duration-1000`}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex">
          <Link to="/AccountInfo">
            <div className="mx-[20px]">
              <img className="cursor-pointer" src={profile} />
            </div>
          </Link>
          <div className="mx-[20px]">
            <img className="cursor-pointer" src={notification} />
          </div>
        </div>
      </div>
      <div className="xl:hidden ">
        <div className="bg-primary flex justify-between font-poppins px-4 lg:px-10 py-[25px]">
          <div className="">
            <img src={logo} />
          </div>
          <div>
            <img onClick={() => setShow(!show)} src={burger} />
          </div>
        </div>
        {show ? <></> : null}
        <div
          className={`top-0 left-0 absolute bg-primary w-full px-4 lg:px-10 z-40 ${
            show ? "translate-x-0" : "-translate-x-full "
          } ease-in-out duration-700`}
        >
          <div className=" flex justify-between font-poppins py-[25px]">
            <div>
              <img src={logo} />
            </div>
            <div>
              <img onClick={() => setShow(!show)} src={cancel} />
            </div>
          </div>
          <div>
            <h4
              onClick={() => setShow(!show)}
              className="text-md font-light text-white mt-[23px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px]"
            >
              <Link to="/dashboard">Dashboard</Link>
            </h4>
            <h4
              onClick={() => setShow(!show)}
              className="text-md font-light text-white mt-[32px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px]"
            >
              <Link to="/newCopy">New Copy</Link>
            </h4>
            <h4
              onClick={() => setShow(!show)}
              className="text-md font-light text-white mt-[32px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px]"
            >
              <Link to="/allCopy">All Copy</Link>
            </h4>
            <h4
              onClick={() => setShow(!show)}
              className="text-md font-light text-white mt-[32px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px]"
            >
              <Link to="/tutorial">Tutorial</Link>
            </h4>
            <h4
              onClick={() => setShow(!show)}
              className="text-md font-light text-white mt-[32px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[120px]"
            >
              <Link to="/wordBalance">Word Balance</Link>
            </h4>
            <h4
              onClick={() => setShow(!show)}
              className="text-md font-light text-white mt-[32px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px]"
            >
              <Link to="/getPlan">Get Plans</Link>
            </h4>
            <h4
              onClick={() => setShow(!show)}
              className="text-md font-light text-white mt-[32px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px]"
            >
              Notification
            </h4>

            <div className="flex justify-between items-center">
              <div className="w-[100px]">
                <h4
                  onClick={() => setShow2(!show2)}
                  className={` text-md font-light text-white mt-[32px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px] mb-[20px] ${
                    show2 ? "font-semibold" : "font-light"
                  }`}
                >
                  Profile
                </h4>
              </div>
              <div
                className={`text-sm duration-700  ${
                  show2 ? "rotate-180" : "rotate-0"
                } `}
              >
                <img
                  onClick={() => setShow2(!show2)}
                  className="w-[20px]"
                  src={down}
                />
              </div>
            </div>
            {show2 ? <></> : null}
            <div
              className={`${
                show2
                  ? " translate-x-0 "
                  : "-translate-x-full hidden duration-700"
              } ease-in-out duration-700`}
            >
              <div>
                <h4
                  onClick={() => setShow(!show)}
                  className="text-md font-light text-white  ml-[22px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px]"
                >
                  <Link to="/accountInfo">Account Info</Link>
                </h4>
                <h4
                  onClick={() => setShow(!show)}
                  className="text-md font-light text-white mt-[24px] ml-[22px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px]"
                >
                  <Link to="/security">Security</Link>
                </h4>
                <h4
                  onClick={() => setShow(!show)}
                  className="text-md font-light text-white mt-[24px] ml-[22px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px]"
                >
                  <Link to="/referrals">Referrals</Link>
                </h4>
                <h4
                  onClick={() => setShow(!show)}
                  className="text-md font-light text-white mt-[24px] ml-[22px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[200px]"
                >
                  <Link to="/history">Transaction History</Link>
                </h4>
                <h4
                  onClick={() => setShow(!show)}
                  className="text-md font-light text-white mt-[24px] ml-[22px] cursor-pointer hover:font-semibold hover:duration-300 hover:ease-in-out w-[100px] mb-[127px]"
                >
                  <Link to="/apiKey">API Key</Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
