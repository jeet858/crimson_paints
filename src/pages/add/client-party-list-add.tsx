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
    data: states,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = api.location.all_state.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const { data: districts } = api.location.all_district.useQuery(undefined, {
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
  const { data: price_list_name } = api.pricing.all_list_name.useQuery(
    undefined,
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const { data: interCompany } = api.interComapny.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const [isCheque, setIsCheque] = useState(false);
  const [isGst, setIsGst] = useState(true);
  const [isNone, setIsNone] = useState(true);
  const [selectedRepNumber, setSelectedRepNumber] = useState("");
  const date = new Date();
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
    legal_address: "",
    phone_primary: 0,
    phone_secondary: 0,
    sales_representative: "",
    state: "",
    trade_license: "",
    type: "",
    unique_name: "",
    is_cheque: false,
    price_list_name: "",
    primary_company: "",
    is_active: true,
    in_india: true,
    gst_validity: "",
    max_credit_days: "",
    max_credit_amount: "",
    sales_representative_phone: "",
    sales_supervisor: [] as { name: string; phone: string }[],
    secondary_company: [] as string[],
  });

  const trpc = api.useContext();
  const add = api.client.create.useMutation({
    onError: (err, newClient, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Data added successfully");
      // router.push("/client-party-list");
    },
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "sales_representative") {
      const str = value.split("X");
      const updatedSupervisors = addData.sales_supervisor.filter(
        (supervisor) =>
          supervisor.name !== str[0] && supervisor.phone !== str[1]
      );
      setSelectedRepNumber(str[1] as string);
      setAddData({
        ...addData,
        sales_representative: str[0] as string,
        sales_representative_phone: str[1] as string,
        sales_supervisor: updatedSupervisors,
      });
    } else if (name === "primary_company") {
      const updatedCompany = addData.secondary_company.filter(
        (data) => data !== value
      );
      setAddData({
        ...addData,
        secondary_company: updatedCompany,
        primary_company: value,
      });
    } else if (name === "Distributor") {
      setAddData({
        ...addData,
        distributor: "",
      });
    } else {
      setAddData({
        ...addData,
        [name]:
          name === "pin_code" ||
          name === "phone_primary" ||
          name == "phone_secondary"
            ? parseInt(value)
            : value,
      });
    }
  };
  const create = () => {
    console.log(addData);
    add.mutate(addData);
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center overflow-y-auto">
        <div className="my-4 flex h-fit w-5/6 flex-col rounded-xl bg-[#C4B0FF45] py-4">
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
                      value={`${salesRepresentative.name}X${salesRepresentative.phone}`}
                      className="bg-[#C4B0FF] font-semibold"
                      key={index}
                      onSelect={() => {
                        setSelectedRepNumber(salesRepresentative.phone);
                        console.log(selectedRepNumber);
                      }}
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
            <p className="flex w-1/4 justify-normal">Email</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <p className="flex w-1/4 justify-normal">List Name</p>
            <div className="w-1/4 flex-1">
              {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
              <select
                name="price_list_name"
                id=""
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none "
                onChange={handleInputChange}
              >
                <option value="">--Select Price List--</option>
                {price_list_name?.map((list_name, index) => {
                  return (
                    <option value={list_name.price_list_name} key={index}>
                      {list_name.price_list_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/12 justify-normal">GST</p>
            <div className="w-1/4 flex-1">
              <div
                className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                onClick={() => {
                  setIsGst(true);
                  setIsNone(false);
                }}
              >
                {isGst && !isNone ? (
                  <FaCheck className="h-8 w-8 text-[#07096E]" />
                ) : null}
              </div>
            </div>
            <p className="flex w-1/12 justify-normal">Trade License</p>
            <div className="w-1/4 flex-1">
              <div
                className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                onClick={() => {
                  setIsNone(false);
                  setIsGst(false);
                }}
              >
                {!isGst && !isNone ? (
                  <FaCheck className="h-8 w-8 text-[#07096E]" />
                ) : null}
              </div>
            </div>
            <p className="flex w-1/12 justify-normal">None</p>
            <div className="w-1/4 flex-1">
              <div
                className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                onClick={() => {
                  setIsNone(!isNone);
                }}
              >
                {isNone ? <FaCheck className="h-8 w-8 text-[#07096E]" /> : null}
              </div>
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            {!isNone ? (
              <div className="flex w-1/2">
                {isGst ? (
                  <div className="flex w-full">
                    <p className="flex w-1/4 justify-normal">GST #</p>
                    <div className="w-1/2 flex-1">
                      <input
                        className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                        name="gst"
                        onChange={handleInputChange}
                      />
                    </div>
                    <p className="flex w-fit justify-normal">Validity Date</p>
                    <div className="w-1/2 flex-1">
                      <input
                        className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                        name="gst_validity"
                        type="date"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full">
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
              </div>
            ) : null}
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
            <div className="flex w-1/2">
              <p className="flex w-1/2 justify-normal">Address</p>
              <div className="w-1/2 flex-1 pl-4 ">
                <input
                  className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                  name="address"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex w-1/2">
              <p className="ml-4 flex w-1/4 justify-normal">Company</p>
              <div className="w-1/4 flex-1">
                {/* <input
                className="rounded-md border flex-1 border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                value={editData.Symbol}
              /> */}
                <select
                  name="primary_company"
                  id=""
                  className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                  onChange={handleInputChange}
                >
                  <option value="">--Select Company--</option>
                  {interCompany?.map((company, index) => {
                    return (
                      <option
                        value={company.name}
                        className="bg-[#C4B0FF] font-semibold"
                        key={index}
                      >
                        {company.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">In india?</p>
            <div className="w-1/4 flex-1">
              <div
                className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                onClick={() => {
                  setAddData({
                    ...addData,
                    in_india: !addData.in_india,
                  });
                }}
              >
                {addData.in_india ? (
                  <FaCheck className="h-8 w-8 text-[#07096E]" />
                ) : null}
              </div>
            </div>
            <p className="flex w-1/4 justify-normal">Is Active?</p>
            <div className="w-1/4 flex-1">
              <div
                className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                onClick={() => {
                  setAddData({
                    ...addData,
                    is_active: !addData.is_active,
                  });
                }}
              >
                {addData.is_active ? (
                  <FaCheck className="h-8 w-8 text-[#07096E]" />
                ) : null}
              </div>
            </div>
          </div>
          {addData.in_india ? (
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
                  {states?.map((loc, index) => {
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
                  {districts?.map((loc, index) => {
                    return (
                      <option
                        value={loc.district}
                        className="bg-[#C4B0FF] font-semibold"
                        key={index}
                      >
                        {loc.district}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          ) : (
            <div className="flex h-[10%] w-full flex-row  items-center border-b-2 border-[#11009E] px-4 text-lg font-semibold">
              <p className="flex w-1/4 justify-normal">Legal Address</p>
              <div className="w-3/4 flex-1 pl-4">
                <input
                  className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                  name="legal_address"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
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
                name="phone_secondary"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Max Credit Days</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="max_credit_days"
                onChange={handleInputChange}
              />
            </div>
            <p className="flex w-1/4 justify-normal">Max Credit Amount</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="max_credit_amount"
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
          <div className="flex  w-full flex-col items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <div>Select Sales Supervisors</div>
            <div className="mt-4 flex">
              {salesRepresentatives?.map((salesRepresentative, index) => {
                if (salesRepresentative.phone !== selectedRepNumber) {
                  const obj = addData.sales_supervisor.some(
                    (supervisor) =>
                      supervisor.name === salesRepresentative.name &&
                      supervisor.phone === salesRepresentative.phone
                  );
                  return (
                    <div
                      className="mx-2 flex cursor-pointer items-center justify-center bg-[#C4B0FF] pr-2 font-semibold"
                      key={index}
                      onClick={() => {
                        if (obj) {
                          // If already selected, remove from the list
                          const updatedSupervisors =
                            addData.sales_supervisor.filter(
                              (supervisor) =>
                                supervisor.name !== salesRepresentative.name ||
                                supervisor.phone !== salesRepresentative.phone
                            );
                          setAddData((prevData) => ({
                            ...prevData,
                            sales_supervisor: updatedSupervisors,
                          }));
                        } else {
                          // If not selected, add to the list
                          setAddData((prevData) => ({
                            ...prevData,
                            sales_supervisor: [
                              ...prevData.sales_supervisor,
                              {
                                name: salesRepresentative.name,
                                phone: salesRepresentative.phone,
                              },
                            ],
                          }));
                        }
                        //complete this function so that when ever this div is clicked sales_supervisor property of add data will be updated also ensure that no duplicate data exist
                      }}
                    >
                      <div className="mr-2 flex h-6 w-6 items-center justify-center border-2 border-black">
                        {obj ? <FaCheck /> : null}
                      </div>
                      {salesRepresentative.name}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="flex  w-full flex-col items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <div>Select Secondary Company </div>
            <div className="mt-4 flex w-fit flex-wrap whitespace-nowrap">
              {interCompany?.map((company, index) => {
                if (company.name !== addData.primary_company) {
                  const obj = addData.secondary_company.includes(company.name);
                  return (
                    <div
                      className="mx-2 my-2 flex w-fit cursor-pointer items-center justify-center bg-[#C4B0FF] pr-2 font-semibold"
                      key={index}
                      onClick={() => {
                        if (obj) {
                          // If already selected, remove from the list
                          const updatedCompany =
                            addData.secondary_company.filter(
                              (data) => data !== company.name
                            );
                          setAddData((prevData) => ({
                            ...prevData,
                            secondary_company: updatedCompany,
                          }));
                        } else {
                          // If not selected, add to the list
                          setAddData((prevData) => ({
                            ...prevData,
                            secondary_company: [
                              ...prevData.secondary_company,
                              company.name,
                            ],
                          }));
                        }
                        //complete this function so that when ever this div is clicked sales_supervisor property of add data will be updated also ensure that no duplicate data exist
                      }}
                    >
                      <div className="mr-2 flex h-6 w-6 items-center justify-center border-2 border-black">
                        {obj ? <FaCheck /> : null}
                      </div>
                      {company.name}
                    </div>
                  );
                }
              })}
            </div>
          </div>
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
