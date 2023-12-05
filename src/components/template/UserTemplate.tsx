import * as React from "react";
import { InsideNav, OuterNav, SideNav } from "@/components";
interface IProps {
  templateParams: {
    title: string;
    userID: string | number;
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
          <OuterNav userName={props.templateParams.userID} />
          <div className="flex h-[90%] w-full flex-row flex-nowrap overflow-auto">
            <SideNav userType={props.templateParams.userType} />
            <div className="flex h-full w-11/12 flex-initial flex-col overflow-x-hidden overflow-y-scroll rounded-br-3xl bg-white">
              {props.children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserTemplate;
