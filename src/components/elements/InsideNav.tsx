import * as React from "react";

import SideNavElement from "./InsideNavElement";
const InsideNav: React.FunctionComponent = (props) => {
  const OrderElements = [
    {
      name: "By Salesman",
      href: "/Salesman",
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
      href: "/Master",
    },
  ];
  return (
    <div className="flex w-full justify-center pt-5">
      <SideNavElement elementHeader="Order" element={OrderElements} />
      <SideNavElement elementHeader="Stock" />
      <SideNavElement elementHeader="Reports" />
      <SideNavElement elementHeader="Uploads" />
      <SideNavElement elementHeader="Master" element={masterElement} />
    </div>
  );
};

export default InsideNav;
