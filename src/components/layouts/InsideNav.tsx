import * as React from "react";

import { InsideNavElement } from "@/components";
const InsideNav: React.FunctionComponent = (props) => {
  const OrderElements = [
    {
      name: "Order By Salesman",
      href: "/order-by-salesman",
    },
    {
      name: "Order By Client",
      href: "/order-by-client",
    },
    {
      name: "Order By Branch",
      href: "/order-by-branch",
    },
    {
      name: "My Order",
      href: "/my-order",
    },
    {
      name: "New Order",
      href: "/new-order",
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
      name: "Orderable Units",
      href: "/orderable-unit",
    },
    {
      name: "Naming Price List",
      href: "/naming-price-list",
    },
    {
      name: "Orderable Colors",
      href: "/orderable-colors",
    },
    {
      name: "Sales Representatives",
      href: "/sales-representative",
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "Client Party List",
      href: "/client-party-list",
    },
    {
      name: "State",
      href: "/state",
    },
    {
      name: "District",
      href: "/district",
    },
    {
      name: "View Price List",
      href: "/price-list",
    },
    {
      name: "Discount",
      href: "/",
    },
    {
      name: "Schemes",
      href: "/",
    },
  ];
  const StockElements = [
    {
      name: "Current Stock",
      href: "/stock-list",
    },
    {
      name: "Stock Ledger",
      href: "/stock-ledger",
    },
  ];
  return (
    <div className="flex w-full justify-center pt-5">
      <InsideNavElement elementHeader="Order" element={OrderElements} />
      <InsideNavElement elementHeader="Stock" element={StockElements} />
      {/* <InsideNavElement elementHeader="Reports" /> */}
      <InsideNavElement elementHeader="Costing" />
      <InsideNavElement elementHeader="Master" element={masterElement} />
    </div>
  );
};

export default InsideNav;
