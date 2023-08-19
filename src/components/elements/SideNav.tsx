import * as React from "react";
import { FaPowerOff } from "react-icons/fa";
import { MdKeyboardArrowDown, MdDashboard } from "react-icons/md";

interface SideNavProps {
  userType: string;
}
const SideNav: React.FunctionComponent<SideNavProps> = (props) => {
  return (
    <div
      className="flex h-full w-44 flex-col justify-between rounded-bl-3xl"
      style={{ backgroundColor: "rgba(196, 176, 255, 1)" }}
    >
      <div className="h-1/2">
        <span
          className="mb-4 flex h-1/4 w-full cursor-pointer content-center items-center justify-center text-2xl font-bold"
          style={{
            backgroundColor: "rgba(231, 224, 255, 0.47)",
            color: "rgba(120, 120, 120, 1)",
          }}
        >
          Costing <MdKeyboardArrowDown />
        </span>
        <span
          className="mb-4 flex h-1/4 w-full cursor-pointer content-center items-center justify-center text-2xl font-bold"
          style={{
            backgroundColor: "rgba(231, 224, 255, 0.47)",
            color: "rgba(120, 120, 120, 1)",
          }}
        >
          Master <MdKeyboardArrowDown />
        </span>
      </div>
      {props.userType === "admin" ? (
        <div className="mb-20 flex flex-col items-center justify-center">
          <MdDashboard className="h-10 w-10 cursor-pointer text-white" />
          <p className="cursor-pointer text-2xl font-bold text-white">
            Dashboard
          </p>
        </div>
      ) : null}
      <div className="mb-20 flex flex-col items-center justify-center">
        <FaPowerOff className="h-10 w-10 cursor-pointer text-white" />
        <p className="cursor-pointer text-2xl font-bold">Log Out</p>
      </div>
    </div>
  );
};

export default SideNav;
