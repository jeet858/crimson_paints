import React, { useState } from "react";
import { useRouter } from "next/router";
import { InsideNav, UserTemplate } from "@/components";
import { api } from "~/utils/api";
import BrandTable from "~/components/tables/BrandTable";

const productbrand = () => {
  const router = useRouter();
  const { userType } = router.query;
  const [selectedCategory, setSelectedCategory] = useState("");
  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  const columns = [
    { header: "Brand Name", field: "brand_name" },
    { header: "HSN Code", field: "hsnCode_id" },
  ];

  const handleButtonClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };
  const generateButtons = () => {
    const buttonNames = [
      "base",
      "Cement Paints",
      "Construction Chemical",
      "Exterior Finish",
      "Floor Coat Emulsion",
      "Interior Finish",
      "Machine Colorant",
      "Metallics",
      "Oxide Colour",
      "Putty",
      "Synthetic Enamel",
      "Synthetic Primer",
      "Tilo Items",
      "Water Primer",
    ];

    return buttonNames.map((buttonName) => (
      <button
        key={buttonName}
        className="border-1 mb-4 mr-4 h-[2rem] w-fit rounded-xl bg-[#e7e0fffa] px-4 font-semibold"
        onClick={() => handleButtonClick(buttonName)}
      >
        {buttonName}
      </button>
    ));
  };
  const handleEditClick = (row) => {
    console.log("edit");
  };
  const handleDeleteClick = (row) => {
    console.log("delet");
  };
  const {
    data: catrgories,
    isLoading,
    isError,
  } = api.categories.with_brand.useQuery();
  console.log(catrgories);
  if (isLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                HSN Codes
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <button className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]">
                Add
              </button>
            </div>
          </div>
        </div>
        <div>Still loading</div>
      </UserTemplate>
    );
  }
  if (isError) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                HSN Codes
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
            <div className="flex items-end justify-end">
              <button className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]">
                Add
              </button>
            </div>
          </div>
        </div>
        <div>Error</div>
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
              Brands
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
          <div className="flex items-end justify-end">
            <button className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]">
              Add
            </button>
          </div>{" "}
        </div>
        <h1 className="text-xl font-semibold">Quick Links</h1>
        <div className="border-1 h-fit w-full   rounded-lg bg-[#C4B0FF] p-4">
          {generateButtons()}
        </div>
      </div>
      <div>
        {catrgories.map((category, index) => (
          <div>
            <BrandTable
              columns={columns}
              category={category.name}
              onDeleteClick={handleDeleteClick}
              onEditClick={handleEditClick}
              editUrl=""
              deleteUrl=""
            />
          </div>
        ))}
      </div>
    </UserTemplate>
  );
};

export default productbrand;
