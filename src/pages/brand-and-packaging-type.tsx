import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { InsideNav, UserTemplate } from "@/components";
import BrandPackagingTable from "~/components/tables/BrandPackagingTable";

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

  const buttonData: ButtonData[] = [
    { id: "a1oxide", name: "A-1 Oxide" },
    { id: "adbase", name: "AD Base" },
    { id: "arfoxide", name: "ARF Oxide" },
    { id: "classicoxide", name: "Classic Oxide" },
    { id: "colouruniverse", name: "Colour Universe" },
    { id: "crimocoat", name: "Crimo Coat" },
    { id: "crimocemsuper", name: "Crimocem Super" },
    { id: "crimolite", name: "Crimolite" },
    { id: "crimsonbondsbr", name: "Crimson Bond SBR" },
    { id: "crimsoncrete", name: "Crimson CRETE" },
    { id: "crimsonsuperiwc", name: "Crimson Super IWC" },
    { id: "decofloor", name: "Deco Floor" },
    { id: "doubleplus", name: "Double Plus" },
    { id: "ekoplus", name: "Eko Plus" },
    { id: "ezbase", name: "EZ Base" },
    { id: "gulfoxide", name: "Gulf Oxide" },
    { id: "metallics", name: "Metallics" },
  ];

  type ButtonData = {
    id: string;
    name: string;
  };
  const generateButtons = () => {
    return buttonData.map((button) => (
      <button
        key={button.id}
        className="border-1 mb-2 mr-2 h-[1.8rem] w-fit rounded-xl bg-[#e7e0fffa] px-4 font-semibold"
        onClick={() => handleButtonClick(button.id)}
      >
        {button.name}
      </button>
    ));
  };

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
  const handleEditClick = (row) => {
    console.log("edit");
  };
  const handleDeleteClick = (row) => {
    console.log("delet");
  };
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
          <div className="flex items-end justify-end">
            <button className="h-8 w-28 rounded-lg bg-[#c4b0ff] text-lg font-semibold text-black hover:bg-[#9072ea]">
              Add
            </button>
          </div>
        </div>
        <h1 className="text-xl font-semibold">Quick Links</h1>
        <div className="border-1 h-[5.4rem] w-full overflow-auto rounded-lg bg-[#C4B0FF] p-2">
          {generateButtons()}
        </div>
        <div ref={tableRef}>
          <BrandPackagingTable
            data={data}
            idField={["name", "packaging"]}
            editUrl="edit/brand-and-packaging-type-edit"
            deleteUrl="delete/brand-and-packaging-type-delete"
          />
        </div>
      </div>
    </UserTemplate>
  );
}

export default brandandpackagingtype;
