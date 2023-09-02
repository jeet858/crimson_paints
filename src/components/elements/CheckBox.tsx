import React from "react";
import { FaCheck } from "react-icons/fa";

interface CheckBoxProps {
  permission: boolean;
}
const CheckBox: React.FunctionComponent<CheckBoxProps> = (props) => {
  const [access, setAccess] = React.useState(props.permission);
  return (
    <div
      className="h-8 w-12 border-2 border-[#11009E]"
      onClick={() => {
        setAccess(!access);
      }}
    >
      {access ? (
        <FaCheck className="h-full w-full bg-[#C4B0FF] text-white" />
      ) : null}
    </div>
  );
};

export default CheckBox;
