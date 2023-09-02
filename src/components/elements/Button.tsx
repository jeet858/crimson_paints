import * as React from "react";

interface BtnProps {
  id?: any;
  name?: any;
  title?: any;
  type?: any;
  className?: any;
  widthClass?: any;
  heightClass?: any;
  othersClass?: any;
  children?: any;
  icon?: boolean;
  isDisabled?: boolean;
  actionEvent?: (param1?: any, param2?: any) => void;
}

const Button: React.FunctionComponent<BtnProps> = (props) => {
  let defaultClass = `inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-primary ${props.widthClass} ${props.heightClass} ${props.othersClass}`;
  return (
    <button
      type={props.type ? props.type : "button"}
      className={props.className ? props.className : `${defaultClass}`}
      onClick={props.actionEvent}
      disabled={props.isDisabled ? props.isDisabled : false}
      id={props.id}
      name={props.name}
    >
      {props.icon && props.children ? props.children : ""} {props.title}
    </button>
  );
};

export default Button;
