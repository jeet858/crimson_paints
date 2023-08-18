import React from "react";
import UserTemplate from "../components/template/UserTemplate";
import { title } from "process";
import { useRouter } from "next/router";
import InsideNav from "~/components/elements/InsideNav";
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

  return (
    <UserTemplate templateParams={templateParams}>
      <div>
        <InsideNav />
      </div>
    </UserTemplate>
  );
};

export default WelcomePage;
