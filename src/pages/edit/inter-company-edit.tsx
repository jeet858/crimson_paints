import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const InterCompanyEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { name, address, bill, city, gst, phone, pin, type } = router.query;

  const update = api.interComapny.edit.useMutation({
    onError: (err, newTodo, context) => {
      alert(`${err.message}`);
    },
    onSuccess: async () => {
      alert("Data updated succesfully");
      await router.push("/inter-company");
    },
  });
  const [editData, setEditData] = useState({
    existingName: name as string,
    newName: name as string,
    gst: gst as string,
    type: type as string,
    address: address as string,
    pin: parseInt(pin as string),
    city: city as string,
    phone: parseInt(phone as string),
    bill: bill as string,
  });
  useEffect(() => {
    if (name && address && bill && city && gst && phone && pin && type) {
      setEditData({
        existingName: name as string,
        newName: name as string,
        gst: gst as string,
        type: type as string,
        address: address as string,
        pin: parseInt(pin as string),
        city: city as string,
        phone: parseInt(phone as string),
        bill: bill as string,
      });
    }
  }, [name, address, bill, city, gst, phone, pin, type]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: name === "pin" || name === "phone" ? parseInt(value) : value,
    });
  };
  const updateData = () => {
    if (
      editData.newName === "" ||
      editData.address === "" ||
      editData.bill === "" ||
      editData.city === "" ||
      editData.gst === "" ||
      editData.phone === 0 ||
      editData.pin === 0 ||
      type === ""
    ) {
      alert("Be sure to fill all fields");
    } else {
      update.mutate(editData);
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
                value={editData.newName}
                name="newName"
                onChange={handleInputChange}
              />
            </div>
            <p className="flex w-1/6 justify-normal">Type</p>
            <div className="w-2/6 grow">
              <select
                name="type"
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.type}
                onChange={handleInputChange}
              >
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
                value={editData.address}
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
                value={editData.pin}
                name="pin"
                onChange={handleInputChange}
              />
            </div>
            <p className="flex w-1/6 justify-normal">City</p>
            <div className="w-2/6 grow">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.city}
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
                value={editData.gst}
                name="gst"
                onChange={handleInputChange}
              />
            </div>
            <p className="flex w-1/6 justify-normal">Phone</p>
            <div className="w-2/6 grow">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.phone}
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
                  value={editData.bill}
                  onChange={handleInputChange}
                >
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
                console.log(editData);
              }}
            >
              Cancel
            </button>
            <button
              className="h-1/2 w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold"
              onClick={updateData}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default InterCompanyEdit;
