import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import LoginTemplate from "../template/LoginTemplate";
import { FaEye } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { api } from "~/utils/api";

const LoginForm = () => {
  const router = useRouter();

  const navigate = async () => {
    await router.push({
      pathname: "/welcome-page",
      query: { userType: "admin" },
    });
  };
  const templateParams = { title: "" };
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
      callbackUrl: "/welcome-page",
    });

    if (res?.ok) {
      navigate();
    }
    if (res?.error) {
      // Authentication error occurred
      alert("Incorrect username or password. Please try again.");
    }
    console.log(res);
  };
  return (
    <LoginTemplate templateParams={templateParams}>
      <form
        className="flex flex-col items-center justify-center gap-y-8"
        onSubmit={handleSubmit}
      >
        <h2 className="font-[sans-serif] text-2xl font-semibold text-[#07096E]">
          Login
        </h2>
        <span className="font-[open-sans]">
          Hey, Enter your details to get sign in to your account
        </span>
        <input
          className="m-1 block w-5/6 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#23b196] focus:outline-none focus:ring-[#23b196] sm:text-sm"
          placeholder="User-Id"
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
        />
        <div className="m-1 flex w-5/6 justify-between rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-[#23b196] sm:text-sm">
          <input
            className="w-[90%] focus:outline-none"
            placeholder="Password"
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
          />
          <button type="button" className="">
            <FaEye />
          </button>
        </div>
        <input
          type="submit"
          className="w-24 rounded-full bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none"
          value="login"
        />
        <span>
          Don’t have an account?{" "}
          <span className="cursor-pointer text-[#786ADE] underline">
            Connect
          </span>{" "}
          With Admin
        </span>
      </form>
    </LoginTemplate>
  );
};

export default LoginForm;
