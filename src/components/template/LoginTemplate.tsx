import * as React from "react";

interface LoginProps {
  templateParams: {
    title: string;
    userID: number;
    userImage: string;
    userType: string;
  };
  children?: JSX.Element | JSX.Element[];
}

const LoginTemplate: React.FunctionComponent<LoginProps> = (props) => {
  return (
    <>
      <title>{props.templateParams.title}</title>
      <main className="mainPagesBackground flex h-screen flex-col flex-nowrap items-center justify-center bg-cover bg-center bg-no-repeat">
        <div className="flex h-[40%] w-3/12 flex-col flex-nowrap rounded-3xl bg-white shadow-2xl">
          {props.children}
        </div>
      </main>
    </>
  );
};

export default LoginTemplate;
