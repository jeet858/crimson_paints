import { InsideNav, UserTemplate } from "@/components";
import { access } from "fs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import OrderByTable from "~/components/tables/OrderByTable";
import { api } from "~/utils/api";

const OrderByClient: React.FunctionComponent = () => {
  const { data, status } = useSession();

  const [selectedClient, setSelectedClient] = useState("A K Hardware");
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
      representative: "Rajdip Sarkar",
    },
  ];
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
  const {
    data: clients,
    isError: isInterCompanyLoading,
    isLoading: isInterCompanyError,
  } = api.client.all.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data[0]) {
        setSelectedClient(data[0].unique_name);
      }
    },
  });
  const {
    data: accessLocations,
    isError: isAccessLocationsLoading,
    isLoading: isAccessLocationsError,
  } = api.location.user_accessable_location.useQuery(undefined, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    // onSuccess(data) {
    //   if (data[0]) {
    //     setSelectedBranch(data[0].name);
    //   }
    // },
  });
  const { data: clientSupervisors } =
    api.client.client_supervisors_all.useQuery(undefined, {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  const demodata = [
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
  if (
    isLoading ||
    isOrderDataDetailsLoading ||
    isOrderDataDetailsLoading ||
    isInterCompanyLoading ||
    isAccessLocationsLoading
  ) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">Still Loading</div>
      </UserTemplate>
    );
  }
  if (
    isError ||
    isOrderDataDetailsError ||
    isOrderDataError ||
    isInterCompanyError ||
    isAccessLocationsError
  ) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">Error</div>
      </UserTemplate>
    );
  }

  return (
    <UserTemplate templateParams={templateParams}>
      <InsideNav />
      <div className="h-fit w-full p-4">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-end justify-center ">
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
              Orders By Client
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <div className=" flex gap-4">
            <div className="flex gap-x-4">
              <select
                className="w-fit text-lg font-semibold"
                onChange={(e) => {
                  const { value } = e.target;
                  setSelectedClient(value);
                }}
              >
                Select Client :
                {clients.map((data, index) => {
                  const access = clientSupervisors?.filter(
                    (clientSupervisor) =>
                      clientSupervisor.phone === userData?.phone.toString()
                  );
                  const permisionForClient = access?.find(
                    (perm) => perm.name === data.unique_name
                  );
                  if (
                    (data.sales_representative_phone ===
                      userData?.phone.toString() ||
                      access) &&
                    permisionForClient
                  ) {
                    return (
                      <option value={data.unique_name} key={index}>
                        {data.legal_name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>

            {/* <div className="flex gap-x-4">
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
            </div> */}
          </div>
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
        <div className="mt-4 flex flex-col rounded-t-xl bg-[#C4B0FF45]">
          {orderData?.map((data, index) => {
            const matchingOrderDetails = orderDataDetails?.filter(
              (orderDetail) => {
                // Assuming id is the common property
                return orderData.some((order) => data.id === orderDetail.id);
              }
            );
            const access = accessLocations.some(
              (accessLocation) =>
                accessLocation.location === data.state &&
                accessLocation.phone === userData?.phone.toString()
            );
            const str = data.id.split("/");

            if (
              data.client_unique_name === selectedClient &&
              access &&
              (data.status === selectedSection || selectedSection === "all")
            ) {
              console.log(matchingOrderDetails);
              return (
                <div
                  className="mt-4 flex flex-col rounded-t-xl bg-[#C4B0FF45]"
                  key={index}
                >
                  <div className=" p-2 text-xl font-semibold">
                    Order Details
                  </div>
                  <div className="flex w-full items-center justify-between  text-start text-lg font-semibold">
                    <div className="flex-1 border border-[#11009E82] p-2">
                      Order #
                    </div>
                    <div className="flex-1 border border-[#11009E82] p-2">
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
            }
          })}
        </div>
      </div>
    </UserTemplate>
  );
};

export default OrderByClient;
