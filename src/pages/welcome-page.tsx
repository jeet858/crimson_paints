import React from "react";
import UserTemplate from "../components/template/UserTemplate";
import { title } from "process";
import { useRouter } from "next/router";
import { InsideNav } from "@/components";
import { useSession } from "next-auth/react";
interface IProps {
  csrfToken?: string;
  children?: JSX.Element | JSX.Element[];
}
const WelcomePage: React.FunctionComponent<IProps> = (props) => {
  const router = useRouter();
  const { userType } = router.query;
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  console.log(isAuth);
  if (isAuth) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
      </UserTemplate>
    );
  } else {
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-[40px] text-[#11009E]">
            You are not logged in click the button below
          </p>
          <button
            className="group relative mt-10 h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
            onClick={async () => {
              await router.push({
                pathname: "/",
              });
            }}
          >
            <div className="absolute inset-0 w-3 bg-[#11009E] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black group-hover:text-white">
              Login
            </span>
          </button>
        </div>
      </UserTemplate>
    );
  }
};

export default WelcomePage;
