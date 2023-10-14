import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const get = async () => {
  const session = await getSession();
  return session;
};

const ClientPartyListDelete: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const editData = {
    Symbol: "Gm",
    Name: "Gram",
  };
  const router = useRouter();
  const { name, symbol } = router.query;

  const del = api.basicUnit.delete.useMutation({
    onError: (err, newTodo, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      router.push("/basic-unit");
    },
  });

  const deleteData = () => {
    del.mutate({ name: name as string });
  };

  const [confirmed, setConfirmed] = useState(false);

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-[85%] w-4/6 flex-col rounded-xl bg-[#C4B0FF45]">
          Client Party List Delete
          <p className="h-1/6 w-full items-center border-b-2 border-[#11009E] pl-4 pt-2 text-lg font-semibold">
            Party Details
          </p>
          <div className="flex h-[10%] flex-row">
            <div className="flex w-2/6 justify-normal border-2 border-[#11009E] pl-4 text-xl font-semibold">
              Name
            </div>
            <div className="flex w-4/6 justify-normal border-2 border-[#11009E] pl-4 text-xl font-semibold">
              ASHIS CHATTERJEE
            </div>
          </div>
          <div className="flex h-[10%] flex-row">
            <div className="flex w-2/6 justify-normal border-2 border-[#11009E] pl-4 text-xl font-semibold">
              Alternate Name
            </div>
            <div className="flex w-4/6 justify-normal border-2 border-[#11009E] pl-4 text-xl font-semibold">
              ASHIS CHATTERJEE
            </div>
          </div>
          <div className="flex h-[10%] flex-row">
            <div className="flex w-2/6 justify-normal border-2 border-[#11009E] pl-4 text-xl font-semibold">
              Type
            </div>
            <div className="flex w-4/6 justify-normal border-2 border-[#11009E] pl-4 text-xl font-semibold">
              Distributor
            </div>
          </div>
          <div className="flex h-[10%] flex-row">
            <div className="flex w-2/6 justify-normal border-2 border-[#11009E] pl-4 text-xl font-semibold">
              Address
            </div>
            <div className="flex w-4/6 justify-normal border-2 border-[#11009E] pl-4 text-xl font-semibold">
              Howrah, West Bengal
            </div>
          </div>
          <div className="flex h-[10%] flex-row">
            <div className="flex w-2/6 justify-normal border-2 border-[#11009E] pl-4 text-xl font-semibold">
              Phone/Email
            </div>
            <div className="flex w-4/6 justify-normal border-2 border-[#11009E] pl-4 text-xl font-semibold"></div>
          </div>
          <div className="flex h-4/6 w-full flex-col border-t-2 border-t-[#11009E]">
            <div className="flex  h-1/6 justify-center border-2 text-base font-semibold text-[#FF6E65]">
              Orders exist for this Client!
            </div>
            <div className="flex h-1/6 flex-row border-2 border-y-[#11009E]">
              <div className="flex w-1/6 justify-center border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                2023-09/0509
              </div>
              <div className="flex w-1/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                09-Sep-2023
              </div>
              <div className="flex w-2/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                Raichand Brothers
              </div>
              <div className="flex w-2/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                Soumen Saha
              </div>
            </div>
            <div className="flex h-1/6 flex-row border-2 border-y-[#11009E]">
              <div className="flex w-1/6 justify-center border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                2023-09/0509
              </div>
              <div className="flex w-1/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                09-Sep-2023
              </div>
              <div className="flex w-2/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                Raichand Brothers
              </div>
              <div className="flex w-2/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                Soumen Saha
              </div>
            </div>
            <div className="flex h-1/6 flex-row border-2 border-y-[#11009E]">
              <div className="flex w-1/6 justify-center border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                2023-09/0509
              </div>
              <div className="flex w-1/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                09-Sep-2023
              </div>
              <div className="flex w-2/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                Raichand Brothers
              </div>
              <div className="flex w-2/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                Soumen Saha
              </div>
            </div>
            <div className="flex h-1/6 flex-row border-2 border-y-[#11009E]">
              <div className="flex w-1/6 justify-center border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                2023-09/0509
              </div>
              <div className="flex w-1/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                09-Sep-2023
              </div>
              <div className="flex w-2/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                Raichand Brothers
              </div>
              <div className="flex w-2/6 justify-start border-x-2 border-x-[#11009E] pl-4 text-base font-medium">
                Soumen Saha
              </div>
            </div>
          </div>
          <div className="flex h-1/4 w-full justify-between self-end px-4">
            <div className="flex h-fit items-center justify-center">
              <div
                className="mr-2 flex h-4 w-4 items-center border-2 border-[#11009E] bg-[#C4B0FF45]"
                onClick={() => {
                  setConfirmed(!confirmed);
                }}
              >
                {confirmed ? <FaCheck className="h-4 w-4" /> : null}
              </div>
              <p>I confirm the deletion</p>
            </div>
            <button className="h-1/2 w-[25%] self-center rounded-md bg-[#07096E] font-semibold text-white">
              Cancel
            </button>
            <button className="h-1/2 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};
export default ClientPartyListDelete;
