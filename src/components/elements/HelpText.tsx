import * as React from "react";

interface IProps {
    helpText:string;
    className:string;
    children?: any;
}

const HelpText: React.FunctionComponent<IProps> = (props) => {
    return (
        <div className={`${props.className}`}>{props.helpText}</div>
    )
}

export default HelpText;