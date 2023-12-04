import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import OrderByTable from "~/components/tables/OrderByTable";

const OrderBySalesman = () => {
  const [selectedUser, setSelectedUser] = useState("Uday");
  const [selectedOrder, setSelectedOrder] = useState("2023-01/0027");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenOrder, setIsDropdownOpenOrder] = useState(false);

  const [selectedSection, setSelectedSection] = useState("all");
  const handleSectionChange = (section: any) => {
    setSelectedSection(section);
  };
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const userOptions = ["User 1", "User 2", "User 3"];
  const orderOptions = ["2023-01/0027", "2023-01/0027", "2023-01/0027"];
  const orders = [
    {
      id: 1,
      orderName: "2023-01/0027",
      date: "12-Jan-2023",
      orderLocation: "Kolkata",
      client: "Siliguri Branch",
      clientType: "Dealer",
    },
  ];
  const columns = [
    { header: "Brand Name", field: "BrandName" },
    { header: "Color", field: "Color" },
    { header: "Packaging Type", field: "PackagingType" },
    { header: "Total Qty.", field: "TotalQty" },
    { header: "Executed Qty.", field: "ExecutedQty" },
    { header: "Cancelled Qty.", field: "CancelledQty" },
    { header: "Pending Qty.", field: "PendingQty" },
    { header: "Amount", field: "Amount" },
  ];

  const data = [
    {
      BrandName: "ARF Oxide",
      Color: "Red",
      PackagingType: "Carton of (1 Kg X 25 Pou.)",
      TotalQty: "40",
      ExecutedQty: "0",
      CancelledQty: "0",
      PendingQty: "40",
      Amount: "1250.00",
    },
    {
      BrandName: "ARF Oxide",
      Color: "Red",
      PackagingType: "Carton of (1 Kg X 25 Pou.)",
      TotalQty: "40",
      ExecutedQty: "0",
      CancelledQty: "0",
      PendingQty: "40",
      Amount: "1250.00",
    },
    {
      BrandName: "ARF Oxide",
      Color: "Red",
      PackagingType: "Carton of (1 Kg X 25 Pou.)",
      TotalQty: "40",
      ExecutedQty: "0",
      CancelledQty: "0",
      PendingQty: "40",
      Amount: "1250.00",
    },
    {
      BrandName: "ARF Oxide",
      Color: "Red",
      PackagingType: "Carton of (1 Kg X 25 Pou.)",
      TotalQty: "40",
      ExecutedQty: "0",
      CancelledQty: "0",
      PendingQty: "40",
      Amount: "1250.00",
    },
    {
      BrandName: "ARF Oxide",
      Color: "Red",
      PackagingType: "Carton of (1 Kg X 25 Pou.)",
      TotalQty: "40",
      ExecutedQty: "0",
      CancelledQty: "0",
      PendingQty: "40",
      Amount: "1250.00",
    },
    {
      BrandName: "ARF Oxide",
      Color: "Red",
      PackagingType: "Carton of (1 Kg X 25 Pou.)",
      TotalQty: "40",
      ExecutedQty: "0",
      CancelledQty: "0",
      PendingQty: "40",
      Amount: "1250.00",
    },
    {
      BrandName: "ARF Oxide",
      Color: "Red",
      PackagingType: "Carton of (1 Kg X 25 Pou.)",
      TotalQty: "40",
      ExecutedQty: "0",
      CancelledQty: "0",
      PendingQty: "40",
      Amount: "1250.00",
    },
  ];
  return (
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
          <div className=" flex gap-4">
            <div className="flex gap-x-4">
              <div className="w-fit text-lg font-semibold">
                Select Salesman :
              </div>
              <div className="relative inline-block">
                <div
                  className="flex  w-36 cursor-pointer items-center justify-center rounded-md border border-violet-500 bg-violet-100 p-1 text-[#787878]"
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                >
                  {selectedUser}
                  <RiArrowDropDownLine className="ml-1 text-xl" />
                </div>
                {isDropdownOpen ? (
                  <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border  border-violet-500 bg-violet-100 shadow-md">
                    {userOptions.map((user) => {
                      return (
                        <div
                          key={user}
                          className="border-b-1 cursor-pointer border-violet-500 px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                          }}
                        >
                          {user}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex gap-x-4">
              <div className="w-fit text-lg font-semibold">Select Order :</div>
              <div className="relative inline-block">
                <div
                  className="flex  w-36 cursor-pointer items-center justify-center rounded-md border border-violet-500 bg-violet-100 p-1 text-[#787878]"
                  onClick={() => {
                    setIsDropdownOpenOrder(!isDropdownOpenOrder);
                  }}
                >
                  {selectedOrder}
                  <RiArrowDropDownLine className="ml-1 text-xl" />
                </div>
                {isDropdownOpenOrder ? (
                  <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border  border-violet-500 bg-violet-100 shadow-md">
                    {orderOptions.map((order) => {
                      return (
                        <div
                          key={order}
                          className="border-b-1 cursor-pointer border-violet-500 px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setIsDropdownOpenOrder(!isDropdownOpenOrder);
                            console.log(isDropdownOpenOrder);
                          }}
                        >
                          {order}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div
              className={`cursor-pointer border-r-4 border-[#786ADE] pr-4 text-lg font-semibold text-black ${
                selectedSection === "all"
                  ? "border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => handleSectionChange("all")}
            >
              All
            </div>
            <div
              className={`cursor-pointer border-r-4 border-[#786ADE] pr-4 text-lg font-semibold text-black ${
                selectedSection === "pending"
                  ? "border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => handleSectionChange("pending")}
            >
              Pending
            </div>
            <div
              className={`cursor-pointer border-r-4 border-[#786ADE] pr-4 text-lg font-semibold text-black ${
                selectedSection === "cancelled"
                  ? "border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => handleSectionChange("cancelled")}
            >
              Cancelled
            </div>
            <div
              className={`cursor-pointer pr-4 text-lg font-semibold text-black${
                selectedSection === "executed"
                  ? " border-b-4 border-[#786ADE] text-blue-900 "
                  : ""
              }`}
              onClick={() => handleSectionChange("executed")}
            >
              Executed
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col rounded-t-xl bg-[#C4B0FF45]">
          <div className=" p-2 text-xl font-semibold">Order Details</div>
          <div className="flex w-full items-center justify-between  text-start text-lg font-semibold">
            <div className="flex-1 border border-[#11009E82] p-2">Order #</div>
            <div className="flex-1 border border-[#11009E82] p-2">Date</div>
            <div className="flex-1 border border-[#11009E82] p-2">
              Order Location
            </div>
            <div className="flex-1 border border-[#11009E82] p-2">Client</div>
            <div className="flex-1 border border-[#11009E82] p-2">
              Client Type
            </div>
          </div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between text-start  text-lg"
            >
              <div className="flex-1 border border-[#11009E82] p-2">
                {order.orderName}
              </div>
              <div className="flex-1 border border-[#11009E82] p-2">
                {order.date}
              </div>
              <div className="flex-1 border border-[#11009E82] p-2">
                {order.orderLocation}
              </div>
              <div className="flex-1 border border-[#11009E82] p-2">
                {order.client}
              </div>
              <div className="flex-1 border border-[#11009E82] p-2">
                {order.clientType}
              </div>
            </div>
          ))}
        </div>
        <OrderByTable columns={columns} data={data} />
      </div>
    </UserTemplate>
  );
};

export default OrderBySalesman;
