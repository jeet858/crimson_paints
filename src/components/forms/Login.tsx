import React from "react";

const Login = () => {
  return (
    <form className="grid justify-items-center">
      <div className="mb-4">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter  Email / Phone No"
          required
          className="w-96 rounded-lg border px-3  py-2 hover:shadow-md focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            className="w-96 rounded-lg border px-3  py-2 hover:shadow-md focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500 hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
            >
              <path
                d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z"
                stroke="#999691"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                stroke="#BDBBB9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="text-right text-sm text-gray-500">Forgot Password?</div>
      </div>
    </form>
  );
};

export default Login;
