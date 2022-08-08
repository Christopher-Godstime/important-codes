import React, { useState, useEffect } from "react";
import axios from "axios";
import firs from "../assets/firs.png";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import bg2 from "../assets/bg2.png";

function Excel({ logoutUser, setLogoutUser }) {
  const [textValue1, setTextValue1] = useState("");
  const [textValue2, setTextValue2] = useState("");
  const [textValue3, setTextValue3] = useState("");
  const [textValue4, setTextValue4] = useState("");
  const [posts, setPosts] = useState();
  const [active, setActive] = useState();
  const [total, setTotal] = useState();
  const [perPage, setPerPage] = useState();
  const [login, setLogin] = useState("");

  const buttonHandler = async (pageNumber) => {
    var res = await axios.get(
      `https://firs.skoutwatch.com/api/checking?page=${pageNumber}&per_page=10&ACCOUNT_NUMBER=${textValue1}&DATE_FROM=${textValue2}&DATE_TO=${textValue3}&BVN=${textValue4}`
    );
    setPosts(res.data.data);
    setActive(res.data.meta.current_page);
    setPerPage(res.data.meta.per_page);
    setTotal(res.data.meta.total);
  };

  useEffect(() => {
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
    <div>
      <div className="font-poppins">
        <div className="flex justify-between border-b py-5 lg:px-32 px-10">
          <div className="w-24">
            <img src={firs} />
          </div>
          <div className="w-32">
            {!logoutUser && login && login.userLogin ? (
              <Link to="/">
                <button
                  type="submit"
                  className="bg-red-600 text-white text-xs font-light w-full p-3 rounded"
                >
                  Logout
                </button>
              </Link>
            ) : (
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-base p-3 rounded-md w-32"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex md:justify-start justify-center px-10 lg:px-32 md:mt-24 mt-10">
        <div className="mr-2">
          <button className="bg-gray-500 hover:bg-gray-600 text-white text-xs font-base p-3 rounded-md w-32">
            <a
              href={`https://firs.skoutwatch.com/api/export-excel?ACCOUNT_NUMBER=${textValue1}&DATE_FROM=${textValue2}&DATE_TO=${textValue3}&BVN=${textValue4}`}
              target="_blank"
            >
              Export to Excel
            </a>
          </button>
        </div>
        <div className="ml-1">
          <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-base p-3 rounded-md w-32">
            <a
              href={`https://firs.skoutwatch.com/api/export-pdf?ACCOUNT_NUMBER=${textValue1}&DATE_FROM=${textValue2}&DATE_TO=${textValue3}&BVN=${textValue4}`}
              target="_blank"
            >
              Export to PDF
            </a>
          </button>
        </div>
      </div>
      <div className="px-4 font-poppins lg:px-32 sm:mt-10 mt-5 sm:grid grid-cols-2 gap-4 gap-y-8">
        <div>
          <h4 className="mb-2 font-medium">Account Number:</h4>
          <input
            className="w-full border-2 text-sm rounded-[8px] p-[10px]"
            type="number"
            value={textValue1}
            onChange={(e) => setTextValue1(e.target.value)}
            placeholder="Enter Account Number here"
          />
        </div>
        <div>
          <h4 className="mb-2 font-medium mt-4 sm:mt-0">Date From:</h4>
          <input
            className="w-full border-2 text-sm rounded-[8px] p-[10px] mt-2 sm:mt-0"
            type="date"
            value={textValue2}
            onChange={(e) => setTextValue2(e.target.value)}
            placeholder="Enter Date_From here"
          />
        </div>
        <div>
          <h4 className="mb-2 font-medium mt-4 sm:mt-0">Date To:</h4>
          <input
            className="w-full border-2 text-sm rounded-[8px] p-[10px] mt-2 sm:mt-0"
            type="date"
            value={textValue3}
            onChange={(e) => setTextValue3(e.target.value)}
            placeholder="Enter Date_To here"
          />
        </div>
        <div>
          <h4 className="mb-2 font-medium mt-4 sm:mt-0">BVN:</h4>
          <input
            className="w-full border-2 text-sm rounded-[8px] p-[10px] mt-2 sm:mt-0"
            type="number"
            value={textValue4}
            onChange={(e) => setTextValue4(e.target.value)}
            placeholder="Enter BVN here"
          />
        </div>
      </div>
      <div className="flex justify-center mb-16 px-10 font-poppins lg:px-32 mt-10">
        <button
          className="bg-red-600 hover:bg-red-700  p-3 text-xs text-white font-base rounded-md w-52 md:w-96"
          onClick={buttonHandler}
        >
          Search
        </button>
      </div>{" "}
      {!posts === true ? null : (
        <div>
          {posts && posts.length ? (
            posts.map((post, index) => (
              <div
                key={index}
                className="overflow-x-auto mt-6 border-2 border-black rounded-[16px] lg:mx-32 mx-4"
              >
                <table className="w-full ">
                  <tbody className="">
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Account Name</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.ACCOUNT_NAME}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Account Name</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.ACCOUNT_NUMBER}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">TIN</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.TIN}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Transaction Date</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.TRANSACTION_DATE}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Year</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.TRANSACTION_YEAR}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Amount</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.TRANSACTION_AMOUNT}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Description</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.TRANSACTION_DESCRIPTION}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Currency</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.CURRENCY}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Rate</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.CONVERSION_RATE}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Account Type</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.ACCOUNT_TYPE}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Customer Info</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.CUSTOMER_INFO}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Payment Mode</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.PAYMENT_MODE}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Opening Date</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.ACCOUNT_OPENING_DATE}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">RC Number</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.RC_NUMBER}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Sort Code</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.SORT_CODE}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">BVN</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.BVN}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Bank</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.BANK}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Bank Branch</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.BANK_BRANCH}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Email</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.EMAIL}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Phone</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.PHONE}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Address</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.ADDRESS}
                      </td>
                    </div>
                    <div className="odd:bg-white even:bg-red-100 grid md:grid-cols-4 grid-cols-3">
                      <th className="text-left p-[8px]">Amount</th>
                      <td className="p-[8px] col-start-2 col-span-2 md:col-start-2 md:col-end-5">
                        {post.amount}
                      </td>
                    </div>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <div className="">
              <div className="flex justify-center md:mt-4 mt-2 lg:px-32 px-10 ">
                <img src={bg2} />
              </div>
              <div className="px-10 font-poppins lg:px-32 pb-16">
                <div className="flex justify-center text-md font-semibold mt-6 text-center">
                  <h4>Company transaction is not available.</h4>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {!posts === true ? (
        <div>{posts === true ? null : null}</div>
      ) : (
        <div className="flex justify-center text-lg mb-16 ">
          {" "}
          <Pagination
            activePage={active}
            totalItemsCount={total}
            itemsCountPerPage={perPage}
            onChange={buttonHandler}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First"
            lastPageText="Last"
            itemClassFirst="mr-6 text-base font-semibold"
            linkClassLast="ml-6 text-base font-semibold"
            activeClass="text-red-500 border-b-2 border-red-500 "
            innerClass="flex text-black mt-10 gap-4"
            itemClassNext="hidden"
            itemClassPrev="hidden"
            pageRangeDisplayed="6"
          />
        </div>
      )}
    </div>
  );
}

export default Excel;
