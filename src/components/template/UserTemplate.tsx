import * as React from "react";
import { FaUserCircle, FaPowerOff } from "react-icons/fa";
import { MdKeyboardArrowDown, MdDashboard } from "react-icons/md";
interface IProps {
  templateParams: {
    title: string;
    userID: number;
    userImage: string;
    userType: string;
  };
  children?: JSX.Element | JSX.Element[];
}

const UserTemplate: React.FunctionComponent<IProps> = (props) => {
  return (
    <>
      <title>{props.templateParams.title}</title>
      <main className="mainPagesBackground flex h-screen flex-col flex-nowrap items-center justify-center bg-cover bg-center bg-no-repeat">
        <div className="flex h-5/6 w-11/12 flex-col flex-nowrap rounded-3xl shadow-2xl">
          <div
            className="flex h-36 w-full flex-row items-center justify-between rounded-t-3xl px-10"
            style={{ backgroundColor: "rgba(196, 176, 255, 1)" }}
          >
            <p className="text-2xl font-semibold text-slate-600">
              Hi, User Name
            </p>
            <h1
              className="text-center text-4xl font-bold"
              style={{ color: "rgba(17, 0, 158, 1)" }}
            >
              Crimson Paints Private Ltd.{<br></br>}KOLKATA
            </h1>
            <div className="flex flex-row items-center justify-center gap-x-2">
              <FaUserCircle className="h-12 w-12 cursor-pointer rounded-full text-white" />
              <p className="cursor-pointer text-2xl font-bold text-slate-700">
                User Name{" "}
              </p>
            </div>
          </div>
          <div className="flex h-full w-full flex-row flex-nowrap">
            <div
              className="flex h-full w-44 flex-col justify-between rounded-bl-3xl"
              style={{ backgroundColor: "rgba(196, 176, 255, 1)" }}
            >
              <div>
                <span
                  className="mb-4 flex h-24 w-full cursor-pointer content-center items-center justify-center text-2xl font-bold"
                  style={{ backgroundColor: "rgba(231, 224, 255, 0.47)" }}
                >
                  Costing <MdKeyboardArrowDown />
                </span>
                <span
                  className="mb-4 flex h-24 w-full cursor-pointer content-center items-center justify-center text-2xl font-bold"
                  style={{ backgroundColor: "rgba(231, 224, 255, 0.47)" }}
                >
                  Master <MdKeyboardArrowDown />
                </span>
              </div>
              {props.templateParams.userType === "admin" ? (
                <div className="mb-20 flex flex-col items-center justify-center">
                  <MdDashboard className="h-10 w-10 cursor-pointer text-white" />
                  <p className="cursor-pointer text-2xl font-bold text-white">
                    Dashboard
                  </p>
                </div>
              ) : null}
              <div className="mb-20 flex flex-col items-center justify-center">
                <FaPowerOff className="h-10 w-10 cursor-pointer text-white" />
                <p className="cursor-pointer text-2xl font-bold">Log Out</p>
              </div>
            </div>
            <div className="h-full w-full rounded-br-3xl bg-white">
              {props.children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserTemplate;
