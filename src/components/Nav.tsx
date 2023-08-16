import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import "tailwindcss/tailwind.css";

interface NavProps {
  children: ReactNode;
}

const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="flex h-5/6 w-10/12 flex-col rounded bg-white shadow-lg"
        style={{
          borderTopLeftRadius: "2.5rem",
          borderTopRightRadius: "2.5rem",
          borderBottomLeftRadius: "2.5rem",
          borderBottomRightRadius: "2.5rem",
        }}
      >
        <div
          className="flex justify-between bg-purple-300 px-8 py-4"
          style={{
            borderTopLeftRadius: "2.5rem",
            borderTopRightRadius: "2.5rem",
          }}
        >
          <span>Hi, Admin</span>
          <span className="grid justify-items-center">
            <span className="text-xl font-semibold text-indigo-800">
              Crimson Paints Private Ltd.
            </span>
            <span className="text-2xl font-bold text-indigo-900">KOLKATA</span>
          </span>
          <span>Hi, Admin</span>
        </div>

        <div className="flex flex-1">
          <div
            className="w-28 bg-purple-300"
            style={{ borderBottomLeftRadius: "2.5rem" }}
          >
            <div className="flex flex-col space-y-2 ">
              <Sidenav />
            </div>
          </div>
          <div className="flex-1 p-6">
            <Navbar />
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
