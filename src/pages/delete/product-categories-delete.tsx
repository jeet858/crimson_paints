import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";

const get = async () => {
  const session = await getSession();
  return session;
};

const ProductCategoriesDelete: React.FunctionComponent = () => {
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
      <div className="flex h-full w-full flex-col items-center justify-center ">
        <div className="flex flex-row">
          <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-2xl text-[#11009E]">
            Basic Units
          </div>
          <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
        </div>
        <div className="flex h-5/6 w-11/12 pt-3 flex-col bg-[#C4B0FF45]">
          <div className="flex w-full h-1/6 justify-around bg-[#C4B0FF]">
            <div className="flex justify-center font-semibold text-2xl items-center">Name</div>
            <div className="flex justify-center font-semibold text-2xl items-center">Code</div>
            <div className="flex justify-center font-semibold text-2xl items-center" >Action</div>
          </div>
          <div className="flex w-full h-1/6 justify-around bg-[#C4B0FF45]]">
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-r-2 border-[#C4B0FF]">Putty</div>
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-x-2 border-[#C4B0FF]">Putty</div>
            <div className="flex justify-around items-center w-1/3 border-l-2 border-[#C4B0FF]" >
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#07096E] font-semibold text-white">
                Edit
              </button>
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white">
                Delete
              </button>
            </div>
          </div>
          <div className="flex w-full h-1/6 justify-around bg-[#C4B0FF45]]">
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-r-2 border-[#C4B0FF]">Cement Paints</div>
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-x-2 border-[#C4B0FF]">Cem. Paint</div>
            <div className="flex justify-around items-center w-1/3 border-l-2 border-[#C4B0FF]" >
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#07096E] font-semibold text-white">
                Edit
              </button>
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white">
                Delete
              </button>
            </div>
          </div>
          <div className="flex w-full h-1/6 justify-around bg-[#C4B0FF45]]">
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-r-2 border-[#C4B0FF]">Water Primer</div>
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-x-2 border-[#C4B0FF]">Wtr.Primer</div>
            <div className="flex justify-around items-center w-1/3 border-l-2 border-[#C4B0FF]" >
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#07096E] font-semibold text-white">
                Edit
              </button>
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white">
                Delete
              </button>
            </div>
          </div>
          <div className="flex w-full h-1/6 justify-around bg-[#C4B0FF45]]">
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-r-2 border-[#C4B0FF]">Tilo Items   </div>
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-x-2 border-[#C4B0FF]">Tilo Items   </div>
            <div className="flex justify-around items-center w-1/3 border-l-2 border-[#C4B0FF]" >
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#07096E] font-semibold text-white">
                Edit
              </button>
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white">
                Delete
              </button>
            </div>
          </div>
          <div className="flex w-full h-1/6 justify-around bg-[#C4B0FF45]]">
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-r-2 border-[#C4B0FF]">Exterior Finish</div>
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-x-2 border-[#C4B0FF]">Exterior  </div>
            <div className="flex justify-around items-center w-1/3 border-l-2 border-[#C4B0FF]" >
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#07096E] font-semibold text-white">
                Edit
              </button>
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white">
                Delete
              </button>
            </div>
          </div>
          <div className="flex w-full h-1/6 justify-around bg-[#C4B0FF45]]">
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-r-2 border-[#C4B0FF]">Interior Finish</div>
            <div className="flex justify-center  items-center w-1/3 font-semibold text-2xl border-x-2 border-[#C4B0FF]">Interior   </div>
            <div className="flex justify-around items-center w-1/3 border-l-2 border-[#C4B0FF]" >
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#07096E] font-semibold text-white">
                Edit
              </button>
              <button className="h-1/2 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white">
                Delete
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </UserTemplate>
  );
};

export default ProductCategoriesDelete;
