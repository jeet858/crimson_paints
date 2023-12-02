import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";

const get = async () => {
  const session = await getSession();
  return session;
};

const SalesRepresentativeEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { name, phone, company } = router.query;
  const {
    data: orderableColors,
    isError,
    isLoading,
  } = api.orderablrColor.all_list.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const { data: interCompany } = api.interComapny.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const update = api.salesRepresentative.edit.useMutation({
    onError: (err, newSalesman, context) => {
      alert(`An error occured }`);
    },
    onSuccess: async () => {
      alert("Data updated successfully");
      await router.push("/sales-representative");
    },
  });
  const [editData, setEditData] = useState({
    existingPhone: phone as string,
    newPhone: phone as string,
    name: name as string,
    company: company as string,
  });
  useEffect(() => {
    if (name && phone && company) {
      setEditData({
        existingPhone: phone as string,
        newPhone: phone as string,
        name: name as string,
        company: company as string,
      });
    }
  }, [name, phone, company]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const updateData = () => {
    update.mutate(editData);
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-2/4 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="flex h-1/4 w-full items-center justify-normal border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Representative Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input
              name="name"
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.name}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Phone
            <input
              name="newPhone"
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.newPhone}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Company
            <select
              name="company"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.company}
            >
              {interCompany?.map((data, index) => {
                return (
                  <option value={data.name} key={index}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex h-1/4 w-1/2 justify-between self-end px-4">
            <Link
              className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white"
              href="/sales-representative"
            >
              Cancel
            </Link>
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

export default SalesRepresentativeEdit;
