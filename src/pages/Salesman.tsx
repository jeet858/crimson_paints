import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const Salesman = () => {
  const [selectedSection, setSelectedSection] = useState("pending");

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="ml-11">
      <div className="max-w-7xl  p-4">
        <legend className=" max-w-2xl space-x-4 border-b-2 border-blue-900 p-1">
          Published status
        </legend>
        <div className="mt-4 flex space-x-4">
          <div
            className={`cursor-pointer ${
              selectedSection === "pending"
                ? "border-b-2 border-blue-900 text-blue-900"
                : ""
            }`}
            onClick={() => handleSectionChange("pending")}
          >
            Pending
          </div>
          <div
            className={`cursor-pointer ${
              selectedSection === "cancelled"
                ? "border-b-2 border-blue-900 text-blue-900"
                : ""
            }`}
            onClick={() => handleSectionChange("cancelled")}
          >
            Cancelled
          </div>
          <div
            className={`cursor-pointer ${
              selectedSection === "execution"
                ? "border-b-2 border-blue-900 text-blue-900"
                : ""
            }`}
            onClick={() => handleSectionChange("execution")}
          >
            Execution
          </div>
        </div>
        <table className="mt-8 w-9/12  border-collapse border-purple-300">
          <thead className="min-h-min">
            <tr className="bg-purple-300">
              <th className="  mx-0 text-center text-xs">Order</th>
              <th className=" mx-0 text-center text-xs">Date</th>
              <th className=" mx-0 text-center text-xs">Order Location</th>
              <th className="mx-0 text-center text-xs">Client</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample data */}
            <tr className=" bg-purple-100">
              <td className="  text-center text-xs">123</td>
              <td className="  px-2 py-1 text-center text-xs">2023-08-16</td>
              <td className="  px-2 py-1 text-center text-xs">Location A</td>
              <td className=" px-2 py-1 text-center text-xs">Client A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salesman;
