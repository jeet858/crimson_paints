import { InsideNav, UserTemplate } from "@/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import OrderByTable from "~/components/tables/OrderByTable";
import { api } from "~/utils/api";

const ExecuteOrder: React.FunctionComponent = () => {
  const { data, status } = useSession();

  const [selectedSection, setSelectedSection] = useState("all");
  const [confirmed, setConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const router = useRouter();
  const { userType, order_id } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  useEffect(() => {
    if (order_id) {
      setOrderId(order_id as string);
    }
  }, [order_id]);

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
  } = api.order.order_by_id.useQuery({ id: orderId });
  const {
    data: orderDataDetails,
    isLoading: isOrderDataDetailsLoading,
    isError: isOrderDataDetailsError,
  } = api.order.order_details_by_id.useQuery({ id: orderId });

  const execute = api.order.execute_order.useMutation({
    onError: (err, newOrder, context) => {
      if (
        err.message.split("\n")[4] ===
        "Unique constraint failed on the constraint: `BasicUnits_symbol_key`"
      ) {
        alert("This data already exist");
      } else {
        alert(`${err.message}`);
      }
    },
    onSuccess: () => {
      alert("Order Executed successfully");
    },
  });

  const executeOrder = () => {
    if (confirmed) {
      execute.mutate({ id: order_id as string });
    } else {
      alert("Confirm that you want to execute this order");
    }
  };

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

  return (
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

        <div className="mt-4 flex flex-col rounded-t-xl bg-[#C4B0FF45]">
          <div className=" p-2 text-xl font-semibold">Order Details</div>
          <div className="flex w-full items-center justify-between  text-start text-lg font-semibold">
            <div className="flex-1 border border-[#11009E82] py-2">
              <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                Order #
              </div>
              <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                {order_id}
              </div>
            </div>
            <div className="flex-1 border border-[#11009E82] py-2">
              <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                Date
              </div>
              <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                {orderData?.date}
              </div>
            </div>
            <div className="flex-1 border border-[#11009E82] py-2">
              <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                Order Location
              </div>
              <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                {orderData?.state}
              </div>
            </div>
            <div className="flex-1 border border-[#11009E82] py-2">
              <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                Client
              </div>
              <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                {orderData?.client_unique_name}
              </div>
            </div>
            <div className="flex-1 border border-[#11009E82] py-2">
              <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                Client Type
              </div>
              <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                {orderData?.client_type}
              </div>
            </div>
            <div className="flex-1 border border-[#11009E82] py-2">
              <div className="flex h-1/2 w-full border-b-2 border-[#11009E82]">
                Branch
              </div>
              <div className="flex h-1/2 w-full whitespace-nowrap border-[#11009E82]">
                {orderData?.company}
              </div>
            </div>
          </div>
          <OrderByTable columns={columns} data={orderDataDetails} />
          <div className="flex h-fit items-center justify-center">
            <div
              className="mr-2 flex h-4 w-4 items-center border-2 border-[#11009E] bg-[#C4B0FF45]"
              onClick={() => {
                setConfirmed(!confirmed);
              }}
            >
              {confirmed ? <FaCheck className="h-4 w-4" /> : null}
            </div>
            <p>I confirm execution of this order</p>
          </div>
        </div>
        <div className="mt-4 flex w-full justify-end">
          <button
            className="ml-4 flex h-14 w-36 items-center justify-center self-end rounded-md bg-[#00b5ad] text-white"
            onClick={executeOrder}
          >
            Execute
          </button>
        </div>
      </div>
    </UserTemplate>
  );
};

export default ExecuteOrder;
