import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface IProps {
  csrfToken?: string;
  children?: never[];
}

const SignUpForm: React.FunctionComponent<IProps> = (props) => {
  const router = useRouter();

  const navigate = async () => {
    return await router.push({
      pathname: "/WelcomePage",
      query: { userType: "admin" },
    });
  };
  return (
      <div className="w-full">
        <form>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full rounded rounded-lg border px-3 py-2 transition duration-300 hover:shadow-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full rounded rounded-lg border px-3 py-2 transition duration-300 hover:shadow-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              required
              className="w-full rounded rounded-lg border px-3 py-2 transition duration-300 hover:shadow-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full rounded rounded-lg border px-3 py-2 transition duration-300 hover:shadow-lg focus:border-blue-500 focus:outline-none"
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
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="password"
                id="reenter-password"
                name="reenter-password"
                placeholder="Re-enter your password"
                required
                className="w-full rounded rounded-lg border px-3 py-2 transition duration-300 hover:shadow-lg focus:border-blue-500 focus:outline-none"
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
          </div>
          <div className="grid justify-items-center">
            <div className="my-6">
              <input type="checkbox" id="agreed" name="agreed" value="agreed" />
              <label htmlFor="agreed" className="text-xs">
                {" "}
                I read and agree to{" "}
                <span className="font-semibold">Terms & Conditions</span>
              </label>
            </div>
          </div>
        </form>
      </div>
  );
};

export default SignUpForm;
