import { UserTemplate } from "@/components";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaList } from "react-icons/fa";
const Data = [
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
const BrandAndPackagingTypeEdit: React.FunctionComponent = () => {
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
        <div className="flex h-fit w-full justify-between rounded-t-[10px]  bg-[#C4B0FF45] p-2 text-2xl font-bold">
          <h1>Brand Wise Qty & Packaging List Details</h1>
        </div>
        <div className="overflow-scroll  bg-[#C4B0FF8d]">
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
        <div className="flex h-fit w-full items-center justify-center gap-4 rounded-b-[10px]  bg-[#c4b0ff8d] p-2 text-xl font-semibold">
          <button
            className="h-10 w-28 rounded-lg bg-[#07096E] text-white"
            onClick={cancelclick}
          >
            Cancel
          </button>
          <button
            className="h-10 w-28 rounded-lg bg-[#C4B0FF]"
            onClick={editclick}
          >
            Save
          </button>
        </div>
      </div>
    </UserTemplate>
  );
};

export default BrandAndPackagingTypeEdit;
