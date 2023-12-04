import { InsideNav, UserTemplate } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { number } from "zod";
import { api } from "~/utils/api";

const NewOrder: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const currentDate = new Date();
  const { data: userData } = api.user.by_id.useQuery(
    { id: data?.user.id },
    { refetchInterval: false, refetchOnWindowFocus: false }
  );
  const {
    data: brands,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = api.brand.all.useQuery(undefined, {
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
    data: salesRepresentative,
    isLoading: isSalemanLoading,
    isError: isSalesmanError,
  } = api.salesRepresentative.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: clients,
    isLoading: isClientsLoading,
    isError: isClientsError,
  } = api.client.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const { data: orderableUnit } = api.orderableUnit.all_list_details.useQuery(
    undefined,
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const { data: orderableColor } = api.orderablrColor.all_list_details.useQuery(
    undefined,
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const [orderDetails, setOrderDetails] = useState({
    client_name: "",
    salesman_name: "",
    location: "",
    date: `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`,
    id: "",
    brand_name: "",
    color_name: "",
    packaging_type: "",
    total_qty: "",
    notes: "",
    company: "",
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
      ["id"]: `${orderDetails.date}/${orderDetails.salesman_name}/${orderDetails.client_name}`,
    });
  };
  const handleSalesmanChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const obj = salesRepresentative?.find((data) => data.phone === value);
    setOrderDetails({
      ...orderDetails,
      ["salesman_name"]: `${obj?.name}`,
      ["company"]: `${obj?.company}`,
    });
  };
  const add = api.order.create.useMutation({
    onError: (err, newOrder, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Data inserted succesfully");
      router.push("/new-order");
    },
  });

  const create = () => {
    console.log(orderDetails);
    add.mutate(orderDetails);
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <form className="flex h-full w-full flex-col p-[1%]">
        <div className="flex h-5/6  w-full justify-center overflow-y-scroll rounded-lg bg-[#786ADE]">
          <div className="mx-2 flex h-fit w-[90%] flex-col space-y-2 ">
            <div className="flex h-2/6 w-2/3 flex-col">
              <div className="flex flex-row space-x-2"></div>
              <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Party:</div>
                <select
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  name="client_name"
                  onChange={handleInputChange}
                >
                  <option value="">---Select Client---</option>
                  {clients?.map((client, index) => {
                    return (
                      <option key={index} value={client.legal_name}>
                        {client.legal_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Location:</div>
                <select
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  name="location"
                  onChange={handleInputChange}
                >
                  <option value="">---Select Location---</option>
                  {locations?.map((location, index) => {
                    return (
                      <option key={index} value={location.location}>
                        {location.location}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Salesman:</div>
                <select
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  name="salesman_name"
                  onChange={handleSalesmanChange}
                >
                  <option value="">---Select Salesman---</option>
                  {salesRepresentative?.map((salesman, index) => {
                    return (
                      <option key={index} value={salesman.phone}>
                        {salesman.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Brand:</div>
                <select
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  name="brand_name"
                  onChange={handleInputChange}
                >
                  <option value="">---Select Brand---</option>
                  {brands?.map((brand, index) => {
                    return (
                      <option key={index} value={brand.brand_name}>
                        {brand.brand_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Color:</div>
                <select
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  name="color_name"
                  onChange={handleInputChange}
                >
                  <option value="">---Select Color---</option>
                  {orderableColor?.map((color, index) => {
                    if (color.brand_name === orderDetails.brand_name) {
                      return (
                        <option value={color.color_name} key={index}>
                          {color.color_name}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <div className=" flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Packaging:</div>
                <select
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  id=""
                  name="packaging_type"
                  onChange={handleInputChange}
                >
                  <option value="">---Select Packaging---</option>
                  {orderableUnit?.map((unit, index) => {
                    const salesman = salesRepresentative?.find(
                      (obj) => obj.name === orderDetails.salesman_name
                    );
                    if (unit.brand_name === orderDetails.brand_name) {
                      return (
                        <option value={unit.packaging} key={index}>
                          {unit.packaging}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Qty:</div>
                <input
                  type="text"
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  name="total_qty"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Notes:</div>
                <input
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  id=""
                  name="notes"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="mt-4 h-7 w-24 self-end rounded-md bg-[#786ADE] text-white"
          onClick={(e) => {
            e.preventDefault();
            create();
          }}
        >
          Submit
        </button>
      </form>
    </UserTemplate>
  );
};

export default NewOrder;
