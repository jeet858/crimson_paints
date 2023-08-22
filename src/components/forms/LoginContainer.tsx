import React from "react";
import Login from "./Login";
import { useRouter } from "next/router";

export const LoginContainer = () => {
  const handleSubmit = () => {
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
  };

  const router = useRouter();

  const navigate = async () => {
    await router.push({
      pathname: "/welcome-page",
      query: { userType: "admin" },
    });
  };
  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat ">
      <div className="grid w-full max-w-md justify-items-center rounded-lg border-2 bg-white p-6 drop-shadow-2xl">
        <h2 className="font-[sans-serif] text-2xl font-semibold text-[#07096E]">
          Login
        </h2>
        <span className="my-6 font-[open-sans]">
          Hey, Enter your details to get sign in to your account
        </span>
        <Login />
        <button
          type="button"
          className="w-24 rounded-full bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none"
          onClick={navigate}
        >
          Login
        </button>
        <br />
        <span>
          Don’t have an account?{" "}
          <span className="cursor-pointer text-[#786ADE] underline">
            Connect
          </span>{" "}
          With Admin
        </span>
      </div>
    </div>
  );
};
