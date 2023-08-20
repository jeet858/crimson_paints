import React, { useState } from "react";
import { useRouter } from "next/router";
import { UserTemplate, InsideNav } from "@/components";
import { getSession } from "next-auth/react";
import Unitmastertable from "~/components/elements/Unitmastertable";
import Complextypetable from "~/components/elements/Complextypetable";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      userInfo: null,
    },
  };
};

function Master({
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
  const handleSectionChange = (section) => {
    setSelectedSection(section);
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
        {selectedSection === "pending" ? (
          <Unitmastertable />
        ) : (
          <Complextypetable />
        )}
      </div>
    </UserTemplate>
  );
}

export default Master;
