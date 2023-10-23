import { UserTemplate } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaCheck, FaList } from "react-icons/fa";
import { api } from "~/utils/api";

const OrderableColorDelete: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const { list_name } = router.query;
  const [confirmed, setConfirmed] = useState(false);

  const {
    data: brands,
    isLoading,
    isError,
  } = api.brand.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: existingPackaging,
    isLoading: existingPackagingLoading,
    isError: existingPackagingError,
  } = api.orderablrColor.list_name_wise_detaiils.useQuery(
    {
      list_name: list_name as string,
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {}, [list_name]);
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const del = api.orderablrColor.delete.useMutation({
    onError: (err, brandPackaging, context) => {
      alert(`An error occured }`);
    },
    onSuccess: async () => {
      alert("Data deleted succesfully");
      await router.push("/orderable-colors");
    },
  });

  const updateData = () => {
    confirmed
      ? del.mutate({
          list_name: list_name as string,
        })
      : alert("Please confirm that you want to delete this list");
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex w-full items-end justify-end p-4">
        <button className="flex h-10 w-28 items-center justify-evenly rounded-lg bg-blue-700 text-2xl font-semibold text-white">
          <FaList className="text-3xl font-bold text-[#E7E0FF78]" />
          List
        </button>
      </div>
      <div className="flex h-[60vh] w-full flex-col p-4">
        <div className="flex h-fit w-full justify-between rounded-t-[10px] border-b-[1px] border-[#07096E]  bg-[#C4B0FF45] p-2 text-2xl font-bold">
          <h1>Orderable Color Details</h1>
        </div>
        <div className="overflow-scroll  bg-[#c4b0ff70]">
          {brands?.map((brand, productIndex) => (
            <div key={productIndex} className="flex flex-col p-2">
              <div className="text-md p-2 font-semibold">
                {brand.brand_name}:
              </div>
              <div className="text-md">
                <ul className="flex w-full flex-wrap gap-8 p-2">
                  {existingPackaging?.map((existing, index) => {
                    if (brand.brand_name === existing.brand_name) {
                      return (
                        <div
                          key={index}
                          className="flex cursor-pointer items-center"
                        >
                          <div
                            key={index}
                            className="mr-2 flex items-center justify-center font-normal"
                          >
                            <div
                              key={index}
                              className="mr-4 flex h-4 w-4 items-center justify-center border-2 border-black"
                            >
                              <FaCheck className="h-8 w-8 text-[#07096E]" />
                            </div>
                            {existing.color_name}
                          </div>
                        </div>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="flex h-fit w-full items-center justify-center gap-4 rounded-b-[10px]  bg-[#C4B0FF45] p-2 text-xl font-semibold">
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
          <button
            className="w-28 rounded-lg bg-[#07096E] text-white"
            onClick={async () => {}}
          >
            Cancel
          </button>
          <button className="w-28 rounded-lg bg-[#C4B0FF]" onClick={updateData}>
            Save
          </button>
        </div>
      </div>
    </UserTemplate>
  );
};

export default OrderableColorDelete;
