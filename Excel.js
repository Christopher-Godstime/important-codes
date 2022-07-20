import React, { Component } from "react";
import axios from "axios";
import firs from "../assets/firs.png";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import Select from "react-select";

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue1: "account",
    };
    this.state = {
      textValue2: "date from",
    };
    this.state = {
      textValue3: "date to",
    };
    this.state = {
      textValue4: "bvn",
    };
    this.state = {
      posts: [],
    };
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  buttonHandler(pageNumber) {
    axios
      .get(
        `https://firs.skoutwatch.com/api/checking?page=${pageNumber}&per_page=10&CONVERTION_RATE=${this.state.textValue}&DATE_FROM=${this.state.textValue2}&DATE_TO=${this.state.textValue3}&CURRENCY=${this.state.textValue4}`
      )
      .then((response) => {
        console.log(response);
        this.setState({ posts: response.data.data });
        this.setState({ active: response.data.meta.current_page });
        this.setState({ total: response.data.meta.total });
        this.setState({ perPage: response.data.meta.per_page });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  textHandler = (event) => {
    console.log(event.target.value);
    this.setState({ textValue: event.target.value });
  };

  textHandler2 = (event) => {
    console.log(event.target.value);
    this.setState({ textValue2: event.target.value });
  };

  textHandler3 = (event) => {
    console.log(event.target.value);
    this.setState({ textValue3: event.target.value });
  };

  textHandler4 = (event) => {
    console.log(event.target.value);
    this.setState({ textValue4: event.target.value });
  };

  render() {
    const { posts, active, total, perPage } = this.state;

    return (
      <div>
        <div className="font-poppins">
          <div className="flex justify-between border-b py-5 lg:px-32 px-10">
            <div className="w-24">
              <img src={firs} />
            </div>
          </div>
        </div>

        <div className="flex md:justify-end justify-center px-10 lg:px-32 md:mt-24 mt-10">
          <div className="mr-2">
            <button className="bg-gray-500 text-white text-xs font-light p-3 rounded-md w-32">
              Export to Excel
            </button>
          </div>
          <div className="ml-1">
            <button className="bg-red-600 text-white text-xs font-light p-3 rounded-md w-32">
              Export to PDF
            </button>
          </div>
        </div>

        <div className="px-4 font-poppins lg:px-32 sm:mt-10 mt-5 sm:grid grid-cols-2 gap-4 gap-y-8">
          <div>
            <h4 className="mb-2 font-medium">Account Number:</h4>
            <input
              className="w-full border-2 text-sm rounded-[8px] p-[10px]"
              type="number"
              onChange={this.textHandler}
              value={this.state.textValue}
              placeholder="Enter Account Number here"
            />
          </div>
          <div>
            <h4 className="mb-2 font-medium mt-4 sm:mt-0">Date From:</h4>
            <input
              className="w-full border-2 text-sm rounded-[8px] p-[10px] mt-2 sm:mt-0"
              type="date"
              onChange={this.textHandler2}
              value={this.state.textValue2}
              placeholder="Enter Date_From here"
            />
          </div>
          <div>
            <h4 className="mb-2 font-medium mt-4 sm:mt-0">Date To:</h4>
            <input
              className="w-full border-2 text-sm rounded-[8px] p-[10px] mt-2 sm:mt-0"
              type="date"
              onChange={this.textHandler3}
              value={this.state.textValue3}
              placeholder="Enter Date_To here"
            />
          </div>
          <div>
            <h4 className="mb-2 font-medium mt-4 sm:mt-0">BVN:</h4>
            <input
              className="w-full border-2 text-sm rounded-[8px] p-[10px] mt-2 sm:mt-0"
              type="text"
              onChange={this.textHandler4}
              value={this.state.textValue4}
              placeholder="Enter BVN here"
            />
          </div>
        </div>

        <div className="flex justify-center mb-16 px-10 font-poppins lg:px-32 mt-10">
          <button
            className="bg-red-600 p-3 text-xs text-white font-light rounded-md w-52 md:w-96"
            onClick={this.buttonHandler}
          >
            Search
          </button>
        </div>

        <div className="overflow-x-auto mt-16">
          <table className="border-collapse border-spacing-0 w-full border-2">
            <tr className="">
              <th className="text-left p-[8px]">Transaction type</th>
              <th className="text-left p-[8px]">Transaction Date</th>
              <th className="text-left p-[8px]">Year</th>
              <th className="text-left p-[8px]">Transaction Amount</th>
              <th className="text-left p-[8px]">Currency</th>
              <th className="text-left p-[8px]">Transaction Description</th>
            </tr>

            {posts.length
              ? posts.map((post, index) => (
                  <tr key={index} className="odd:bg-white even:bg-red-50">
                    <td className="text-left p-[8px]">
                      {post.TRANSACTION_TYPE}
                    </td>
                    <td className="text-left p-[8px]">
                      {post.TRANSACTION_DATE}
                    </td>
                    <td className="text-left p-[8px]">
                      {post.TRANSACTION_YEAR}
                    </td>
                    <td className="text-left p-[8px]">
                      {post.TRANSACTION_AMOUNT}
                    </td>
                    <td className="text-left p-[8px]">{post.CURRENCY}</td>
                    <td className="text-left p-[8px]">
                      {post.TRANSACTION_DESCRIPTION}
                    </td>
                  </tr>
                ))
              : null}
          </table>
        </div>
        <div className="flex justify-center text-xl mb-16">
          {" "}
          <Pagination
            activePage={active}
            totalItemsCount={total}
            itemsCountPerPage={perPage}
            onChange={this.buttonHandler.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First"
            lastPageText="Last"
            itemClassFirst="mr-6 text-base font-semibold"
            linkClassLast="ml-6 text-base font-semibold"
            activeClass="text-red-500 border-b-2 border-red-500"
            innerClass="flex text-black mt-10 gap-4"
            itemClassNext="hidden"
            itemClassPrev="hidden"
          />
        </div>
      </div>
    );
  }
}

export default Excel;
