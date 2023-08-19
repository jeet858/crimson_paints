import React, { useState } from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import { UserTemplate, InsideNav } from "@/components";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      userInfo: null,
    },
  };
};

function Salesman({
  userInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedSection, setSelectedSection] = useState("pending");
  const router = useRouter();
  const { userType } = router.query;
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const handleSectionChange = (section: any) => {
    setSelectedSection(section);
  };
  const clientNames = [
    "Client A",
    "Client B",
    "Client C",
    "Client A",
    "Client B",
    "Client C",
    "Client A",
    "Client B",
    "Client C",
    "Client A",
    "Client B",
    "Client C",
  ];

  return (
    <UserTemplate templateParams={templateParams}>
      <div>
        <InsideNav />
      </div>
      <div className="ml-11">
        <div className="max-w-7xl  p-4">
          <h1
            className="max-w-2xl space-x-4 border-b-2 border-blue-900 p-1 text-xl font-medium"
            style={{ color: "rgba(17, 0, 158, 1)" }}
          >
            By Salesman
          </h1>
          <div className="flex space-x-4">
            <div className="mt-4 flex max-w-xs space-x-4 border-b-2 border-blue-900 text-xl">
              <div
                className={`cursor-pointer ${
                  selectedSection === "pending"
                    ? "rounded border-x-8 border-y-8 border-blue-800 bg-blue-800 text-white"
                    : "text-blue-900"
                }`}
                onClick={() => handleSectionChange("pending")}
              >
                Pending
              </div>
              <div
                className={`cursor-pointer ${
                  selectedSection === "cancelled"
                    ? "rounded border-x-8 border-y-8 border-blue-800 bg-blue-800 text-white"
                    : "text-blue-900"
                }`}
                onClick={() => handleSectionChange("cancelled")}
              >
                Cancelled
              </div>
              <div
                className={`cursor-pointer ${
                  selectedSection === "execution"
                    ? "rounded border-x-8 border-y-8 border-blue-800 bg-blue-800 text-white"
                    : "text-blue-900"
                }`}
                onClick={() => handleSectionChange("execution")}
              >
                Execution
              </div>
            </div>
            <div className="" style={{ width: "558px" }}></div>
            <h3
              className=" pt-8 text-2xl font-medium"
              style={{ color: "rgba(0, 0, 0, 1)" }}
            >
              Client Name
            </h3>
          </div>

          <div className="mt-2 flex w-full space-x-4">
            <div className="w-3/4">
              <div className="h-3/6 overflow-x-hidden">
                <div className="flex bg-purple-300">
                  <div className="w-24 p-2 text-xs font-semibold">Order</div>
                  <div className="w-24 p-2 text-center text-xs font-semibold">
                    Date
                  </div>
                  <div className="w-28 p-2 text-center text-xs font-semibold">
                    Order Location
                  </div>
                  <div className="w-24 p-2 text-center text-xs font-semibold">
                    Client
                  </div>
                </div>

                <div className="flex bg-purple-200">
                  <div className="w-24 p-2 text-xs font-semibold">123</div>
                  <div className="w-24 p-2 text-center text-xs font-semibold">
                    2023-08-16
                  </div>
                  <div className="w-28 p-2 text-center text-xs font-semibold">
                    Location A
                  </div>
                  <div className="w-24 p-2 text-center text-xs font-semibold">
                    Client A
                  </div>
                </div>

                <div className="flex bg-purple-100">
                  <div className="w-24 p-2 text-xs font-semibold">Notes:</div>
                </div>
                <div className="flex bg-purple-100">
                  <div className="w-24 p-2  text-xs">123</div>
                  <div className="w-24 p-2 text-center  text-xs">
                    2023-08-16
                  </div>
                  <div className="w-28 p-2 text-center text-xs">Location A</div>
                  <div className="w-24 p-2 text-center text-xs">Client A</div>
                </div>
                <div className="flex bg-purple-100">
                  <div className="w-24 p-2  text-xs">123</div>
                  <div className="w-24 p-2 text-center text-xs">2023-08-16</div>
                  <div className="w-28 p-2 text-center text-xs">Location A</div>
                  <div className="w-24 p-2 text-center text-xs">Client A</div>
                </div>
                <div className="flex bg-purple-100">
                  <div className="w-24 p-2  text-xs">123</div>
                  <div className="w-24 p-2 text-center text-xs">2023-08-16</div>
                  <div className="w-28 p-2 text-center text-xs">Location A</div>
                  <div className="w-24 p-2 text-center text-xs">Client A</div>
                </div>
                <div className="flex bg-purple-100">
                  <div className="w-24 p-2  text-xs">123</div>
                  <div className="w-24 p-2 text-center text-xs">2023-08-16</div>
                  <div className="w-28 p-2 text-center text-xs">Location A</div>
                  <div className="w-24 p-2 text-center text-xs">Client A</div>
                </div>
                <div className="flex bg-purple-100">
                  <div className="w-24 p-2  text-xs">123</div>
                  <div className="w-24 p-2 text-center text-xs">2023-08-16</div>
                  <div className="w-28 p-2 text-center text-xs">Location A</div>
                  <div className="w-24 p-2 text-center text-xs">Client A</div>
                </div>
                <div className="flex bg-purple-100">
                  <div className="w-24 p-2  text-xs">123</div>
                  <div className="w-24 p-2 text-center text-xs">2023-08-16</div>
                  <div className="w-28 p-2 text-center text-xs">Location A</div>
                  <div className="w-24 p-2 text-center text-xs">Client A</div>
                </div>
              </div>
            </div>

            <div className="top-lg">
              <div
                className="h-3/6  w-36 overflow-auto overscroll-contain "
                style={{
                  backgroundColor: "rgba(120, 106, 222, 1)",
                  color: "rgba(255, 255, 255, 1)",
                }}
              >
                {clientNames.map((clientName, index) => (
                  <div
                    key={index}
                    className=" cursor-pointer overflow-auto overscroll-contain border-b p-2 hover:bg-violet-300 hover:text-lg hover:font-normal hover:text-blue-800"
                  >
                    {clientName}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
}

export default Salesman;
