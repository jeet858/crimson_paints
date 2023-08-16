import React from "react";
import UserTemplate from "../components/template/UserTemplate";
import { title } from "process";
interface IProps {
  csrfToken?: string;
  children?: JSX.Element | JSX.Element[];
}

const WelcomePage: React.FunctionComponent<IProps> = (props) => {
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <p>Insert Your Content Here</p>
    </UserTemplate>
  );
};

export default WelcomePage;
