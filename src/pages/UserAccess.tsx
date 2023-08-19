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
      <div className="mt-6">
        <h1 className="text-center "> User Right Management</h1>

        <div className="mt-1" style={{ marginLeft: "45rem" }}>
          {" "}
          <svg
            width="150px"
            height="16"
            viewBox="0 0 248 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 8C3.86258e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 -3.86258e-07 8 0C3.58172 3.86258e-07 -3.86258e-07 3.58172 0 8ZM232 7.99998C232 12.4183 235.582 16 240 16C244.418 16 248 12.4183 248 7.99998C248 3.5817 244.418 -2.06683e-05 240 -2.02821e-05C235.582 -1.98958e-05 232 3.5817 232 7.99998ZM8 9.5L240 9.49998L240 6.49998L8 6.5L8 9.5Z"
              fill="#C4B0FF"
            />
          </svg>
        </div>
      </div>
    </UserTemplate>
  );
};

export default Useraccess;
