import React from "react";
import UserTemplate from "../components/template/UserTemplate";
import { title } from "process";
import { useRouter } from "next/router";
interface IProps {
  csrfToken?: string;
  children?: JSX.Element | JSX.Element[];
}
const WelcomePage: React.FunctionComponent<IProps> = (props) => {
  const router = useRouter();
  const { userType } = router.query;
  console.log(userType);
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <p>Insert Your Content Here</p>
    </UserTemplate>
  );
};

export default WelcomePage;
