import { UserTemplate } from "@/components";
import { useSession } from "next-auth/react";
import React from "react";

const NewOrder: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <form className="h-full w-full p-[1%]">
        <div className="flex h-5/6  w-full items-center justify-center overflow-y-scroll rounded-lg bg-[#786ADE]">
          <div className="flex h-fit w-[90%] flex-col space-y-2 mx-2 ">
            <div className="flex h-2/6 w-2/3 flex-col">
              <div className="flex flex-row space-x-2">
                <div className="flex h-1/6 w-1/2 flex-col space-y-2 font-semibold">
                  <div className="font-semibold text-white">Order No:</div>
                  <select
                    className="h-8 rounded-md bg-[#C4B0FF]"
                    name=""
                    id=""
                  ></select>
                </div>
                <div className="flex h-1/6 w-1/2 flex-col space-y-2 font-semibold">
                  <div className="font-semibold text-white">Order Date:</div>
                  <select
                    className="h-8 rounded-md bg-[#C4B0FF]"
                    name=""
                    id=""
                  ></select>
                </div>
              </div>
              <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Party:</div>
                <select
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  name=""
                  id=""
                ></select>
              </div>
            </div>
            <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
              <div className="font-semibold text-white">Brand:</div>
              <select
                className="h-8 rounded-md bg-[#C4B0FF]"
                name=""
                id=""
              ></select>
            </div>
            <div className=" flex h-1/6 w-full flex-col space-y-2 font-semibold">
              <div className="font-semibold text-white">Packaging:</div>
              <select
                className="h-8 rounded-md bg-[#C4B0FF]"
                name=""
                id=""
              ></select>
            </div>
            <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
              <div className="font-semibold text-white">Qty:</div>
              <input type="text" className="h-8 rounded-md bg-[#C4B0FF]" />
            </div>
            <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
              <div className="font-semibold text-white">Notes:</div>
              <select
                className="h-8 rounded-md bg-[#C4B0FF]"
                name=""
                id=""
              ></select>
            </div>
          </div>
        </div>
        <div className="w-full h-14 items-center flex justify-end">
          <button className="w-24 h-7 text-white rounded-md bg-[#786ADE]">Submit</button>
        </div>
      </form>
    </UserTemplate>
  );
};

export default NewOrder;
