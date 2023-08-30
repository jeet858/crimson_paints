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
    {
      name: "Packaging Type",
      href: "",
    },
    {
      name: "Colours",
      href: "",
    },
    {
      name: "Packaging Unit",
      href: "",
    },
    {
      name: "Client Companies",
      href: "",
    },
    {
      name: "Product Categories",
      href: "",
    },
    {
      name: "HSN Code",
      href: "",
    },
    {
      name: "Product Brand",
      href: "",
    },
    {
      name: "Brand and Packaging Type",
      href: "",
    },
    {
      name: "Group for Pricing",
      href: "",
    },
    {
      name: "Oderable Units",
      href: "",
    },
    {
      name: "Branch",
      href: "",
    },
    {
      name: "Customers",
      href: "",
    },
    {
      name: "user Type",
      href: "",
    },
    {
      name: "Discounts",
      href: "",
    },
    {
      name: "Schemes",
      href: "",
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
