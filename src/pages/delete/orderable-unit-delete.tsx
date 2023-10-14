import { UserTemplate } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaCheck, FaList } from "react-icons/fa";
import { api } from "~/utils/api";

const OrderableUnitDelete: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const { list_name } = router.query;

  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const [selectedItems, setSelectedItems] = useState<
    {
      brand_name: string;
      packaging: string;
      list_name: string;
    }[]
  >([]);
  const [firstRender, setFirstRender] = useState(true);
  const { data: brands, isLoading, isError } = api.brand.all.useQuery();
  const {
    data: brandPackagings,
    isLoading: isBrandPackagingsLoading,
    isError: isBrandPackagingsError,
  } = api.brandPackaging.all.useQuery();
  const {
    data: existingPackaging,
    isLoading: existingPackagingLoading,
    isError: existingPackagingError,
  } = api.orderableUnit.list_details.useQuery({
    list_name: list_name as string,
  });
  const del = api.orderableUnit.delete.useMutation({
    onError: (err, brandPackaging, context) => {
      alert(`An error occured }`);
    },
    onSuccess: async () => {
      alert("Data deleted succesfully");
      setFirstRender(true);
      await router.push("/orderable-unit");
    },
  });

  const deleteData = () => {
    confirmed
      ? del.mutate({
          list_name: list_name as string,
        })
      : alert("Please confirm that you want to delete this list");
  };
  useEffect(() => {
    if (selectedItems.length == 0 && existingPackaging && firstRender) {
      setFirstRender(false);
      console.log(existingPackaging);
      setSelectedItems(existingPackaging);
    }
  }, [existingPackaging, firstRender]);
  const [confirmed, setConfirmed] = useState(false);
  if (isError || isBrandPackagingsError || existingPackagingError) {
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="flex w-full items-end justify-end p-4">
          <button className="flex h-10 w-28 items-center justify-evenly rounded-lg bg-blue-700 text-2xl font-semibold text-white">
            <FaList className="text-3xl font-bold text-[#E7E0FF78]" />
            List
          </button>
        </div>
        <div className="flex h-[60vh] w-full flex-col p-4">
          <div className="flex h-fit w-full justify-between rounded-[10px]  bg-[#C4B0FF45] p-2 text-2xl font-bold">
            <h1>Orderable Unit Details</h1>
          </div>
          <div className="overflow-scroll rounded-[10px] bg-[#c4b0ff70]"></div>
          <div className="flex h-fit w-full items-center justify-center gap-4 rounded-[10px]  bg-[#C4B0FF45] p-2 text-xl font-semibold">
            <button className="w-28 rounded-lg bg-[#07096E] text-white">
              Cancel
            </button>
            <button className="w-28 rounded-lg bg-[#C4B0FF]">Save</button>
          </div>
        </div>
      </UserTemplate>
    );
  }
  if (isLoading || isBrandPackagingsLoading || existingPackagingLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <div className="flex w-full items-end justify-end p-4">
          <button className="flex h-10 w-28 items-center justify-evenly rounded-lg bg-blue-700 text-2xl font-semibold text-white">
            <FaList className="text-3xl font-bold text-[#E7E0FF78]" />
            List
          </button>
        </div>
        <div className="flex h-[60vh] w-full flex-col p-4">
          <div className="flex h-fit w-full justify-between rounded-[10px]  bg-[#C4B0FF45] p-2 text-2xl font-bold">
            <h1>Orderable Unit Details</h1>
          </div>
          <div className="overflow-scroll rounded-[10px] bg-[#c4b0ff70]"></div>
          <div className="flex h-fit w-full items-center justify-center gap-4 rounded-[10px]  bg-[#C4B0FF45] p-2 text-xl font-semibold">
            <button className="w-28 rounded-lg bg-[#07096E] text-white">
              Cancel
            </button>
            <button className="w-28 rounded-lg bg-[#C4B0FF]">Save</button>
          </div>
        </div>
      </UserTemplate>
    );
  }
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex w-full items-end justify-end p-4">
        <button className="flex h-10 w-28 items-center justify-evenly rounded-lg bg-blue-700 text-2xl font-semibold text-white">
          <FaList className="text-3xl font-bold text-[#E7E0FF78]" />
          List
        </button>
      </div>
      <div className="flex h-[60vh] w-full flex-col p-4">
        <div className="flex h-fit w-full justify-between rounded-[10px]  bg-[#C4B0FF45] p-2 text-2xl font-bold">
          <h1>Orderable Unit Details</h1>
          <div>{list_name}</div>
        </div>
        <div className="flex w-full flex-col overflow-scroll rounded-[10px] bg-[#c4b0ff70] p-2">
          {brands.map((brand, optionIndex) => (
            <div key={optionIndex} className="my-4 flex w-full font-semibold">
              <div className="flex whitespace-nowrap" key={optionIndex}>
                {brand.brand_name}
              </div>
              <div className="ml-4 flex flex-wrap">
                {brandPackagings.map((brandPackaging, index) => {
                  if (brandPackaging.brand_name === brand.brand_name) {
                    const object = {
                      brand_name: brand.brand_name,
                      packaging: brandPackaging.packaging,
                      list_name: list_name,
                    };
                    const exists = selectedItems.some(
                      (item) =>
                        item.brand_name === object.brand_name &&
                        item.packaging === object.packaging
                    );
                    return (
                      <div
                        key={index}
                        className="mr-2 flex items-center justify-center font-normal"
                      >
                        <div className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black">
                          {exists ? (
                            <FaCheck className="h-8 w-8 text-[#07096E]" />
                          ) : null}
                        </div>
                        {brandPackaging.packaging}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex h-fit w-full flex-col items-center justify-center gap-4  rounded-[10px] bg-[#C4B0FF45] p-2 text-xl font-semibold">
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
          <div className="flex gap-4">
            <button
              className="w-28 rounded-lg bg-[#07096E] text-white"
              onClick={async () => {
                await router.push("/orderable-unit");
                console.log(selectedItems);
              }}
            >
              Cancel
            </button>
            <button
              className="w-28 rounded-lg bg-[#C4B0FF]"
              onClick={deleteData}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default OrderableUnitDelete;
