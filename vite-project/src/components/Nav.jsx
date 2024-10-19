import React from "react";
import logo from "../assets/logo.png";

export default function Nav(props) {
  if (!props.addGroupModalIsOpen) {
    return (
      <div className="flex flex-col col-span-2 bg-teal p-4 items-center">
        <img src={logo} className="w-56 rounded-lg mt-6" />
        <p className="my-10 text-center">
          Start sharing expenses easily with FairShare!
        </p>
        <button
          onClick={() => props.updateNav("groups")}
          className="shadow my-10  bg-beige text-button w-5/6 py-2"
        >
          Groups
        </button>
        <button
          onClick={() => props.updateNav("expenses")}
          className="shadow bg-beige text-button w-5/6 py-2"
        >
          Expenses
        </button>
        <button
          onClick={() => props.updateNav("analytics")}
          className="shadow my-10 bg-beige text-button w-5/6 py-2"
        >
          Analytics
        </button>
      </div>
    );
  }
}
