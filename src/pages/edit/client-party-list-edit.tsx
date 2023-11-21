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

const ClientPartyListEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { unique_name } = router.query;

  const update = api.client.edit.useMutation({
    onError: (err, newClient, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      alert("Data edited succesfully");
      router.push("/client-party-list");
    },
  });
  const [queryInput, setQueryInput] = useState("");
  const [isCheque, setIsCheque] = useState(false);
  const [isGst, setIsGst] = useState(true);
  const [editData, setEditData] = useState<{
    address: string;
    bank_branch: string;
    account: string;
    code: string;
    distributor: string;
    district: string;
    pin_code: number;
    email: string;
    gst: string;
    ifsc: string;
    legal_name: string;
    location: string;
    phone_primary: number;
    phone_secondary: number;
    sales_representative: string;
    state: string;
    trade_license: string;
    existing_type: string;
    type: string;
    unique_name: string;
    existing_unique_name: string;
    is_cheque: boolean;
  }>();
  const {
    data: client,
    isLoading,
    isError,
  } = api.client.by_unique_name.useQuery(unique_name as string, {
    onSuccess(data) {
      if (data !== null) {
        setEditData({
          ...data,
          existing_type: data.type,
          existing_unique_name: data.unique_name,
          pin_code: parseInt(data.pin_code),
          phone_primary: parseInt(data.phone_primary),
          phone_secondary: parseInt(data.phone_secondary),
        });
        if (data.gst.length <= 0) {
          setIsGst(false);
        }
        if (data.account.length > 0) {
          setIsCheque(true);
        }
      }
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: distributor,
    isLoading: isDistributorLoading,
    isError: isDistributorError,
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
  useEffect(() => {
    if (unique_name) {
      setQueryInput(unique_name as string);
    }
  }, [unique_name]);

  const trpc = api.useContext();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (editData) {
      setEditData({
        ...editData,
        [name]:
          name === "pin_code" ||
          name === "phone_primary" ||
          name == "phone_secondary"
            ? parseInt(value)
            : value,
      });
    }
  };
  const updateData = () => {
    if (editData) {
      update.mutate(editData);
    }
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
              {editData?.existing_type !== "Distributor" ? (
                <select
                  name="type"
                  id=""
                  className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none "
                  onChange={handleInputChange}
                  value={editData?.type}
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
              ) : (
                <p className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4  outline-none">
                  Distributor
                </p>
              )}
            </div>
            <p className="flex w-1/4 justify-normal">Legal Name</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="legal_name"
                onChange={handleInputChange}
                value={editData?.legal_name}
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
                value={editData?.unique_name}
              />
            </div>
            {editData?.type !== "Distributor" ? (
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
                    value={editData?.distributor}
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
                value={editData?.sales_representative}
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
                value={editData?.code}
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
                    value={editData?.gst}
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
                    value={editData?.trade_license}
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
                value={editData?.pin_code as unknown as string}
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
                value={editData?.address}
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
                value={editData?.location}
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
                value={editData?.state}
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
                value={editData?.district}
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
                value={editData?.phone_primary}
              />
            </div>
            <p className="flex w-1/4 justify-normal">Alternate Phone</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="phone_secondary"
                onChange={handleInputChange}
                value={editData?.phone_secondary}
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
                value={editData?.email}
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
                  if (editData) {
                    setEditData({
                      ...editData,
                      is_cheque: !isCheque,
                    });
                  }
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
                  value={editData?.account}
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
                  value={editData?.ifsc}
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
                  value={editData?.bank_branch}
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
              onClick={() => {
                updateData();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default ClientPartyListEdit;
