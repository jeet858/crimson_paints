import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import TableComponentProxyAccess from "~/components/elements/TableComponentProxyAccess";
interface TableRow {
  username: string;
  type: string;
  status: string;
  proxyFor: string[];
}
const Proxyaccess = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const tableData = [
    {
      username: "User 1",
      type: "admin",
      status: "Active",
      proxyFor: ["Aniruddha", "Atanu", "Avijit", "Ghosh", "SS", "Rajdip"],
    },
    {
      username: "User 2",
      type: "GNRL",
      status: "Active",
      proxyFor: ["Guha", "Amar", "Aniruddha", "Atanu", "Ghosh", "Rajdip"],
    },
  ];

  const handleActionButtonClick = (row: TableRow) => {
    console.log("Edit clicked for:", row.username);
  };
  return (
    <div>
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className=" h-full w-full">
          <div className="flex items-center justify-center">
            <div className="text-center text-xl font-semibold text-[#000000]">
              Proxy Access
              <svg
                width="150"
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
          <div className="container mx-auto">
            <TableComponentProxyAccess
              tableData={tableData}
              onActionButtonClick={handleActionButtonClick}
            />
          </div>
        </div>
      </UserTemplate>
    </div>
  );
};

export default Proxyaccess;
