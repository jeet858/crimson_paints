import React from 'react';

interface FileFieldProps {
  value?: string;
  register?:any;
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  id?:string;
  type?: any;
  required?:boolean;
  errors?:any
  accept?:any
  className?:any
  handleDealImageFileChange: (param?:any) => void;
}

const FileInput = ({ register, name, id, required, errors, className, handleDealImageFileChange, ...rest }: FileFieldProps) => {
  return (
    <>
      <input
        {...register(name, { required: required })}
        className={ (className) ? className : `form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${errors ? 'border-red-500' : 'border-gray-300'}
        rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
        onChange={handleDealImageFileChange}
        id={(id) ? id : name}
        {...rest}
      />
      {errors && <p className="text-red-500 text-xs italic">{errors.message}</p>}
    </>
  );
};

export default FileInput;