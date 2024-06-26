import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import ClientPartyListTable from "~/components/tables/ClientPartyListTable";
import { api } from "~/utils/api";
const columns = [
  { header: "Name/Alt Name", field: "legal_name" },
  { header: "Phone / Email", field: "phoneoremail" },
  { header: "Address", field: "address" },
];

const ClientPartyList: React.FunctionComponent = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const { data: clients, isLoading, isError } = api.client.all.useQuery();
  if (isError) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Distributors
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
          </div>
        </div>
      </UserTemplate>
    );
  }
  if (isLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Distributors
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
          </div>
        </div>
      </UserTemplate>
    );
  }
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Distributors
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
          <div className="flex items-end justify-end">
            <button
              className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
              onClick={async () => {
                await router.push("add/client-party-list-add");
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <ClientPartyListTable
        columns={columns}
        data={clients}
        idField={["id"]}
        editUrl="/edit/client-party-list-edit"
        deleteUrl="/delete/client-party-list-delete"
      />
    </UserTemplate>
  );
};

export default ClientPartyList;
