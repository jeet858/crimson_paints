import * as React from "react";
import { FaUserCircle } from "react-icons/fa";
interface OuterNavProps {
  userName: string;
}
const OuterNav: React.FunctionComponent<OuterNavProps> = (props) => {
  return (
    <div className="flex min-h-[10%] w-full flex-row items-center justify-between rounded-t-3xl bg-navColor px-10">
      <p className="text-2xl font-semibold text-slate-600">
        Hi, {props.userName}
      </p>
      <h1 className="text-center text-4xl font-bold text-[#11009E]">
        Crimson Paints Private Ltd.
      </h1>
      <div className="flex flex-row items-center justify-center gap-x-2">
        <FaUserCircle className="h-12 w-12 cursor-pointer rounded-full text-white" />
        <p className="cursor-pointer text-2xl font-bold text-slate-700">
          {props.userName}
        </p>
      </div>
    </div>
  );
};

export default OuterNav;
