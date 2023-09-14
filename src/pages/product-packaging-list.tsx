import React from "react";
import { useRouter } from "next/router";
import { UserTemplate } from "@/components";
import BasicUnitTable from "~/components/elements/BasicUnitTable";

const productpackaginglist = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "Symbol", field: "symbol" },
    { header: "Name", field: "name" },
    { header: "Short Code", field: "shortcode" },
  ];
  const data = [
    {
      symbol: "Gm",
      name: "Gram",
      shortcode: "Gram",
    },
    {
      symbol: "Kg",
      name: "Kilogram",
      shortcode: "Kg",
    },
    {
      symbol: "Lit",
      name: "Liter",
      shortcode: "Lit",
    },
    {
      symbol: "ML.",
      name: "Milliliter",
      shortcode: "ML.",
    },
  ];
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="w-full p-4">
        <div className="flex items-center justify-center">
          <div className="text-center text-xl font-semibold text-[#11009E]">
            Product Packaging List
            <svg
              width="150"
              height="30"
              viewBox="0 0 426 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8C3.86258e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 -3.86258e-07 8 0C3.58172 3.86258e-07 -3.86258e-07 3.58172 0 8ZM410 7.99996C410 12.4182 413.582 16 418 16C422.418 16 426 12.4182 426 7.99996C426 3.58169 422.418 -3.62296e-05 418 -3.58433e-05C413.582 -3.54571e-05 410 3.58169 410 7.99996ZM8 9.5L418 9.49996L418 6.49996L8 6.5L8 9.5Z"
                fill="#C4B0FF"
              />
            </svg>
          </div>
        </div>
      </div>

      <BasicUnitTable columns={columns} data={data} />
    </UserTemplate>
  );
};

export default productpackaginglist;
