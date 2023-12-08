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
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    phone: bigint;
    password: string;
    user_type: string;
  }>();
  const [salesman, setSalesman] = useState<{
    name: string;
    phone: string;
    company: string;
    orderable_unit: string;
    orderable_color: string;
    self_data: boolean;
  }>();
  const [orderDetails, setOrderDetails] = useState({
    client_name: "",
    salesman_name: "",
    location: "",
    date: `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`,
    id: "",
    brand_name: "",
    salesman_phone: "",
    color_name: "",
    packaging_type: "",
    total_qty: "",
    notes: "",
    company: "",
    amount: 0,
    client_type: "",
    client_unique_name: "",
  });
  const [colorGroup, setColorGroup] = useState("");
  const [priceListName, setPriceListName] = useState("");

  const { data: userData } = api.user.by_email.useQuery(
    { id: data?.user.id },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        // console.log(data);
        // console.log(data?.phone.toString());

        data ? setUser(data) : null;
      },
    }
  );
  const { data: salesRepresentativeData } =
    api.salesRepresentative.where_by_phone.useQuery(
      { phone: user ? user.phone.toString() : "" },
      {
        refetchInterval: false,
        refetchOnWindowFocus: false,
        onSuccess(data) {
          data ? setSalesman(data) : null;
          data
            ? setOrderDetails({
                ...orderDetails,
                salesman_name: data.name,
                salesman_phone: data.phone,
              })
            : null;
          // console.log(data);
          console.log(salesman);
        },
      }
    );
  const {
    data: brands,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = api.brand.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  // const {
  //   data: locations,
  //   isLoading: isLocationLoading,
  //   isError: isLocationError,
  // } = api.location.all_state.useQuery(undefined, {
  //   refetchInterval: false,
  //   refetchOnWindowFocus: false,
  // });
  // const {
  //   data: salesRepresentative,
  //   isLoading: isSalemanLoading,
  //   isError: isSalesmanError,
  // } = api.salesRepresentative.all.useQuery(undefined, {
  //   refetchInterval: false,
  //   refetchOnWindowFocus: false,
  // });
  const {
    data: clients,
    isLoading: isClientsLoading,
    isError: isClientsError,
  } = api.client.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const { data: clientSupervisor } = api.client.client_supervisors_all.useQuery(
    undefined,
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const { data: orderableUnit } = api.orderableUnit.all_list_details.useQuery(
    undefined,
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const { data: pricingData } = api.pricing.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const { data: groupColors } = api.groupPricing.where_by_group_brande.useQuery(
    {
      brand_name: orderDetails?.brand_name,
      color_name: orderDetails?.color_name,
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        if (data) {
          setColorGroup(data?.group_name);
        } else {
        }
      },
    }
  );
  const { data: orderableColor } = api.orderablrColor.all_list_details.useQuery(
    undefined,
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

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
    add.mutate(orderDetails);

    console.log(orderDetails);
    console.log(salesman?.orderable_color);
    console.log(salesman?.orderable_unit);
    console.log(priceListName);
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
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const str = value.split("X");
                    str[1] ? setPriceListName(str[1]) : null;
                    if (!str[0] || !str[1] || !str[2] || !str[3] || !str[4]) {
                      console.log(str);
                      alert("id error");
                    }
                    str[2] && str[3] && str[4] && str[5]
                      ? setOrderDetails({
                          ...orderDetails,
                          [name]: str[0],
                          ["id"]: `${orderDetails.date}/${orderDetails.salesman_name}/${orderDetails.client_name}`,
                          ["location"]: str[2],
                          ["company"]: str[3],
                          ["client_type"]: str[4],
                          ["client_unique_name"]: str[5],
                        })
                      : setOrderDetails({
                          ...orderDetails,
                          [name]: str[0],
                          ["id"]: `${orderDetails.date}/${orderDetails.salesman_name}/${orderDetails.client_name}`,
                        });
                  }}
                >
                  <option value="">---Select Client---</option>
                  {clients?.map((client, index) => {
                    const matchingSupervisor = clientSupervisor?.find(
                      (supervisor) =>
                        supervisor.phone === salesman?.phone &&
                        supervisor.name === client.unique_name
                    );
                    if (
                      client.sales_representative_phone === salesman?.phone ||
                      matchingSupervisor
                    ) {
                      return (
                        <option
                          key={index}
                          value={`${client.legal_name}X${client.price_list_name}X${client.state}X${client.primary_company}X${client.type}X${client.unique_name}`}
                        >
                          {client.legal_name}/{client.unique_name}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              {/* <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
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
              </div> */}
              {/* <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
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
              </div> */}
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
                    if (
                      color.brand_name === orderDetails.brand_name &&
                      color.list_name === salesman?.orderable_color
                    ) {
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
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const str = value.split("X");
                    console.log(str[1]);

                    str[1]
                      ? setOrderDetails({
                          ...orderDetails,
                          [name]: str[0],
                          ["id"]: `${orderDetails.date}/${orderDetails.salesman_name}/${orderDetails.client_name}`,
                          amount: parseInt(str[1]),
                        })
                      : setOrderDetails({
                          ...orderDetails,
                          [name]: str[0],
                          ["id"]: `${orderDetails.date}/${orderDetails.salesman_name}/${orderDetails.client_name}`,
                        });
                  }}
                >
                  <option value="">---Select Packaging---</option>
                  {pricingData?.map((pricingItem, index) => {
                    const isMatchingBrand = orderableUnit?.some(
                      (orderableItem) =>
                        orderableItem.brand_name === pricingItem.brand_name &&
                        pricingItem.brand_name === orderDetails.brand_name &&
                        orderableItem.packaging === pricingItem.packaging &&
                        pricingItem.list_name === priceListName
                    );

                    if (isMatchingBrand) {
                      return (
                        <option
                          value={`${pricingItem.packaging}X${pricingItem.price}`}
                          key={index}
                        >
                          {pricingItem.packaging}
                        </option>
                      );
                    }
                  })}
                  {/* {orderableUnit
                    ?.filter((orderableItem) =>
                      pricingData?.some(
                        (pricingItem) =>
                          pricingItem.brand_name === orderableItem.brand_name &&
                          pricingItem.packaging === orderableItem.packaging &&
                          pricingItem.list_name === priceListName &&
                          pricingItem.group_name === colorGroup
                      )
                    )
                    .map((orderableItem) => {
                      return (
                        <option value="${orderableItem.list_name}">
                          {orderableItem.packaging}
                        </option>
                      );
                    })} */}
                </select>
              </div>
              <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Qty:</div>
                <input
                  type="text"
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  name="total_qty"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setOrderDetails({
                      ...orderDetails,
                      total_qty: value,
                      amount:
                        parseInt(orderDetails.amount.toString()) *
                        parseInt(value),
                    });
                  }}
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
