import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import OrderableUnitTable from "~/components/tables/OrderableUnitTable";

const orderableunit = () => {
  const router = useRouter();
  const { userType } = router.query;

  const templateParams = {
    title: "User Profile",
    userID: 123,
    userImage: "user.jpg",
    userType: userType as string,
  };
  const data = [
    {
      name: "A-1 Oxide",
      packaging: ["Carton of (0.5 Kg X 24 Con.)", "Carton of (1 Kg X 12 Con.)"],
    },
    {
      name: "ARF Oxide",
      packaging: [
        "25 Kg Bag Carton of (0.500 Kg X 50 Pou.) Carton of (1 Kg X 25 Pou.) Jar of (0.500 Kg X 40 Pou.) Jar of (1 Kg X 20 Pou.) ",
      ],
    },
    {
      name: "Classic Oxide",
      packaging: [
        "25 Kg Bag Carton of (0.500 Kg X 50 Pou.) Carton of (1 Kg X 25 Pou.) Jar of (0.500 Kg X 40 Pou.) Jar of (1 Kg X 20 Pou.)",
      ],
    },
    {
      name: "Colour Universe",
      packaging: [
        "1 Lit Con. Crimocem Super:  10 Kg Jar 20 Kg Bag 25 Kg Bag 25 Kg Jar Bag of (5 Kg X 5 Pou.) Carton of (5 Kg X 4 Con.)",
      ],
    },
    {
      name: "Crimolite",
      packaging: [
        "20 Lit Jar Carton of (0.5 Lt. X 8 Con.) Carton of (1 Lt. X 6 Con.) Carton of (100 ML. X 12 Con.) Carton of (200 ML. X 12 Con.) Carton of (4 Lt. X 4 Con.)",
      ],
    },
    {
      name: "Crimson Bond SBR",
      packaging: [
        "10 Kg Jar 20 Kg Jar Carton of (0.250 Kg X 12 Con.) Carton of (0.500 Kg X 12 Con.) Carton of (1 Kg X 12 Con.) Carton of (5 Kg X 2 Con.) ",
      ],
    },
    {
      name: "Crimson CRETE",
      packaging: [
        "10 Kg Jar 20 Kg Jar Carton of (0.250 Kg X 12 Con.) Carton of (0.500 Kg X 12 Con.) Carton of (1 Kg X 12 Con.) Carton of (5 Kg X 2 Con.)",
      ],
    },
    {
      name: "Crimson Super IWC",
      packaging: [
        "10 Kg Jar 20 Kg Jar Carton of (0.200 Kg X 12 Con.) Carton of (0.500 Kg X 12 Con.) Carton of (1 Kg X 12 Con.) Carton of (5 Kg X 2 Con.)",
      ],
    },
    {
      name: "Damp Seald",
      packaging: [
        "10 Lit Jar 20 Lit Jar Carton of (1 Lt. X 6 Con.) Carton of (4 Lt. X 4 Con.)Deco Floor:  20 Lit Jar Carton of (1 Lt. X 6 Con.) Carton of (4 Lt. X 4 Con.)",
      ],
    },
    {
      name: "Double Plus",
      packaging: ["20 Kg Bag 25 Kg Bag Eko Plus:  20 Kg Bag 25 Kg Bag"],
    },
    {
      name: "Eko Plus",
      packaging: ["20 Kg Bag 25 Kg Bag"],
    },
    {
      name: "EZ Base",
      packaging: [
        "10 Lit Jar 18 Lit Jar 20 Lit Jar 9 Lit Jar Carton of (1 Lt. X 6 Con.) Carton of (3.6 Lt. X 4 Con.) Carton of (4 Lt. X 4 Con.) Carton of (900 ML. X 6 Con.)",
      ],
    },
    {
      name: "Gulf Oxide",
      packaging: [
        "Bag of (1 Kg X 20 Pou.) Carton of (0.500 Kg X 40 Pou.) Carton of (0.500 Kg X 50 Pou.) Carton of (1 Kg X 20 Pou.) Carton of (1 Kg X 25 Pou.) Carton of (5 Kg X 4 Pou.) Metallics:",
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
              Orderable Unit
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
      <div className="h-fit">
        <OrderableUnitTable
          data={data}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
          editUrl=""
          deleteUrl=""
        />
      </div>
    </UserTemplate>
  );
};

export default orderableunit;
