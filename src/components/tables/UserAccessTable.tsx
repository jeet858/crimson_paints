import * as React from "react";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import CheckBox from "../elements/CheckBox";
interface UserAccessTableProps {
  title: string;
  data: {
    title: string;
    access: boolean;
    edit: boolean;
  }[];
  onClick?: React.MouseEventHandler;
}
const UserAccessTable: React.FunctionComponent<UserAccessTableProps> = (
  props
) => {
  return (
    <div className="flex h-fit w-[90%] flex-col">
      <div className="flex h-fit w-full flex-col overflow-y-auto bg-[#C4B0FF45]">
        <div className="flex h-10 w-full justify-between bg-[#C4B0FF] px-8">
          <p className="self-center text-base font-semibold"> {props.title}</p>
          <div className="flex w-1/5 items-center justify-between">
            <p className="text-base font-semibold">Access</p>
            <FaPencilAlt className="h-6 w-6 text-white" />
          </div>
        </div>
        {props.data.map((e, index) => {
          return (
            <div
              className="flex h-10 w-full justify-between px-8 py-8"
              key={index}
            >
              <p className="self-center text-base font-semibold">{e.title}</p>
              <div className="flex w-1/5 items-center justify-between">
                <CheckBox permission={e.access} key={e.title} />
                <CheckBox permission={e.edit} key={e.title} />
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="mt-8 h-12 w-32 self-end bg-[#786ADE] text-lg font-semibold text-white"
        onClick={props.onClick}
      >
        Save
      </button>
    </div>
  );
};

export default UserAccessTable;
