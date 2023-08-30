import React from "react";
import { useRouter } from "next/router";
import LoginTemplate from "../template/LoginTemplate";
import { FaEye } from "react-icons/fa";

const LoginForm = () => {
  const router = useRouter();

  const navigate = async () => {
    await router.push({
      pathname: "/welcome-page",
      query: { userType: "admin" },
    });
  };
  const templateParams = { title: "" };
  return (
    <LoginTemplate templateParams={templateParams}>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <h2 className="font-[sans-serif] text-2xl font-semibold text-[#07096E]">
          Login
        </h2>
        <span className="font-[open-sans]">
          Hey, Enter your details to get sign in to your account
        </span>
        <input
          className="m-1 block w-5/6 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
          placeholder="User-Id"
        />
        <div className="m-1 flex w-5/6 justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-[#23b196] sm:text-sm">
          <input
            className="w-[90%] focus:outline-none"
            placeholder="Password"
          />
          <button type="button" className="">
            <FaEye />
          </button>
        </div>
        <button
          type="button"
          className="w-24 rounded-full bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none"
          onClick={navigate}
        >
          Login
        </button>
        <span>
          Don’t have an account?{" "}
          <span className="cursor-pointer text-[#786ADE] underline">
            Connect
          </span>{" "}
          With Admin
        </span>
      </div>
    </LoginTemplate>
  );
};

export default LoginForm;
