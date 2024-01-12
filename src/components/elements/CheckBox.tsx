import React from "react";
import { FaCheck } from "react-icons/fa";

interface CheckBoxProps {
  permission: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckBox: React.FunctionComponent<CheckBoxProps> = (props) => {
  const [access, setAccess] = React.useState(props.permission);

  const handleClick = () => {
    const newAccess = !access;
    setAccess(newAccess);

    // Notify the parent component if an onChange prop is provided
    if (props.onChange) {
      props.onChange(newAccess);
    }
  };

  return (
    <div
      className="h-8 w-12 border-2 border-[#11009E]"
      onClick={handleClick}
    >
      {access ? (
        <FaCheck className="h-full w-full bg-[#C4B0FF] text-white" />
      ) : null}
    </div>
  );
};

export default CheckBox;
