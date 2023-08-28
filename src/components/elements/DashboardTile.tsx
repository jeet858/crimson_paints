import * as React from "react";
import Link from "next/link";
interface DashboardTileProps {
  name: string;
  icon: JSX.Element;
  href: string;
}

const DashboardTile: React.FunctionComponent<DashboardTileProps> = (props) => {
  return (
    <Link
      href={props.href}
      className="dashBoardTileBackGround flex h-3/4 w-5/6 flex-col items-center justify-center self-center rounded-3xl bg-cover bg-center bg-no-repeat"
    >
      <div>{props.icon}</div>
      <p className="text-2xl font-semibold">{props.name}</p>
    </Link>
  );
};
export default DashboardTile;
