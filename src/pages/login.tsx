import React from "react";
import UserTemplate from "../components/template/UserTemplate";
import { title } from "process";
import { useRouter } from "next/router";
import { InsideNav } from "@/components";
import LoginTemplate from "~/components/template/LoginTemplate";
interface IProps {
  csrfToken?: string;
  children?: JSX.Element | JSX.Element[];
}
const LoginPage: React.FunctionComponent<IProps> = (props) => {
  const router = useRouter();
  const { userType } = router.query;
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  return <LoginTemplate templateParams={templateParams}></LoginTemplate>;
};

export default LoginPage;
