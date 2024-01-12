import React, { useState } from "react";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import CheckBox from "../elements/CheckBox";
import { api } from "~/utils/api";
interface UserAccessTableProps {
  title: string;
  user_type: string;
}
const UserAccessTable: React.FunctionComponent<UserAccessTableProps> = (
  props
) => {
  const [userAccessArray, setUserAccessArray] = useState<
    {
      menu_type: string;
      user_type: string;
      page_name: string;
      access: boolean;
      edit: boolean;
      del: boolean;
    }[]
  >();
  const {
    data: userAccess,
    isLoading,
    isError,
  } = api.userAccess.specific.useQuery(
    { menu_type: props.title, user_type: props.user_type },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        console.log(data);
        setUserAccessArray(data);
      },
    }
  );

  const update = api.userAccess.edit.useMutation({
    onError: (err, newTodo, context) => {
      if (
        err.message.split("\n")[4] ===
        "Unique constraint failed on the constraint: `BasicUnits_symbol_key`"
      ) {
        alert("This data already exist");
      } else {
        alert(`${err.message}`);
      }
    },
    onSuccess: () => {
      alert("Data edited successfully");
    },
  });
  const updateData = () => {
    if (userAccessArray) {
      update.mutate(userAccessArray);
    } else {
      alert("Array is empty");
    }
  };
  // const userAccessLookup = React.useMemo(() => {
  //   if (userAccess) {
  //     return userAccess.reduce((acc, item) => {
  //       acc[item.title] = item;
  //       return acc;
  //     }, {} as Record<string, typeof userAccess[number]>);
  //   }
  //   return {};
  // }, [userAccess]);

  // const [localData, setLocalData] = React.useState(props.data);

  // const handleCheckboxToggle = (index: number, type: "access" | "edit") => {
  //   const newData = [...localData];
  //   if (newData) {
  //     newData[index]![type] = !newData[index]![type];
  //     setLocalData(newData);
  //     console.log(newData);
  //   }
  // };

  const handleCheckboxClick = (
    user_type: string,
    page_name: string,
    access_type: string
  ) => {
    setUserAccessArray((prevUserAccessArray) => {
      return prevUserAccessArray?.map((item) => {
        if (
          item.user_type === props.user_type &&
          item.page_name === page_name
        ) {
          return {
            ...item,
            [access_type]: !item[access_type], // Toggle the checkbox value
          };
        }
        return item;
      });
    });
  };

  return (
    <div className="flex h-fit w-[90%] flex-col">
      <div className="flex h-fit w-full flex-col overflow-y-auto bg-[#C4B0FF45]">
        <div className="flex h-10 w-full justify-between bg-[#C4B0FF] px-8">
          <div className="flex w-1/5 justify-center">
            <p className="self-center text-base font-semibold">Serial No</p>
          </div>
          <div className="flex w-3/5 justify-center">
            <p className="self-center text-base font-semibold">{props.title}</p>
          </div>
          <div className="flex w-1/12 justify-center">
            <p className="self-center text-base font-semibold">Access</p>
          </div>
          <div className="flex w-1/12 justify-center">
            <p className="self-center text-base font-semibold">Edit</p>
          </div>
          <div className="flex w-1/12 justify-center">
            <p className="self-center text-base font-semibold">Delete</p>
          </div>
        </div>
        {userAccessArray?.map((item, index) => {
          // const correspondingUserAccess = userAccessLookup[e.title] || {};
          // const hasAccess = correspondingUserAccess.access || false;
          // const hasEdit = correspondingUserAccess.edit || false;

          if (
            item.user_type === props.user_type &&
            item.menu_type === props.title
          ) {
            return (
              <div
                className="flex w-full justify-between px-8 py-4"
                key={index}
              >
                <div className="flex w-1/5 justify-center">
                  <p className="self-center text-base font-semibold">
                    {index + 1}
                  </p>
                </div>
                <div className="flex w-3/5 justify-center">
                  <p className="self-center text-base font-semibold">
                    {item.page_name}
                  </p>
                </div>
                <div
                  className="flex w-1/12 justify-center"
                  onClick={() => {
                    handleCheckboxClick(
                      props.user_type,
                      item.page_name,
                      "access"
                    );
                  }}
                >
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-[#C4B0FF] text-white">
                    {item.access ? <FaCheck className="h-8 w-8" /> : null}
                  </div>
                </div>
                <div
                  className="flex w-1/12 justify-center"
                  onClick={() => {
                    handleCheckboxClick(
                      props.user_type,
                      item.page_name,
                      "edit"
                    );
                  }}
                >
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-[#C4B0FF] text-white">
                    {item.edit ? <FaCheck className="h-8 w-8" /> : null}
                  </div>
                </div>
                <div
                  className="flex w-1/12 justify-center"
                  onClick={() => {
                    handleCheckboxClick(props.user_type, item.page_name, "del");
                  }}
                >
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-[#C4B0FF] text-white">
                    {item.del ? <FaCheck className="h-8 w-8" /> : null}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <button
        className="mt-8 h-12 w-32 self-end bg-[#786ADE] text-lg font-semibold text-white"
        onClick={() => {
          console.log(userAccessArray);
          updateData();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default UserAccessTable;
