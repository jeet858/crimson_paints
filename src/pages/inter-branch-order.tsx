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
  const [price, setPrice] = useState("");
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    phone: bigint;
    password: string;
    user_type: string;
  }>();
  const [orderDetails, setOrderDetails] = useState({
    order_by: "",
    order_to: "",
    date: `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`,
    id: "",
    brand_name: "",
    color_name: "",
    packaging_type: "",
    total_qty: "",
    notes: "",
    amount: 0,
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
        onSuccess(data) {},
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
  const { data: companys } = api.interComapny.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const { data: groups } = api.groupPricing.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  const { data: groupsInfo } = api.groupPricing.groups_all.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
      ["id"]: `${orderDetails.date}/${orderDetails.order_by}/${orderDetails.order_to}`,
    });
    // // setOrderDetails({
    // //   ...orderDetails,
    // //   [name]: value,
    // //   ["id"]: `${orderDetails.date}/${orderDetails.salesman_name}/${orderDetails.client_name}`,
    // // });
  };

  const add = api.interBracnhTransaction.create.useMutation({
    onError: (err, newOrder, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Data inserted succesfully");
    },
  });

  const create = () => {
    const arr = groups?.filter(
      (data) => data.brand_name === orderDetails.brand_name
    );
    const isMatchingBrand = pricingData?.filter(
      (pricingItem) =>
        pricingItem.brand_name === orderDetails.brand_name &&
        pricingItem.group_name === colorGroup &&
        pricingItem.list_name === priceListName
    );

    // console.log(arr);
    // console.log(isMatchingBrand);

    add.mutate(orderDetails);
    // console.log(priceListName);
    // console.log(colorGroup);
    // console.log(orderDetails.brand_name);

    console.log(orderDetails);
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
                <div className="font-semibold text-white">Order From:</div>
                <select
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  name="order_by"
                  onChange={handleInputChange}
                >
                  <option value="">---Select Branch---</option>
                  {companys?.map((company, index) => {
                    if (orderDetails.order_to !== company.name) {
                      return (
                        <option key={index} value={company.name}>
                          {company.name}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <div className="flex h-1/6 w-full flex-col space-y-2 font-semibold">
                <div className="font-semibold text-white">Order To:</div>
                <select
                  className="h-8 rounded-md bg-[#C4B0FF]"
                  name="order_to"
                  onChange={(e) => {
                    const { value } = e.target;
                    const arr = value.split("/");
                    arr[1] ? setPriceListName(arr[1]) : null;
                    setOrderDetails({
                      ...orderDetails,
                      order_to: arr[0] as string,
                      id: `${orderDetails.date}/${orderDetails.order_by}/${arr[0]}`,
                    });
                  }}
                >
                  <option value="">---Select Branch---</option>
                  {companys?.map((company, index) => {
                    if (orderDetails.order_by !== company.name) {
                      return (
                        <option
                          key={index}
                          value={`${company.name}/${company.price_list_name}`}
                        >
                          {company.name}
                        </option>
                      );
                    }
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
                  onChange={(e) => {
                    const { value } = e.target;
                    const arr = value.split("/");
                    arr[1] ? setColorGroup(arr[1]) : null;
                    setOrderDetails({
                      ...orderDetails,
                      color_name: arr[0] as string,
                      packaging_type: "",
                    });
                  }}
                >
                  <option value="">---Select Color---</option>
                  {/* {orderableColor?.map((color, index) => {
                    if (
                      color.brand_name === orderDetails.brand_name &&
                      color.list_name === priceListName
                    ) {
                      return (
                        <option value={color.color_name} key={index}>
                          {color.color_name}
                        </option>
                      );
                    }
                  })} */}
                  {groups?.map((group, index) => {
                    if (group.brand_name === orderDetails.brand_name) {
                      return (
                        <option
                          value={`${group.color_name}/${group.group_name}`}
                          key={index}
                        >
                          {group.color_name}
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

                    setOrderDetails({
                      ...orderDetails,
                      [name]: str[0],
                      //   ["id"]: `${orderDetails.date}/${orderDetails.salesman_name}/${orderDetails.client_name}`,
                    });
                    str[1] ? setPrice(str[1]) : null;
                  }}
                >
                  <option value="">---Select Packaging---</option>
                  {pricingData?.map((pricingItem, index) => {
                    if (
                      pricingItem.brand_name === orderDetails.brand_name &&
                      pricingItem.group_name === colorGroup &&
                      pricingItem.list_name === priceListName
                    ) {
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
                      amount: parseInt(price) * parseInt(value),
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
