import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";

const get = async () => {
  const session = await getSession();
  return session;
};

const BasicUnitsDelete: React.FunctionComponent = () => {
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
  const router = useRouter();
  const { name, phone, company } = router.query;
  useEffect(() => {}, [name, phone, company]);
  const del = api.salesRepresentative.delete.useMutation({
    onError: (err, newSalesman, context) => {
      alert(`An error occured }`);
    },
    onSuccess: async () => {
      alert("Data deleted successfully");
      await router.push("/sales-representative");
    },
  });

  const deleteData = () => {
    confirmed
      ? del.mutate({
          phone: parseInt(phone as string),
          name: name as string,
          company: company as string,
        })
      : alert(
          "Please confirm that you want to delete this sales representative"
        );
  };

  const [confirmed, setConfirmed] = useState(false);

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/2 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="flex h-1/4 w-full items-center justify-normal border-b-2 border-[#11009E] pl-4 pt-2 text-lg font-semibold">
            Representative Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <div className="w-2/3 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {name}
            </div>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Phone
            <div className="w-2/3 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {phone}
            </div>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Company
            <div className="w-2/3 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none">
              {company}
            </div>
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
            <Link
              className="flex h-1/2 w-[25%] items-center justify-center self-center rounded-md bg-[#07096E] font-semibold text-white"
              href="/sales-representative"
            >
              Cancel
            </Link>
            <button
              className="h-1/2 w-[25%] self-center rounded-md bg-[#FF6E65] font-semibold text-white"
              onClick={deleteData}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default BasicUnitsDelete;
