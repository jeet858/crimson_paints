import React, { useState } from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import { UserTemplate, InsideNav } from "@/components";
import { getSession } from "next-auth/react";
import Tablecomponent from "~/components/elements/Tablecomponent";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      userInfo: null,
    },
  };
};

function salesman({
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

  const columns = [
    { header: "Order", field: "order" },
    { header: "Date", field: "date" },
    { header: "Order Location", field: "orderLocation" },
    { header: "Client", field: "client" },
  ];
  const tableData = [
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
    {
      order: 123,
      date: "2023-08-16",
      orderLocation: "Location A",
      client: "Client A",
    },
  ];
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="flex h-5/6 w-full overflow-scroll pl-[10%]">
        <div className="flex w-[72%] flex-col gap-y-4 overflow-hidden">
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
          <Tablecomponent columns={columns} data={tableData} />
        </div>
        <div className="flex h-[92%] w-[16%] flex-col gap-y-4 pt-4">
          <div className="text-3xl font-semibold">Client</div>
          <div className="mt-7 w-4/5 overflow-auto overscroll-contain bg-[#786ADE] text-white">
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
    </UserTemplate>
  );
}

export default salesman;
