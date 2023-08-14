import React from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;

interface TextFieldProps {
  value?: string;
  register?:any;
  onChange?: (val?: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  type?: 'email' | 'password' | 'text' | 'number';
  textarea?: boolean;
  required?:boolean;
  errors?:any;
  disabled?:boolean | false;
  hidden?:boolean | false;
  maxlength?:any;
  borderClass?:string;
  autoComplete?: string;
  onShowHide?: () => void;
}

const TextInput = ({ register, name, required, errors,hidden, value, onChange, disabled, maxlength, borderClass, autoComplete, textarea = false, ...rest }: TextFieldProps) => {
  const InputElement = textarea ? 'textarea' : 'input';
  const [isShown, setIsSHown] = React.useState(false);
  const toggleIcon = () => {
    const togglePassword = document.querySelector("#togglePassword");
    setIsSHown((isShown) => !isShown);
    (rest.onShowHide)?rest.onShowHide():'';
    if(isShown){
      togglePassword?.classList.add('fa-eye-slash');
      togglePassword?.classList.remove('fa-eye');
    }else{
      togglePassword?.classList.add('fa-eye');
      togglePassword?.classList.remove('fa-eye-slash');
    }
  };
  

  return (
    <>
      <InputElement
        {...register(name, { required: required })}
        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding ${borderClass ? borderClass : ' border border-solid rounded-md'} transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] ${errors ? 'border-red-500' : 'border-gray-300'} ${hidden ? 'hidden' : ''} ${
          textarea ? 'h-32' : ''
        }`}
        onChange={({ target: { value } }: InputChangeEvent) => onChange?.(value)}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete ? autoComplete : "new-password"}
        maxLength={maxlength}
        step={'any'}
        {...rest}
      />
      {rest.onShowHide && <i className={`fas fa-eye-slash cursor-pointer w-8 ${(errors)?'h-10':'h-8'} absolute font-normal top-1/2 transform -translate-y-1/2 right-2 ${(errors)?'mt-0':'mt-2'}`} id="togglePassword" onClick={(e) =>toggleIcon()}></i>}
      {errors && <div className="text-red-500 text-xs italic">{errors.message}</div>}
      
    </>
  );
};

export default TextInput;