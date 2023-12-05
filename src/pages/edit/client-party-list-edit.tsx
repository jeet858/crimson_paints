import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { FaCheck } from "react-icons/fa";
import { boolean } from "zod";

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
  const [isNone, setIsNone] = useState(true);
  const [isGst, setIsGst] = useState(true);
  const [selectedRepNumber, setSelectedRepNumber] = useState("");
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
    price_list_name: string;
    primary_company: string;
    is_active: boolean;
    in_india: boolean;
    gst_validity: Date;
    max_credit_days: number;
    max_credit_amount: number;
    sales_supervisor: { name: string; phone: string }[];
    secondary_company: { unique_name: string; company: string }[];
    sales_representative_phone: string;
  }>();
  const {
    data: client,
    isLoading,
    isError,
  } = api.client.by_unique_name.useQuery(unique_name as string, {
    onSuccess(data) {
      if (data?.sales_supervisor !== null && data?.secondary_company !== null) {
        setEditData({
          existing_type: data.type as string,
          existing_unique_name: data.unique_name as string,
          pin_code: parseInt(data.pin_code as string),
          phone_primary: parseInt(data.phone_primary as string),
          phone_secondary: parseInt(data.phone_secondary as string),
          address: data.address as string,
          bank_branch: data.bank_branch as string,
          account: data.account as string,
          code: data.code as string,
          distributor: data.distributor as string,
          district: data.district as string,
          email: data.email as string,
          gst: data.gst as string,
          ifsc: data.ifsc as string,
          legal_name: data.legal_name as string,
          location: data.location as string,
          sales_representative: data.sales_representative as string,
          sales_supervisor: data.sales_supervisor as {
            name: string;
            phone: string;
          }[],
          secondary_company: data.secondary_company as {
            unique_name: string;
            company: string;
          }[],
          state: data.state as string,
          trade_license: data.trade_license as string,
          type: data.type as string,
          unique_name: data.unique_name as string,
          is_cheque: data.is_cheque as boolean,
          price_list_name: data.price_list_name as string,
          primary_company: data.primary_company as string,
          is_active: data.is_active as boolean,
          in_india: data.in_india as boolean,
          gst_validity: data.gst_validity as Date,
          max_credit_days: data.max_credit_days as number,
          max_credit_amount: data.max_credit_amount as number,
          sales_representative_phone: data.sales_representative_phone as string,
        });
        if (data.gst && data.gst.length <= 0) {
          setIsGst(false);
        }
        if (data.account && data.account.length > 0) {
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
  const { data: interCompany } = api.interComapny.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: locations,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = api.location.all_state.useQuery(undefined, {
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
      if (name === "sales_representative") {
        const str = value.split("X");
        const updatedSupervisors = editData.sales_supervisor.filter(
          (supervisor) =>
            supervisor.name !== str[0] && supervisor.phone !== str[1]
        );
        setSelectedRepNumber(str[1] as string);
        setEditData({
          ...editData,
          sales_representative: str[0] as string,
          sales_representative_phone: str[1] as string,
          sales_supervisor: updatedSupervisors,
        });
      } else if (name === "primary_company") {
        const updatedCompany = editData.secondary_company.filter(
          (data) => data.company !== value
        );
        setEditData({
          ...editData,
          secondary_company: updatedCompany,
          primary_company: value,
        });
      } else if (name === "Distributor") {
        setEditData({
          ...editData,
          distributor: "",
        });
      } else {
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
    }
  };
  const updateData = () => {
    if (editData) {
      const arr: string[] = [];
      editData.secondary_company.forEach((ele) => {
        arr.push(ele.company);
      });
      update.mutate({
        ...editData,
        secondary_company: arr,
        gst_validity: editData.gst_validity
          ? editData.gst_validity.toString()
          : "",
        max_credit_days: editData.max_credit_days.toString(),
        max_credit_amount: editData.max_credit_amount.toString(),
      });
      console.log(editData.sales_representative);
      console.log(editData.sales_supervisor);
      console.log(editData);

      console.log(editData.gst_validity);
    }
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
                value={`${editData?.sales_representative}X${editData?.sales_representative_phone}`}
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
                value={editData?.code}
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
                value={editData?.price_list_name}
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
                        value={editData?.gst}
                      />
                    </div>
                    <p className="flex w-fit justify-normal">Validity Date</p>
                    <div className="w-1/2 flex-1">
                      <input
                        className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                        name="gst_validity"
                        type="date"
                        onChange={handleInputChange}
                        value={
                          editData?.gst_validity?.toString().includes("T")
                            ? editData?.gst_validity
                                ?.toISOString()
                                .split("T")[0]
                            : editData?.gst_validity?.toString()
                        }
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
                        value={editData?.trade_license}
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
                value={editData?.pin_code}
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
                  value={editData?.address}
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
                  value={editData?.primary_company}
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
                  if (editData) {
                    setEditData({
                      ...editData,
                      in_india: !editData?.in_india,
                    });
                  }
                }}
              >
                {editData?.in_india ? (
                  <FaCheck className="h-8 w-8 text-[#07096E]" />
                ) : null}
              </div>
            </div>
            <p className="flex w-1/4 justify-normal">Is Active?</p>
            <div className="w-1/4 flex-1">
              <div
                className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                onClick={() => {
                  if (editData) {
                    setEditData({
                      ...editData,
                      is_active: !editData.is_active,
                    });
                  }
                }}
              >
                {editData?.is_active ? (
                  <FaCheck className="h-8 w-8 text-[#07096E]" />
                ) : null}
              </div>
            </div>
          </div>
          {editData?.in_india ? (
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
                  value={editData.state}
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
                  value={editData.district}
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
          ) : (
            <div className="flex h-[10%] w-full flex-row  items-center border-b-2 border-[#11009E] px-4 text-lg font-semibold">
              <p className="flex w-1/4 justify-normal">Legal Address</p>
              <div className="w-3/4 flex-1 pl-4">
                <input
                  className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                  name="location"
                  onChange={handleInputChange}
                  value={editData?.location}
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
            <p className="flex w-1/4 justify-normal">Max Credit Days</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="max_credit_days"
                onChange={handleInputChange}
                value={editData?.max_credit_days}
              />
            </div>
            <p className="flex w-1/4 justify-normal">Max Credit Amount</p>
            <div className="w-1/4 flex-1">
              <input
                className="w-full rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
                name="max_credit_amount"
                onChange={handleInputChange}
                value={editData?.max_credit_amount}
              />
            </div>
          </div>
          <div className="flex h-[10%] w-full flex-row items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <p className="flex w-1/4 justify-normal">Is Cheque?</p>
            <div className="w-1/4 flex-1">
              <div
                className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                onClick={() => {
                  if (editData) {
                    setIsCheque(!isCheque);
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
          <div className="flex  w-full flex-col items-center justify-center space-x-4 border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            <div>Select Sales Supervisors</div>
            <div className="mt-4 flex">
              {salesRepresentatives?.map((salesRepresentative, index) => {
                if (
                  salesRepresentative.phone !==
                  editData?.sales_representative_phone
                ) {
                  const obj = editData?.sales_supervisor.some(
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
                          setEditData((prevData) => {
                            if (prevData) {
                              // Your logic for updating sales_supervisor here

                              // Example logic:
                              const updatedSupervisors =
                                prevData.sales_supervisor.filter(
                                  (supervisor) =>
                                    supervisor.name !==
                                      salesRepresentative.name ||
                                    supervisor.phone !==
                                      salesRepresentative.phone
                                );

                              return {
                                ...prevData,
                                sales_supervisor: updatedSupervisors,
                              };
                            }

                            return prevData; // Return prevData if it's undefined
                          });
                        } else {
                          // If not selected, add to the list
                          setEditData((prevData) => {
                            if (prevData) {
                              return {
                                ...prevData,
                                sales_supervisor: [
                                  ...prevData.sales_supervisor,
                                  {
                                    name: salesRepresentative.name,
                                    phone: salesRepresentative.phone,
                                  },
                                ],
                              };
                            }
                          });
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
                if (company.name !== editData?.primary_company) {
                  const obj = editData?.secondary_company.some(
                    (secondaryCompany) =>
                      secondaryCompany.company === company.name
                  );
                  return (
                    <div
                      className="mx-2 my-2 flex w-fit cursor-pointer items-center justify-center bg-[#C4B0FF] pr-2 font-semibold"
                      key={index}
                      onClick={() => {
                        if (obj) {
                          // If already selected, remove from the list
                          const updatedCompany =
                            editData?.secondary_company.filter(
                              (data) => data.company !== company.name
                            );
                          setEditData((prevData) => {
                            if (prevData && updatedCompany) {
                              return {
                                ...prevData,
                                secondary_company: updatedCompany,
                              };
                            }
                          });
                        } else {
                          // If not selected, add to the list
                          setEditData((prevData) => {
                            if (prevData) {
                              return {
                                ...prevData,
                                secondary_company: [
                                  ...prevData.secondary_company,
                                  {
                                    company: company.name,
                                    unique_name: prevData.unique_name,
                                  },
                                ],
                              };
                            }
                          });
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

export default ClientPartyListEdit;
