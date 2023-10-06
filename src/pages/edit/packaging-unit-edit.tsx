import { UserTemplate } from "@/components";
import React,{useState} from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";

const get = async () => {
  const session = await getSession();
  return session;
};

const BasicUnitsEdit: React.FunctionComponent = () => {
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
  const [confirmed, setConfirmed] = useState(false);

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-4/6 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Package Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Qty
            <input
              className="rounded-md border w-4/6 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Symbol}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Unit
            {/* <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Name}
            /> */}
            <select name="" id="" className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none w-4/6">
              <option value="" className="bg-[#C4B0FF]">Kilogram</option>
              <option value="" className="bg-[#C4B0FF]">Gram</option>
              <option value="" className="bg-[#C4B0FF]">Mililitre</option>
            </select>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Packaging
            {/* <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Name}
            /> */}
            <select name="" id="" className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none w-4/6">
              <option value="" className="bg-[#C4B0FF]">Kilogram</option>
              <option value="" className="bg-[#C4B0FF]">Gram</option>
              <option value="" className="bg-[#C4B0FF]">Mililitre</option>
            </select>
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
            <button className="h-1/2 w-1/4 border border-[#11009E] self-center rounded-md bg-[#C4B0FF] font-semibold ">
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default BasicUnitsEdit;
