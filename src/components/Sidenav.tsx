import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { FiPower } from "react-icons/fi";

const Sidenav: React.FC = () => {
  const logoutContainerStyle: React.CSSProperties = {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
  };

  return (
    <>
      <div
        className="p-3"
        style={{ backgroundColor: "rgba(231, 224, 255, 0.47)" }}
      >
        <div className="flex flex-col gap-4">
          <button className="flex items-center space-x-2 rounded py-2">
            <span
              className="font-semibold"
              style={{ color: "rgba(148, 142, 142, 1)" }}
            >
              Costing
            </span>
            <RiArrowDownSLine />
          </button>
        </div>
      </div>

      <div className="mb-4"></div>

      <div
        className="p-3"
        style={{ backgroundColor: "rgba(231, 224, 255, 0.47)" }}
      >
        <div className="flex flex-col gap-6">
          <button className="flex items-center space-x-2 rounded py-2">
            <span
              className="font-semibold"
              style={{ color: "rgba(148, 142, 142, 1)" }}
            >
              Master
            </span>
            <RiArrowDownSLine />
          </button>
        </div>
      </div>
      <div style={{ marginBottom: "11rem" }}></div>
      <div style={logoutContainerStyle}>
        <FiPower
          style={{ color: "white", fontSize: "30px", marginBottom: "4px" }}
        />
        <span
          style={{
            color: "black",
            fontSize: "15px",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Log Out
        </span>
      </div>
    </>
  );
};

export default Sidenav;
