import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";

const get = async () => {
  const session = await getSession();
  return session;
};

const ProductPackagingListDelete: React.FunctionComponent = () => {
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
        <div className="flex h-4/6 w-4/6 flex-col rounded-xl bg-[#C4B0FF45]">
          Product Packaging List Delete
          <p className="h-1/6 w-full items-center border-b-2 border-[#11009E] pl-4 pt-2 text-lg font-semibold">
            Basic Unit Details
          </p>
          <div className="flex flex-row h-[10%]">
            <div className="w-2/6 border-2 border-[#11009E] font-semibold text-xl flex justify-center">Package Name</div>
            <div className="w-4/6 border-2 border-[#11009E] font-semibold text-xl flex justify-center">Bag</div>
          </div>
          <div className="flex flex-col w-full h-4/6 border-t-2 border-t-[#11009E]">
            <div className="border-2 border-y-[#11009E] h-1/6 flex justify-center text-[#FF6E65] text-base font-semibold">Orders exist with this packaging type!</div>
            <div className="border-2 border-y-[#11009E] h-1/6 flex flex-row">
              <div className="w-3/12 border-x-2 border-x-[#11009E] flex justify-center pl-4 font-medium text-base">2023-09/0509</div>
              <div className="w-2/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">09-Sep-2023</div>
              <div className="w-4/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">Raichand Brothers</div>
              <div className="w-3/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">Soumen Saha</div>
            </div>
            <div className="border-2 border-y-[#11009E] h-1/6 flex flex-row">
              <div className="w-3/12 border-x-2 border-x-[#11009E] flex justify-center pl-4 font-medium text-base">2023-09/0508</div>
              <div className="w-2/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">02-Sep-2023</div>
              <div className="w-4/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">G M Traders</div>
              <div className="w-3/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">Soumen Saha</div>
            </div>
            <div className="border-2 border-y-[#11009E] h-1/6 flex flex-row">
              <div className="w-3/12 border-x-2 border-x-[#11009E] flex justify-center pl-4 font-medium text-base">2023-08/0506</div>
              <div className="w-2/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">21-Aug-2023</div>
              <div className="w-4/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">M.A. Enterprise</div>
              <div className="w-3/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">Amar Adak</div>
            </div>
            <div className="border-2 border-y-[#11009E] h-1/6 flex flex-row">
              <div className="w-3/12 border-x-2 border-x-[#11009E] flex justify-center pl-4 font-medium text-base">2023-08/0505</div>
              <div className="w-2/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">21-Aug-2023</div>
              <div className="w-4/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">PAUL Hardware</div>
              <div className="w-3/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">Soumen Saha</div>
            </div>
            <div className="border-2 border-y-[#11009E] h-1/6 flex flex-row">
              <div className="w-3/12 border-x-2 border-x-[#11009E] flex justify-center pl-4 font-medium text-base">2023-08/0504</div>
              <div className="w-2/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">18-Aug-2023</div>
              <div className="w-4/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">New Bharat Hardware</div>
              <div className="w-3/12 border-x-2 border-x-[#11009E] flex justify-start pl-4 font-medium text-base">Amar Adak</div>
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
export default ProductPackagingListDelete;