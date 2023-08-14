import * as React from "react";

interface IProps {
  templateParams:{title:string, userID:number, userImage:string};
  children?: JSX.Element|JSX.Element[];
}

const UserTemplate: React.FunctionComponent<IProps> = (props) => {
    return (
        <>
            <title>{props.templateParams.title}</title>
            <main>
                <div className="w-full">
                    {props.children}    
                </div>
               
            </main>
        </>
    )
}

export default UserTemplate;