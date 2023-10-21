import { InsideNav, TableComponent, UserTemplate } from "@/components";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const NamingPriceList = () => {
  const router = useRouter();
  const { userType } = router.query;
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const columns = [{ header: "Name", field: "price_list_name" }];

  const {
    data: names,
    isError,
    isLoading,
  } = api.namingPriceList.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading)
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="w-full">
          <InsideNav />
          <div className="h-fit w-full p-4">
            <div className="flex items-center justify-center">
              <div className="flex w-full items-end justify-center ">
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
                <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                  Basic Unit
                </div>
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              </div>
              <div className="flex items-end justify-end">
                <Link
                  className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                  href={{ pathname: "/add/price-list-add" }}
                >
                  Add
                </Link>
              </div>
            </div>
          </div>
          <p>Loading Basic Units</p>
        </div>
      </UserTemplate>
    );
  if (isError)
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="w-full">
          <InsideNav />
          <div className="h-fit w-full p-4">
            <div className="flex items-center justify-center">
              <div className="flex w-full items-end justify-center ">
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
                <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                  Basic Unit
                </div>
                <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              </div>
              <div className="flex items-end justify-end">
                <button
                  className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                  onClick={async () => {
                    await router.push("/add/basic-units-add");
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <p>Error fetching Basic Units ❌</p>
        </div>
      </UserTemplate>
    );
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="w-full">
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Price List
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <Link
                className="flex h-8 w-28 items-center justify-center rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]"
                href={{ pathname: "/add/price-list-add" }}
              >
                Add
              </Link>
            </div>
          </div>
        </div>
        <TableComponent
          columns={columns}
          data={names}
          idField={["price_list_name"]}
          editUrl="/edit/price-list-edit"
          deleteUrl="/delete/price-list-delete"
        />
      </div>
    </UserTemplate>
  );
};

export default NamingPriceList;
