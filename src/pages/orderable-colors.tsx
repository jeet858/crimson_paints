import { InsideNav, UserTemplate } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import OrderableColorTable from "~/components/tables/OrderableColorTable";
import OrderableUnitTable from "~/components/tables/OrderableUnitTable";

const OrderableColors = () => {
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
      packaging: [
        "black",
        "red",
        "Blue",
        "chocolate",
        "Green",
        "Phiroza",
        "Green",
        "Pink",
        "Red",
      ],
    },
    {
      name: "ARF Oxide",
      packaging: ["Black", "Blue", "Gold", "Green", "Red"],
    },
    {
      name: "Classic Oxide",
      packaging: [
        "Ext. Red DPP (HR) ",
        "Fast Black (BL)",
        " Fast Blue (HT) ",
        "Fast Green (GR)",
        "Fast Violet (VL)",
      ],
    },
    {
      name: "Colour Universe",
      packaging: [
        "Apple Green ",
        "Apple White ",
        "Apricot",
        "Aquamarine",
        "Blush Pink ",
        "Brick",
        "Red",
        "Candy",
      ],
    },
    {
      name: "Crimolite",
      packaging: [
        "Aquamarine",
        "Bituminious Black",
        "Black",
        "Brilliant White",

        "Golden Brown ,",
        "Golden",
        "Yellow",
        "Mint Green ",
      ],
    },
    {
      name: "Crimson Bond SBR",
      packaging: [
        "Royal",
        "Ivory",
        "Signal Red",
        "Sky Blue ",
        "Smoke Grey",
        "White",
        "Wild Purple",
      ],
    },
    {
      name: "Crimson CRETE",
      packaging: [
        "Brown",
        "Bus",
        "Green",
        " Chessis Red",
        "Coptic Green",
        " Coptic Red",
        " Deep Orange",
      ],
    },
    {
      name: "Crimson Super IWC",
      packaging: [
        "Silver",
        "Grey",
        "Sky Blue ",
        "Spl. Brick Red ",
        "Spring Green",
        "White Yellow",
      ],
    },
    {
      name: "Damp Seald",
      packaging: [
        "Lime",
        "Mid Cream ",
        " Off White ",
        "Pale Rose ",
        "Peach",
        "Pink",
        "Rose, White ",
      ],
    },
    {
      name: "Double Plus",
      packaging: ["Dove Grey ", "Ivory", " Light Biscuit ", "Light Olive"],
    },
    {
      name: "Eko Plus",
      packaging: [
        "Med. Yellow (MY)",
        "Megenta (MA)",
        "Raw Umber(RU)",
        "Red Oxide (RO)",
        " White (WH)",
        "Yellow Oxide (YO)",
      ],
    },
    {
      name: "EZ Base",
      packaging: ["Oxford Blue", "P.O. Red ", "Pale Cream", " Phirozi Blue"],
    },
    {
      name: "Gulf Oxide",
      packaging: [
        " HP Yellow (HP)",
        " Interior Red (IR)",
        "Interior Yellow (IY)",
        "Light Blue (LB)",
        "Light Green (LG)",
      ],
    },
  ];
  const handleEditClick = () => {
    console.log("edit");
  };
  const handleDeleteClick = () => {
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
        <OrderableColorTable
          data={data}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
          editUrl="edit/orderable-color-edit"
          deleteUrl="delete/orderable-color-delete"
        />
      </div>
    </UserTemplate>
  );
};

export default OrderableColors;
