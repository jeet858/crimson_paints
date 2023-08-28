import * as React from "react";
import { FaPowerOff } from "react-icons/fa";
import { MdKeyboardArrowDown, MdDashboard } from "react-icons/md";

interface SideNavProps {
  userType: string;
}
const SideNav: React.FunctionComponent<SideNavProps> = (props) => {
  return (
    <div
      className={`flex h-full w-1/12 flex-col py-8 ${
        props.userType === "admin" ? "justify-between" : "justify-end"
      } rounded-bl-3xl bg-navColor`}
    >
      {props.userType === "admin" ? (
        <div className="flex h-fit w-full flex-row items-center justify-between px-2">
          <MdDashboard className=" h-10 w-10 cursor-pointer text-white" />
          <p className="cursor-pointer text-lg font-bold text-white">
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
