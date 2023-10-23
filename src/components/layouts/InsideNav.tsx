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
      name: "Basic Units",
      href: "/basic-unit",
    },
    {
      name: "Packaging Type",
      href: "/product-packaging-list",
    },
    {
      name: "Colors",
      href: "/colors",
    },
    {
      name: "Packaging Unit",
      href: "/packaging-unit",
    },
    {
      name: "Inter Company",
      href: "/inter-company",
    },
    {
      name: "Product Categories",
      href: "/product-categories",
    },
    {
      name: "HSN Code",
      href: "/hsn-code",
    },
    {
      name: "Product Brand",
      href: "/product-brand",
    },
    {
      name: "Brand and Packaging Type",
      href: "/brand-and-packaging-type",
    },
    {
      name: "Group for Pricing",
      href: "/group-for-pricing",
    },
    {
      name: "Oderable Units",
      href: "/orderable-unit",
    },
    {
      name: "Naming Price List",
      href: "/naming-price-list",
    },
    {
      name: "Oderable Colors",
      href: "/orderable-colors",
    },
    {
      name: "Sales Representatives",
      href: "/sales-representative",
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
