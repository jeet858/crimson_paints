import { UserTemplate } from "@/components";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaList } from "react-icons/fa";
const Data = [
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
const OrderableUnitEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const [selectedPackaging, setSelectedPackaging] = useState<number[]>(() =>
    Data.map(() => -1)
  );
  const toggleCheckbox = (productIndex: number, optionIndex: number) => {
    const newSelectedPackaging = [...selectedPackaging];
    newSelectedPackaging[productIndex] = optionIndex;
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
        <div className="flex h-fit w-full justify-between rounded-[10px]  bg-[#C4B0FF45] p-2 text-2xl font-bold">
          <h1>Orderable Unit Details</h1>
        </div>
        <div className="overflow-scroll rounded-[10px] bg-[#c4b0ff70]">
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
        <div className="flex h-fit w-full items-center justify-center gap-4 rounded-[10px]  bg-[#C4B0FF45] p-2 text-xl font-semibold">
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

export default OrderableUnitEdit;
