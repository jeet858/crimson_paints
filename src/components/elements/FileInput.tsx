import React from "react";

interface FileFieldProps {
  value?: string;
  register?: any;
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  type?: any;
  required?: boolean;
  errors?: Error;
  accept?: any;
  className?: any;
  handleDealImageFileChange: (param?: any) => void;
}

const FileInput = ({
  register,
  name,
  id,
  required,
  errors,
  className,
  handleDealImageFileChange,
  ...rest
}: FileFieldProps) => {
  return (
    <>
      <input
        {...register(name, { required: required })}
        className={
          className
            ? className
            : `form-control block w-full border border-solid bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 ${
                errors ? "border-red-500" : "border-gray-300"
              }
        m-0 rounded transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none`
        }
        onChange={handleDealImageFileChange}
        id={id ? id : name}
        {...rest}
      />
      {errors && (
        <p className="text-xs italic text-red-500">{errors.message}</p>
      )}
    </>
  );
};

export default FileInput;
