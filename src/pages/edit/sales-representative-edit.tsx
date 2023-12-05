import { UserTemplate } from "@/components";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { create } from "domain";

const SalesRepresentativeEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { name, phone, company, orderable_color, orderable_unit } =
    router.query;
  const { data: orderableColors } = api.orderablrColor.all_list.useQuery(
    undefined,
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const { data: orderableUnits } = api.orderableUnit.all.useQuery(undefined, {
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
  } = api.location.all.useQuery(undefined, {
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
    orderable_color: orderable_color as string,
    orderable_unit: orderable_unit as string,
  });
  const [orderableLocationData, setOrderableLocationData] = useState(
    [] as string[]
  );
  const [accessLocationData, setAccessLocationData] = useState([] as string[]);
  useEffect(() => {
    if (name && phone && company && orderable_color && orderable_unit) {
      setEditData({
        existingPhone: phone as string,
        newPhone: phone as string,
        name: name as string,
        company: company as string,
        orderable_color: orderable_color as string,
        orderable_unit: orderable_unit as string,
      });
    }
  }, [name, phone, company, orderable_color, orderable_unit]);
  const { data: orderableLocations } =
    api.salesRepresentative.salesman_orderable_location.useQuery(
      { phone: phone as string },
      {
        refetchInterval: false,
        refetchOnWindowFocus: false,
        onSuccess(data) {
          const arr: string[] = [];
          data.forEach((element) => {
            arr.push(element.location);
          });
          console.log(arr);
          setOrderableLocationData(arr);
        },
      }
    );
  const { data: accessLocations } =
    api.salesRepresentative.salesman_access_location.useQuery(
      { phone: phone as string },
      {
        refetchInterval: false,
        refetchOnWindowFocus: false,
        onSuccess(data) {
          const arr: string[] = [];
          data.forEach((element) => {
            arr.push(element.location);
          });
          setAccessLocationData(arr);
        },
      }
    );
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
    const obj = {
      existingPhone: editData.existingPhone,
      newPhone: editData.newPhone,
      name: editData.name,
      company: editData.company,
      orderable_color: editData.orderable_color,
      orderable_unit: editData.orderable_unit,
      orderableLocation: orderableLocationData,
      acessLocation: accessLocationData,
    };
    update.mutate(obj);
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
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Orderable Unit
            <select
              name="orderable_unit"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.orderable_unit}
            >
              {orderableUnits?.map((data, index) => {
                return (
                  <option value={data.list_name} key={index}>
                    {data.list_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Orderable Color
            <select
              name="orderable_color"
              id=""
              className="w-4/6 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              onChange={handleInputChange}
              value={editData.orderable_color}
            >
              {orderableColors?.map((data, index) => {
                return (
                  <option value={data.list_name} key={index}>
                    {data.list_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-2 flex h-fit w-full flex-col gap-y-2 rounded-md bg-[#F5F5F5] pb-4 text-[#787878]">
            <div className="flex">
              <div className="flex h-fit cursor-pointer flex-col  px-2">
                <div className="flex">
                  <p className="border-b-4 border-[#787878] pr-2">
                    Orderable Locations
                  </p>
                </div>
                <div className="flex">
                  {locations?.map((location, index) => {
                    return (
                      <div
                        className="flex items-center justify-center"
                        key={`${location}${index}`}
                      >
                        <p className="mr-2">{location.location}</p>

                        <div
                          className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center border-2"
                          key={`${location}${index}${index}`}
                          onClick={() => {
                            if (
                              orderableLocationData.includes(location.location)
                            ) {
                              const arr = orderableLocationData.filter(
                                (item) => item !== location.location
                              );
                              setOrderableLocationData(arr);
                            } else {
                              setOrderableLocationData([
                                ...orderableLocationData,
                                location.location,
                              ]);
                            }
                          }}
                        >
                          {orderableLocationData.includes(location.location) ? (
                            <FaCheck />
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 flex h-fit w-full flex-col gap-y-2 rounded-md bg-[#F5F5F5] pb-4 text-[#787878]">
            <div className="flex">
              <div className="flex h-fit cursor-pointer flex-col  px-2">
                <div className="flex">
                  <p className="border-b-4 border-[#787878]">
                    Access Locations
                  </p>
                </div>
                <div className="flex">
                  {locations?.map((location, index) => {
                    return (
                      <div
                        className="flex items-center justify-center"
                        key={index}
                      >
                        <p className="mr-2">{location.location}</p>

                        <div
                          className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center border-2"
                          onClick={() => {
                            if (
                              accessLocationData.includes(location.location)
                            ) {
                              const arr = accessLocationData.filter(
                                (item) => item !== location.location
                              );
                              setAccessLocationData(arr);
                            } else {
                              setAccessLocationData([
                                ...accessLocationData,
                                location.location,
                              ]);
                            }
                          }}
                        >
                          {accessLocationData.includes(location.location) ? (
                            <FaCheck />
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
              onClick={() => {
                console.log(editData);
                console.log({ acc: accessLocationData });
                console.log({ ord: orderableLocationData });
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

export default SalesRepresentativeEdit;
