import * as React from "react";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import CheckBox from "../elements/CheckBox";
import { api } from "~/utils/api";
interface UserAccessTableProps {
  title: string;
  data: {
    title: string;
    access: boolean;
    edit: boolean;
  }[];
}
const UserAccessTable: React.FunctionComponent<UserAccessTableProps> = (
  props
) => {

  const {
    data: userAccess,
    isLoading,
    isError,
  } = api.userAccess.all.useQuery();
  console.log(userAccess);

  const userAccessLookup = React.useMemo(() => {
    if (userAccess) {
      return userAccess.reduce((acc, item) => {
        acc[item.title] = item;
        return acc;
      }, {} as Record<string, typeof userAccess[number]>);
    }
    return {};
  }, [userAccess]);

  const [localData, setLocalData] = React.useState(props.data);

  const handleCheckboxToggle = (index: number, type: "access" | "edit") => {
    const newData = [...localData];
    if (newData) {
      newData[index]![type] = !newData[index]![type];
      setLocalData(newData);
      console.log(newData);
    }
  };
  

  return (
    <div className="flex h-fit w-[90%] flex-col">
      <div className="flex h-fit w-full flex-col overflow-y-auto bg-[#C4B0FF45]">
        <div className="flex h-10 w-full justify-between bg-[#C4B0FF] px-8">
        <p className="self-center text-base font-semibold">Serial No</p>
          <p className="self-center text-base font-semibold"> {props.title}</p>
          <div className="flex w-1/5 items-center justify-between">
            <p className="text-base font-semibold">Access</p>
            <FaPencilAlt className="h-6 w-6 text-white" />
          </div>
        </div>
        {props.data.map((e, index) => {
          const correspondingUserAccess = userAccessLookup[e.title] || {};
          const hasAccess = correspondingUserAccess.access || false;
          const hasEdit = correspondingUserAccess.edit || false;

          return ( 
            <div
              className="flex h-10 w-full justify-between px-8 py-8"
              key={index}
            >
              <p className="self-center text-base font-semibold">{index + 1}</p>
              <p className="self-center text-base font-semibold">{e.title}</p>
              <div className="flex w-1/5 items-center justify-between">
                <CheckBox permission={hasAccess} onChange={() => handleCheckboxToggle(index, "access")} key={e.title} />
                <CheckBox permission={hasEdit} onChange={() => handleCheckboxToggle(index, "edit")} key={e.title} />
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="mt-8 h-12 w-32 self-end bg-[#786ADE] text-lg font-semibold text-white" 
      >
        Save
      </button>
    </div>
  );
};

export default UserAccessTable;
