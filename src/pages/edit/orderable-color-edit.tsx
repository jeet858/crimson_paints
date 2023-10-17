import { UserTemplate } from "@/components";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaList } from "react-icons/fa";
const Data = [
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
const OrderableColorEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const [selectedPackaging, setSelectedPackaging] = useState<number[]>(() =>
    Data.map(() => -1)
  );
  const toggleCheckbox = (productIndex: number, optionIndex: number) => {
    const newSelectedPackaging = [...selectedPackaging];

    if (newSelectedPackaging[productIndex] === optionIndex) {
      newSelectedPackaging[productIndex] = -1;
    } else {
      newSelectedPackaging[productIndex] = optionIndex;
    }

    setSelectedPackaging(newSelectedPackaging);
  };
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const cancelclick = () => {
    console.log("cancel");
  };
  const editclick = () => {
    console.log("save");
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex w-full items-end justify-end p-4">
        <button className="flex h-10 w-28 items-center justify-evenly rounded-lg bg-blue-700 text-2xl font-semibold text-white">
          <FaList className="text-3xl font-bold text-[#E7E0FF78]" />
          List
        </button>
      </div>
      <div className="flex h-[60vh] w-full flex-col p-4">
        <div className="flex h-fit w-full justify-between rounded-t-[10px] border-b-[1px] border-[#07096E]  bg-[#C4B0FF45] p-2 text-2xl font-bold">
          <h1>Orderable Color Details</h1>
        </div>
        <div className="overflow-scroll  bg-[#c4b0ff70]">
          {Data.map((item, productIndex) => (
            <div key={productIndex} className="flex flex-col p-2">
              <div className="text-md p-2 font-semibold">{item.name}:</div>
              <div className="text-md">
                <ul className="flex w-full flex-wrap gap-8 p-2">
                  {item.packaging.map((packageItem, optionIndex) => (
                    <li key={optionIndex}>
                      <label className="flex gap-3">
                        <div
                          className={`custom-checkbox flex h-6 w-8 cursor-pointer items-center justify-center rounded-sm border-2 border-gray-600 bg-transparent ${
                            selectedPackaging[productIndex] === optionIndex
                              ? "checked"
                              : ""
                          }`}
                          onClick={() =>
                            toggleCheckbox(productIndex, optionIndex)
                          }
                        >
                          {selectedPackaging[productIndex] === optionIndex ? (
                            <BsCheckLg className="text-4xl font-bold text-blue-900" />
                          ) : null}
                        </div>
                        {packageItem}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="flex h-fit w-full items-center justify-center gap-4 rounded-b-[10px]  bg-[#C4B0FF45] p-2 text-xl font-semibold">
          <button
            className="w-28 rounded-lg bg-[#07096E] text-white"
            onClick={cancelclick}
          >
            Cancel
          </button>
          <button className="w-28 rounded-lg bg-[#C4B0FF]" onClick={editclick}>
            Save
          </button>
        </div>
      </div>
    </UserTemplate>
  );
};

export default OrderableColorEdit;
