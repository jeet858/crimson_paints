import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { FaCheck } from "react-icons/fa";

const get = async () => {
  const session = await getSession();
  return session;
};

const ClientPartyListAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { name, symbol } = router.query;

  const {
    data: distributor,
    isLoading,
    isError,
  } = api.client.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: locations,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = api.location.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: salesRepresentatives,
    isLoading: isSalesRepresentativesLoading,
    isError: isSalesRepresentativesError,
  } = api.salesRepresentative.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const [isCheque, setIsCheque] = useState(false);
  const [isGst, setIsGst] = useState(true);
  const [addData, setAddData] = useState({
    address: "",
    bank_branch: "",
    account: "",
    code: "",
    pin_code: 0,
    distributor: "",
    district: "",
    email: "",
    gst: "",
    ifsc: "",
    legal_name: "",
    location: "",
    phone_primary: 0,
    phone_secondary: 0,
    sales_representative: "",
    state: "",
    trade_license: "",
    type: "",
    unique_name: "",
    is_cheque: false,
  });

  const trpc = api.useContext();
  const add = api.client.create.useMutation({
    onError: (err, newClient, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Data added successfully");
      router.push("/client-party-list");
    },
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAddData({
      ...addData,
      [name]:
        name === "pin_code" ||
        name === "phone_primary" ||
        name == "phone_secondary"
          ? parseInt(value)
          : value,
    });
    if (name === "Distributor") {
      setAddData({
        ...addData,
        distributor: "",
      });
    }
  };
  const create = () => {
    console.log(addData);
    add.mutate(addData);
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-5/6 w-5/6 flex-col rounded-xl bg-[#C4B0FF45]">
          {/* Client Party List Edit */}
          <p className="h-[10%] w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Distributor Details
          </p>
          {/* <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Symbol
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Symbol}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Name}
            />
          </div> */}
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Type</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select
                name="type"
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none "
                onChange={handleInputChange}
              >
                <option value="">--Select Client Type--</option>
                <option
                  value="Direct Customer"
                  className="bg-[#C4B0FF] font-semibold"
                >
                  Direct Customer
                </option>
                <option
                  value="Distributor"
                  className="bg-[#C4B0FF] font-semibold"
                >
                  Distributor
                </option>
                <option
                  value="Customer Under Distributor"
                  className="bg-[#C4B0FF] font-semibold"
                >
                  Customer Under Distributor
                </option>
              </select>
            </div>
            <p className="flex w-1/4 justify-normal">Legal Name</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="legal_name"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Unique Name</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4  outline-none"
                name="unique_name"
                onChange={handleInputChange}
              />
            </div>
            {addData.type !== "Distributor" ? (
              <div className="flex w-1/2">
                <p className="flex w-1/4 justify-normal">Distributor</p>
                <div className="w-3/4 flex-1">
                  {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
                  <select
                    name="distributor"
                    id=""
                    className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                    onChange={handleInputChange}
                  >
                    <option value="">--Select Distributor--</option>
                    {distributor?.map((client, index) => {
                      if (
                        client.distributor === null ||
                        client.distributor === ""
                      ) {
                        return (
                          <option
                            value={client.unique_name}
                            className="bg-[#C4B0FF] font-semibold"
                            key={index}
                          >
                            {client.unique_name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Sales Representative</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select
                name="sales_representative"
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none "
                onChange={handleInputChange}
              >
                <option value="">--Select Sales Representative--</option>
                {salesRepresentatives?.map((salesRepresentative, index) => {
                  return (
                    <option
                      value={salesRepresentative.name}
                      className="bg-[#C4B0FF] font-semibold"
                      key={index}
                    >
                      {salesRepresentative.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="flex w-1/4 justify-normal">Code</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="code"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Is GST?</p>
            <div className="w-1/4 flex-1">
              <div
                className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                onClick={() => {
                  setIsGst(!isGst);
                }}
              >
                {isGst ? <FaCheck className="h-8 w-8 text-[#07096E]" /> : null}
              </div>
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            {isGst ? (
              <div className="flex w-1/2">
                <p className="flex w-1/2 justify-normal">GST #</p>
                <div className="w-1/2 flex-1">
                  <input
                    className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                    name="gst"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            ) : (
              <div className="flex w-1/2">
                <p className="flex w-1/2 justify-normal">Trade License</p>
                <div className="w-1/2 flex-1">
                  <input
                    className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                    name="trade_license"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            {/* <div className="flex w-1/2">
              <p className="flex w-1/2 justify-normal">GST #</p>
              <div className="w-1/2 flex-1">
                <input className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
              </div>
            </div> */}
            <p className="flex w-1/4 justify-normal">PIN Code</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="pin_code"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row  items-center border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Address</p>
            <div className="w-3/4 flex-1 pl-4 ">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="address"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row  items-center border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Location</p>
            <div className="w-3/4 flex-1 pl-4">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="location"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">State</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select
                name="state"
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                onChange={handleInputChange}
              >
                <option value="">--Select State--</option>
                {locations?.map((loc, index) => {
                  return (
                    <option
                      value={loc.location}
                      className="bg-[#C4B0FF] font-semibold"
                      key={index}
                    >
                      {loc.location}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="flex w-1/4 justify-normal">District</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select
                name="district"
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none "
                onChange={handleInputChange}
              >
                <option value="">--Select District--</option>
                <option value="Kg" className="bg-[#C4B0FF] font-semibold">
                  Kilogram
                </option>
                <option value="G" className="bg-[#C4B0FF] font-semibold">
                  Gram
                </option>
                <option value="ML" className="bg-[#C4B0FF] font-semibold">
                  Mililitre
                </option>
              </select>
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Phone</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="phone_primary"
                onChange={handleInputChange}
              />
            </div>
            <p className="flex w-1/4 justify-normal">Alternate Phone</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="phone_primary"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Email</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="email"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Is Cheque?</p>
            <div className="w-1/4 flex-1">
              <div
                className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                onClick={() => {
                  setIsCheque(!isCheque);
                  setAddData({
                    ...addData,
                    is_cheque: !isCheque,
                  });
                }}
              >
                {isCheque ? (
                  <FaCheck className="h-8 w-8 text-[#07096E]" />
                ) : null}
              </div>
            </div>
          </div>
          {isCheque ? (
            <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
              <p className="flex w-1/4 justify-normal">Account Number</p>
              <div className="w-1/4 flex-1">
                <input
                  className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                  name="account"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : null}
          {isCheque ? (
            <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
              <p className="flex w-1/4 justify-normal">IFSC Code</p>
              <div className="w-1/4 flex-1">
                <input
                  className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                  name="ifsc"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : null}
          {isCheque ? (
            <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
              <p className="flex w-1/4 justify-normal">Branch</p>
              <div className="w-1/4 flex-1">
                <input
                  className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                  name="bank_branch"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : null}
          <div className="flex h-[20%] w-1/2 justify-between self-center px-4">
            <button className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white">
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

export default ClientPartyListAdd;
