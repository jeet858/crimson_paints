import React from "react";
import { useRouter } from "next/router";
import UserTemplate from "~/components/template/UserTemplate";
const Useraccess = () => {
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
        <h1> User Access</h1>
      </div>
    </UserTemplate>
  );
};

export default Useraccess;
