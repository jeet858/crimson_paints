import { InsideNav, UserTemplate } from "@/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import OrderByTable from "~/components/tables/OrderByTable";
import { api } from "~/utils/api";

const MyOrder: React.FunctionComponent = () => {
  const { data, status } = useSession();

  const [selectedSection, setSelectedSection] = useState("all");

  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "Brand Name", field: "brand_name" },
    { header: "Color", field: "color_name" },
    { header: "Packaging Type", field: "packaging_type" },
    { header: "Total Qty.", field: "total_qty" },
    { header: "Executed Qty.", field: "executed_qty" },
    { header: "Cancelled Qty.", field: "cancelled_qty" },
    { header: "Pending Qty.", field: "pending_qty" },
    { header: "Amount", field: "amount" },
  ];

  const {
    data: userData,
    isLoading,
    isError,
  } = api.user.by_email.useQuery(
    { id: data?.user.id },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        // console.log(data);
        // console.log(data?.phone.toString());
      },
    }
  );
  const {
    data: orderData,
    isLoading: isOrderDataLoading,
    isError: isOrderDataError,
  } = api.order.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: orderDataDetails,
    isLoading: isOrderDataDetailsLoading,
    isError: isOrderDataDetailsError,
  } = api.order.all_details.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading || isOrderDataDetailsLoading || isOrderDataDetailsLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">Still Loading</div>
      </UserTemplate>
    );
  }
  if (isError || isOrderDataDetailsError || isOrderDataError) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">Error</div>
      </UserTemplate>
    );
  }

  return userData?.user_type === "admin" ? (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Orders By Salesman
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <div className=" flex gap-4"></div>
          <div className="flex gap-4">
            <div
              className={`cursor-pointer border-r-4 border-[#786ADE] pr-4 text-lg font-semibold text-black ${
                selectedSection === "all"
                  ? "border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => setSelectedSection("all")}
            >
              All
            </div>
            <div
              className={`cursor-pointer border-r-4 border-[#786ADE] pr-4 text-lg font-semibold text-black ${
                selectedSection === "pending"
                  ? "border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => setSelectedSection("Pending")}
            >
              Pending
            </div>
            <div
              className={`cursor-pointer border-r-4 border-[#786ADE] pr-4 text-lg font-semibold text-black ${
                selectedSection === "cancelled"
                  ? "border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => setSelectedSection("Cancelled")}
            >
              Cancelled
            </div>
            <div
              className={`cursor-pointer pr-4 text-lg font-semibold text-black${
                selectedSection === "executed"
                  ? " border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => setSelectedSection("Executed")}
            >
              Executed
            </div>
          </div>
        </div>
        {orderData?.map((data, index) => {
          const matchingOrderDetails = orderDataDetails?.filter(
            (orderDetail) => {
              // Assuming id is the common property
              return orderData.some((order) => order.id === orderDetail.id);
            }
          );
          const str = data.id.split("/");

          return (
            <div
              className="mt-4 flex flex-col rounded-t-xl bg-[#C4B0FF45]"
              key={index}
            >
              <div className=" p-2 text-xl font-semibold">Order Details</div>
              <div className="flex w-full items-center justify-between  text-start text-lg font-semibold">
                <div className="flex-1 border border-[#11009E82] p-2">
                  Order #
                </div>
                <div className="flex-1 border border-[#11009E82] p-2">Date</div>
                <div className="flex-1 border border-[#11009E82] p-2">
                  Order Location
                </div>
                <div className="flex-1 border border-[#11009E82] p-2">
                  Client
                </div>
                <div className="flex-1 border border-[#11009E82] p-2">
                  Client Type
                </div>
                <div className="flex-1 border border-[#11009E82] p-2">
                  Branch
                </div>
              </div>

              <div
                key={index}
                className="flex items-center justify-between text-start  text-lg"
              >
                <div className="flex-1 border border-[#11009E82] p-2">
                  {data.id}
                </div>
                <div className="flex-1 border border-[#11009E82] p-2">
                  {str[0]}
                </div>
                <div className="flex-1 border border-[#11009E82] p-2">
                  {data.state}
                </div>
                <div className="flex-1 border border-[#11009E82] p-2">
                  {data.client_unique_name}
                </div>
                <div className="flex-1 border border-[#11009E82] p-2">
                  {data.client_type}
                </div>
                <div className="flex-1 border border-[#11009E82] p-2">
                  {data.company}
                </div>
              </div>
              <OrderByTable columns={columns} data={matchingOrderDetails} />
            </div>
          );
        })}
      </div>
    </UserTemplate>
  ) : (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              My Order
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <div className=" flex gap-4"></div>
          <div className="flex gap-4">
            <div
              className={`cursor-pointer border-r-4 border-[#786ADE] pr-4 text-lg font-semibold text-black ${
                selectedSection === "all"
                  ? "border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => setSelectedSection("all")}
            >
              All
            </div>
            <div
              className={`cursor-pointer border-r-4 border-[#786ADE] pr-4 text-lg font-semibold text-black ${
                selectedSection === "Pending"
                  ? "border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => setSelectedSection("Pending")}
            >
              Pending
            </div>
            <div
              className={`cursor-pointer border-r-4 border-[#786ADE] pr-4 text-lg font-semibold text-black ${
                selectedSection === "Cancelled"
                  ? "border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => setSelectedSection("Cancelled")}
            >
              Cancelled
            </div>
            <div
              className={`cursor-pointer pr-4 text-lg font-semibold text-black${
                selectedSection === "Executed"
                  ? " border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => setSelectedSection("Executed")}
            >
              Executed
            </div>
          </div>
        </div>
        {orderData?.map((data, index) => {
          const matchingOrderDetails = orderDataDetails.filter(
            (detail) => detail.id === data.id
          );
          const str = data.id.split("/");

          if (
            data.salesman_phone === userData?.phone.toString() &&
            (data.status === selectedSection || selectedSection === "all")
          ) {
            return (
              <div
                className="mt-4 flex flex-col rounded-t-xl bg-[#C4B0FF45]"
                key={index}
              >
                <div className=" p-2 text-xl font-semibold">Order Details</div>
                <div className="flex w-full items-center justify-between  text-start text-lg font-semibold">
                  <div className="flex-1 border border-[#11009E82] py-2">
                    <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                      Order #
                    </div>
                    <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                      {data.id}
                    </div>
                  </div>
                  <div className="flex-1 border border-[#11009E82] py-2">
                    <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                      Date
                    </div>
                    <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                      {str[0]}
                    </div>
                  </div>
                  <div className="flex-1 border border-[#11009E82] py-2">
                    <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                      Order Location
                    </div>
                    <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                      {data.state}
                    </div>
                  </div>
                  <div className="flex-1 border border-[#11009E82] py-2">
                    <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                      Client
                    </div>
                    <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                      {data.client_unique_name}
                    </div>
                  </div>
                  <div className="flex-1 border border-[#11009E82] py-2">
                    <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                      Client Type
                    </div>
                    <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                      {data.client_type}
                    </div>
                  </div>
                  <div className="flex-1 border border-[#11009E82] py-2">
                    <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                      Branch
                    </div>
                    <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                      {data.company}
                    </div>
                  </div>
                  <div className="flex-1 items-center justify-center border border-[#11009E82] pt-2">
                    <div className="flex h-1/2 w-full items-center justify-center border-b-2 border-[#11009E82] text-center">
                      Actions
                    </div>
                    {data.status !== "Executed" ? (
                      <div className="flex h-1/2 w-full items-center justify-center whitespace-nowrap border-[#11009E82]">
                        <Link
                          className="my-1 flex h-fit w-fit bg-[#11009E82]"
                          href={{
                            pathname: "/execute-order",
                            query: { order_id: data.id },
                          }}
                        >
                          Execute
                        </Link>
                      </div>
                    ) : (
                      <div className="flex h-1/2 w-full items-center justify-center whitespace-nowrap border-[#11009E82]"></div>
                    )}
                  </div>
                  {/* <div className="flex-1 border border-[#11009E82] p-2">
                    Date
                  </div>
                  <div className="flex-1 border border-[#11009E82] p-2">
                    Order Location
                  </div>
                  <div className="flex-1 border border-[#11009E82] p-2">
                    Client
                  </div>
                  <div className="flex-1 border border-[#11009E82] p-2">
                    Client Type
                  </div>
                  <div className="flex-1 border border-[#11009E82] p-2">
                    Branch
                  </div> */}
                </div>

                {/* <div
                  key={index}
                  className="flex items-center justify-between text-start  text-lg"
                >
                  <div className="flex-1 whitespace-nowrap border border-[#11009E82] p-2">
                    {data.id}
                  </div>
                  <div className="flex-1 border border-[#11009E82] p-2">
                    {str[0]}
                  </div>
                  <div className="flex-1 border border-[#11009E82] p-2">
                    {data.state}
                  </div>
                  <div className="flex-1 border border-[#11009E82] p-2">
                    {data.client_unique_name}
                  </div>
                  <div className="flex-1 border border-[#11009E82] p-2">
                    {data.client_type}
                  </div>
                  <div className="flex-1 border border-[#11009E82] p-2">
                    {data.company}
                  </div>
                </div> */}
                <OrderByTable columns={columns} data={matchingOrderDetails} />
              </div>
            );
          }
        })}
      </div>
    </UserTemplate>
  );
};

export default MyOrder;
