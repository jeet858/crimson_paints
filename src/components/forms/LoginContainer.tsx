import React, { useState } from "react";
import Login from './Login';
import SignUpForm from './SignUpForm';
import AddUser from "./AddUser";

export const LoginContainer = () => {

    const [isLogin,setIsLogin] = useState<boolean>(true)

    const handleSubmit =()=>{

//  if(!addUser){
//     if(isLogin){ 
//         //write login functionality
//     }else{
//         //write signup functionality
//     }
    
//  }
//  else{
//       //add user functinoality   
//  }
    }

  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat ">
      <div className="grid w-full max-w-md justify-items-center rounded-lg border-2 bg-white p-6 drop-shadow-2xl">
        <h2 className="text-2xl font-semibold ">{isLogin ? 'Login' : 'Sign up'} </h2>
        <span className="my-6">{`Hey, Enter your details to get ${isLogin ? 'sign in':'Sign Up'} to your account`} </span>
         {isLogin ? <Login /> : <SignUpForm />}
        <button
          type="button"
          className="w-24 rounded-full bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none"
          onClick={handleSubmit}
        >
          {isLogin ? 'Login' : 'Sign up' } 
        </button>
         <br />
        <span>{isLogin ? 'Don’t':'Already'} have an account? <span onClick={()=>setIsLogin(!isLogin)} style={{"cursor":'pointer',"textDecoration":'underline', 'color':'#c49cf4'}}>{isLogin ? 'Sign up':'Log in'}</span> now</span>
      </div>
    </div>
  );
};
