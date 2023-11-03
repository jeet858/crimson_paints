import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const get = async () => {
  const session = await getSession();
  return session;
};

const InterCompanyAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { name, address, bill, city, gst, phone, pin, type } = router.query;

  const add = api.interComapny.create.useMutation({
    onError: (err, newCompany, context) => {
      alert(`${err.message}`);
    },
    onSuccess: async () => {
      alert("Data added succesfully");
      await router.push("/inter-company");
    },
  });
  const [addData, setEditData] = useState({
    gst: "",
    name: "",
    type: "",
    address: "",
    pin: 0,
    city: "",
    phone: 0,
    bill: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditData({
      ...addData,
      [name]: name === "pin" || name === "phone" ? parseInt(value) : value,
    });
  };

  const create = () => {
    if (
      addData.name === "" ||
      addData.address === "" ||
      addData.bill === "" ||
      addData.city === "" ||
      addData.gst === "" ||
      addData.phone === 0 ||
      addData.pin === 0 ||
      type === ""
    ) {
      alert("Be sure to fill all fields");
    } else {
      add.mutate(addData);
    }
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-5/6 w-5/6 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="flex h-1/6 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Branch Details
          </p>
          <div className="flex h-1/6 w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/6 justify-normal">Company Name</p>
            <div className="w-2/6 grow">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <p className="flex w-1/6 justify-normal">Type</p>
            <div className="w-2/6 grow">
              <select
                name="type"
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                onChange={handleInputChange}
              >
                <option value="">--Select Company type--</option>
                <option
                  value="Head Office"
                  className="bg-[#C4B0FF] font-semibold"
                >
                  Head Office
                </option>
                <option value="Branch" className="bg-[#C4B0FF] font-semibold">
                  Branch
                </option>
              </select>
            </div>
          </div>
          <div className="flex h-1/6 w-full flex-row  items-center border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/6 justify-normal">Address</p>
            <div className="w-5/6 grow pl-2">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="address"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-1/6 w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/6 justify-normal">PIN Code</p>
            <div className="w-2/6 grow">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="pin"
                onChange={handleInputChange}
              />
            </div>
            <p className="flex w-1/6 justify-normal">City</p>
            <div className="w-2/6 grow">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="city"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-1/6 w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/6 justify-normal">GST #</p>
            <div className="w-2/6 grow">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="gst"
                onChange={handleInputChange}
              />
            </div>
            <p className="flex w-1/6 justify-normal">Phone</p>
            <div className="w-2/6 grow">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="phone"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-1/6 w-full items-center justify-normal border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <div className="flex w-3/6 flex-row">
              <p className="flex w-1/3 justify-normal">Bill</p>
              <div className="w-2/3 grow px-2">
                <select
                  name="bill"
                  className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none "
                  onChange={handleInputChange}
                >
                  <option value="">--Select Bill type--</option>
                  <option value="Bill" className="bg-[#C4B0FF] font-semibold">
                    Bill
                  </option>
                  <option
                    value="No Bill"
                    className="bg-[#C4B0FF] font-semibold"
                  >
                    No Bill
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex h-1/6 w-1/2 justify-center space-x-4 self-center px-4">
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              onClick={() => {
                console.log(addData);
              }}
            >
              Cancel
            </button>
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold"
              onClick={create}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default InterCompanyAdd;
