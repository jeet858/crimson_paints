import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";

const SalesRepresentativeAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };

  const [addData, setAddData] = useState({
    name: "",
    phone: 0,
    company: "",
  });
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
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAddData({
      ...addData,
      [name]: name === "phone" ? parseInt(value) : value,
    });
  };

  const add = api.salesRepresentative.create.useMutation({
    onError: (err, newSalesman, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      router.push("/sales-representative");
    },
  });

  const create = () => {
    console.log(addData);
    if (addData.name != "" || addData.company != "" || addData.phone != 0) {
      add.mutate(addData);
    } else {
      alert("Be sure to fill all fields or enter valid data");
    }
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/3 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Sales Representative Add
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input
              name="name"
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Phone
            <input
              name="phone"
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Company
            <select
              name="company"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
            >
              <option value="">--Select Company--</option>
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

export default SalesRepresentativeAdd;
