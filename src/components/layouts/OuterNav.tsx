import * as React from "react";
import { FaUserCircle } from "react-icons/fa";
const OuterNav: React.FunctionComponent = () => {
  return (
    <div className="flex h-36 w-full flex-row items-center justify-between rounded-t-3xl bg-navColor px-10">
      <p className="text-2xl font-semibold text-slate-600">Hi, User Name</p>
      <h1 className="text-center text-4xl font-bold text-[#11009E]">
        Crimson Paints Private Ltd.
      </h1>
      <div className="flex flex-row items-center justify-center gap-x-2">
        <FaUserCircle className="h-12 w-12 cursor-pointer rounded-full text-white" />
        <p className="cursor-pointer text-2xl font-bold text-slate-700">
          User Name{" "}
        </p>
      </div>
    </div>
  );
};

export default OuterNav;
