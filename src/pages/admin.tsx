import { DashboardTile, UserTemplate } from "@/components";
import * as React from "react";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
const Admin: React.FunctionComponent = () => {
  const templateParams = {
    title: "Admin",
    userID: 123,
    userImage: "user.jpg",
    userType: "admin",
  };
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="grid h-full w-full grid-cols-3 grid-rows-2 items-center justify-items-center p-[5%]">
        <DashboardTile
          href="/add-user"
          icon={<PiUserCirclePlusBold className="h-8 w-8" />}
          name="User Creation"
        />
        <DashboardTile
          href="/user-access"
          icon={<RiAdminFill className="h-8 w-8" />}
          name="User Access"
        />
        <DashboardTile
          href="/proxy-access"
          icon={<GrUserAdmin className="h-8 w-8" />}
          name="Proxy Access"
        />
      </div>
    </UserTemplate>
  );
};
export default Admin;
