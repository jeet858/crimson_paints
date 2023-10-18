import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import ClientPartyListTable from "~/components/tables/ClientPartyListTable";
const columns = [
  { header: "Name/Alt Name", field: "nameoraltname" },
  { header: "Phone / Email", field: "phoneoremail" },
  { header: "Address", field: "address" },
];
const tableData = [
  {
    id: "1",
    nameoraltname: "ASHIS CHATTERJEE",
    gstid: 12345,
    phone: "0123456789",
    email: "achinta@gmail.com",
    address: ", , , Haora,",
  },
  {
    id: "2",
    nameoraltname: "ASHIS CHATTERJEE",
    gstid: 12345,
    phone: "0123456789",
    email: "achinta@gmail.com",
    address: ", , , Haora,",
  },
];
const subTableData = [
  {
    id: "1",
    nameoraltname: "Advanse Hardware",
    gstid: 12345,
    phone: "0123456789",
    email: "achinta@gmail.com",
    address: "Baragachia, , , ,",
  },
  {
    id: "1",
    nameoraltname: "Bina Hardware",
    gstid: 12345,
    phone: "0123456789",
    email: "achinta@gmail.com",
    address: "Sankarial, Howrah, West Bengal, , , ,",
  },
  {
    id: "1",
    nameoraltname: "Chattarjee Builders",
    gstid: 12345,
    phone: "0123456789",
    email: "achinta@gmail.com",
    address: "Kuldanga Bazar, Howrah, West Bengal, , , ,",
  },
  {
    id: "1",
    nameoraltname: "Dhara Hardware (ANDUL)",
    gstid: 12345,
    phone: "0123456789",
    email: "achinta@gmail.com",
    address: "Andul, Howrah, , , ,Howrah,",
  },
  {
    id: "2",
    nameoraltname: "Advanse Hardware",
    gstid: 12345,
    phone: "0123456789",
    email: "achinta@gmail.com",
    address: "Baragachia, , , ,",
  },
  {
    id: "2",
    nameoraltname: "Bina Hardware",
    gstid: 12345,
    phone: "0123456789",
    email: "achinta@gmail.com",
    address: "Sankarial, Howrah, West Bengal, , , ,",
  },
  {
    id: "2",
    nameoraltname: "Chattarjee Builders",
    gstid: 12345,
    phone: "0123456789",
    email: "achinta@gmail.com",
    address: "Kuldanga Bazar, Howrah, West Bengal, , , ,",
  },
  {
    id: "2",
    nameoraltname: "Dhara Hardware (ANDUL)",
    gstid: 12345,
    phone: "0123456789",
    email: "achinta@gmail.com",
    address: "Andul, Howrah, , , ,Howrah,",
  },
];

const ClientPartyList = () => {
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
                await router.push("add/product-categories-add");
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <ClientPartyListTable
        columns={columns}
        data={tableData}
        idField={["id"]}
        editUrl=""
        deleteUrl=""
        subTableData={subTableData}
      />
    </UserTemplate>
  );
};

export default ClientPartyList;
