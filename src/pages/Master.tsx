import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import React, { useState } from "react";
import { useRouter } from "next/router";
import {UserTemplate, InsideNav} from "@/components";
import { getSession } from 'next-auth/react';

export const getServerSideProps:GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
      props: {
          userInfo: null
      },
  }
}

function Master({ userInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedSection, setSelectedSection] = useState("pending");
  const [rowCount, setRowCount] = useState(0);
  const router = useRouter();
  const { userType } = router.query;
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const handleSectionChange = (section:any) => {
    setSelectedSection(section);
  };

  const generateRows = () => {
    const rows = [];

    for (let i = 0; i < rowCount; i++) {
      rows.push(<div key={i} className="flex bg-purple-50"></div>);
    }

    return rows;
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="ml-11 mt-4">
        <div className="flex space-x-4">
          <div className="mt-4 flex w-56 space-x-4 border-b-2  border-blue-900">
            <div
              className={`cursor-pointer ${
                selectedSection === "pending"
                  ? "rounded border-x-8 border-blue-800  bg-blue-800 text-white"
                  : "text-blue-900"
              }`}
              onClick={() => handleSectionChange("pending")}
            >
              Unit Master
            </div>
            <div
              className={`cursor-pointer ${
                selectedSection === "cancelled"
                  ? "rounded border-x-8 border-blue-800  bg-blue-800 text-white"
                  : "text-blue-900 "
              }`}
              onClick={() => handleSectionChange("cancelled")}
            >
              Complex Types
            </div>
          </div>
        </div>

        <div className="text-xs text-black" style={{ marginLeft: "750px" }}>
          {rowCount} to {28}
        </div>
        <div className="mt-2 flex w-full space-x-4">
          <div className="w-3/4">
            <div className="h-4/5 overflow-x-hidden">
              <div className="flex bg-purple-300">
                <div className="w-16 p-1 text-xs font-semibold">S</div>
                <div className="w-36 p-1 text-center text-xs font-semibold">
                  Qnt/unit
                </div>
                <div className="w-32 p-1 text-center text-xs font-semibold">
                  Packaging
                </div>
                <div className="w-32 p-1 text-center text-xs font-semibold">
                  Short code
                </div>
                <div className="w-32 p-1 text-center text-xs font-semibold">
                  Name
                </div>
              </div>
              <div className="flex bg-purple-50">
                <div className="w-16 p-1  text-xs">1</div>
                <div className="w-36 p-1 text-center text-xs">
                  0.20 kilogram
                </div>
                <div className="w-32 p-1 text-center  text-xs">contaner</div>
                <div className="w-32 p-1 text-center text-xs">2 kg. con.</div>
                <div className="w-32 p-1 text-center text-xs">0.2 kg. con.</div>
              </div>
              <div className="flex bg-purple-50">
                <div className="w-16 p-1  text-xs">1</div>
                <div className="w-36 p-1 text-center text-xs">
                  0.20 kilogram
                </div>
                <div className="w-32 p-1 text-center  text-xs">contaner</div>
                <div className="w-32 p-1 text-center text-xs">2 kg. con.</div>
                <div className="w-32 p-1 text-center text-xs">0.2 kg. con.</div>
              </div>
              <div className="flex bg-purple-50">
                <div className="w-16 p-1  text-xs">1</div>
                <div className="w-36 p-1 text-center text-xs">
                  0.20 kilogram
                </div>
                <div className="w-32 p-1 text-center  text-xs">contaner</div>
                <div className="w-32 p-1 text-center text-xs">2 kg. con.</div>
                <div className="w-32 p-1 text-center text-xs">0.2 kg. con.</div>
              </div>
              {generateRows()}
            </div>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default Master;
