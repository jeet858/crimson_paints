import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { InsideNav, UserTemplate } from "@/components";
import BrandPackagingTable from "~/components/tables/BrandPackagingTable";
import { api } from "~/utils/api";

function brandandpackagingtype() {
  const router = useRouter();
  const { userType } = router.query;
  const [selectedCategory, setSelectedCategory] = useState("");
  const tableRef = useRef<HTMLDivElement | null>(null);

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };

  useEffect(() => {
    if (tableRef.current && selectedCategory) {
      const section = tableRef.current.querySelector(`#${selectedCategory}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedCategory]);
  const handleButtonClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const { data: brands, isLoading, isError } = api.brand.all.useQuery();

  const data = [
    {
      id: "a1oxide",
      name: "A-1 Oxide",
      packaging: [
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
      ],
    },
    {
      id: "adbase",
      name: "AB Base",
      packaging: [
        "1 Lit Con.",
        "10 Lit Jar",
        "18 Lit Jar",
        "20 Lit Jar",
        "3.6 Lit Con.",
        "4 Lit Con.",
        "9 Lit Jar",
        "900 ML. Con.",
        "Carton of (1 Lt. X 6 Con.)",
        "Carton of (3.6 Lt. X 4 Con.)",
        "Carton of (1 Kg X 12 Con.)",
      ],
    },
    {
      id: "arfoxide",
      name: "ARF Oxide",
      packaging: [
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
      ],
    },
    {
      id: "classicoxide",
      name: "Classic Oxide",
      packaging: [
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
      ],
    },
    {
      id: "colouruniverse",
      name: "Colour Universe",
      packaging: [
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
      ],
    },
    {
      id: "crimocoat",
      name: "Crimo Coat",
      packaging: [
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
        "Carton of (1 Kg X 12 Con.)",
        "Carton of (0.5 Kg X 24 Con.)",
      ],
    },
  ];
  if (isError) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Brand wise Qty & Packaging List
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
          </div>
        </div>
      </UserTemplate>
    );
  }
  if (isLoading) {
    return (
      <UserTemplate templateParams={templateParams}>
        <InsideNav />
        <div className="h-fit w-full p-4">
          <div className="flex items-center justify-center">
            <div className="flex w-full items-end justify-center ">
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
              <div className="border-b-4 border-[#C4B0FF] text-center text-xl font-semibold text-[#11009E]">
                Brand wise Qty & Packaging List
              </div>
              <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
            </div>
          </div>
        </div>
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
              Brand wise Qty & Packaging List
            </div>
            <div className="relative top-[3px] h-3 w-3 rounded-full bg-[#C4B0FF]"></div>
          </div>
        </div>
        <h1 className="text-xl font-semibold">Quick Links</h1>
        <div className="border-1 h-fit w-full overflow-auto rounded-lg bg-[#C4B0FF] p-2">
          {brands.map((brand, index) => (
            <button
              onClick={() => {
                const targetElement = document.getElementById(brand.brand_name);
                targetElement?.scrollIntoView();
              }}
              className="border-1 mb-4 mr-4 h-[2rem] w-fit rounded-xl bg-[#e7e0fffa] px-4 font-semibold"
            >
              {brand.brand_name}
            </button>
          ))}
        </div>
        <h1 className="mt-8 h-fit w-full rounded-[5px] bg-[#786ADE] p-2 text-2xl font-bold">
          Brand Name
        </h1>
        <div className="w-full rounded-md bg-[#C4B0FF52]">
          {brands.map((brand, index) => (
            <div>
              <BrandPackagingTable
                brandName={brand.brand_name}
                idField={["name", "packaging"]}
                editUrl=""
                deleteUrl=""
              />
            </div>
          ))}
        </div>
      </div>
    </UserTemplate>
  );
}

export default brandandpackagingtype;
