import React from "react";

interface IProps {
  value?: string;
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  onChange?: (param: any) => void;
  className?: string;
  customWidthClass?: string;
  required?: boolean;
  pattern?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  children?: never;
  autoComplete?: string;
}

const InputField: React.FunctionComponent<IProps> = (props) => {
  const customClass = props.className
    ? props.className
    : `mt-1 block rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm`;
  const type = props.type ? props.type : "text";

  return (
    <div className="form-group">
      {props.label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {props.label}
        </label>
      )}
      <input
        type={type}
        value={props.value}
        name={props.name}
        id={props.id}
        pattern={props.pattern}
        className={customClass + " " + props.customWidthClass}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        onChange={props.onChange}
        required={props.required}
        ref={props.inputRef}
      />
    </div>
  );
};

export default InputField;
