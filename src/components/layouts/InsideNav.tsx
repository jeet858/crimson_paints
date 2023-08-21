import * as React from "react";

import { InsideNavElement } from "@/components";
const InsideNav: React.FunctionComponent = (props) => {
  const OrderElements = [
    {
      name: "By Salesman",
      href: "/salesman",
    },
    {
      name: "By Client",
      href: "#",
    },
    {
      name: "By Order Number",
      href: "#",
    },
    {
      name: "My Order",
      href: "#",
    },
    {
      name: "New Order (Mobile)",
      href: "#",
    },
    {
      name: "New Order (Web)",
      href: "#",
    },
  ];
  const masterElement = [
    {
      name: "Master",
      href: "/master",
    },
  ];
  return (
    <div className="flex w-full justify-center pt-5">
      <InsideNavElement elementHeader="Order" element={OrderElements} />
      <InsideNavElement elementHeader="Stock" />
      <InsideNavElement elementHeader="Reports" />
      <InsideNavElement elementHeader="Uploads" />
      <InsideNavElement elementHeader="Master" element={masterElement} />
    </div>
  );
};

export default InsideNav;
