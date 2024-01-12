import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

interface GroupForProcingTableProps {
  data: {
    brand_name: string;
  }[];
  editUrl: string;
  deleteUrl: string;
}

const GroupForProcingTable: React.FC<GroupForProcingTableProps> = ({
  data,

  editUrl,
  deleteUrl,
}) => {
  const router = useRouter();
  return (
    <div className="flex h-[50vh] w-full flex-col">
      <h1 className="h-fit w-full rounded-[5px] bg-[#786ADE] p-2 text-2xl font-bold">
        Brand Name / Code
      </h1>
      <div className="overflow-auto rounded-[5px] bg-[#c4b2f8]">
        {data.map((item, index) => (
          <div key={index} id={item.brand_name} className="flex flex-col p-1">
            <div className="text-md p-2 font-semibold">{item.brand_name}:</div>
            <div className="table">
              <div className="flex  w-full flex-col items-center justify-between rounded-lg border-[1px] border-[#786ADE] bg-[#ECE5FF99] p-2 text-xl font-semibold">
                <div className="flex w-full border-b-2 border-[#786ADE]">
                  <div className="flex w-1/4 items-center justify-center">
                    Serial No
                  </div>
                  <div className="flex w-1/4 items-center justify-center">
                    Group Name
                  </div>
                  <div className="flex w-1/4 items-center justify-center">
                    Group Code
                  </div>
                  <div className="flex w-1/4 items-center justify-center">
                    Colors
                  </div>
                  <div className="flex w-1/4 items-center justify-center">
                    Actions
                  </div>
                </div>
                <GroupInfo
                  brand_name={item.brand_name}
                  editUrl={editUrl}
                  deleteUrl={deleteUrl}
                />
              </div>
              <div className="w-full text-lg "></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupForProcingTable;
interface GroupInfoProps {
  brand_name: string;
  editUrl: string;
  deleteUrl: string;
}
const GroupInfo: React.FC<GroupInfoProps> = (props) => {
  const {
    data: groups,
    isLoading,
    isError,
  } = api.groupPricing.gorups.useQuery(props.brand_name, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  const router = useRouter();
  return (
    <div className="flex w-full flex-col">
      {groups?.map((group, index) => {
        return (
          <div className="flex w-full border-b-2 border-[#786ADE]" key={index}>
            <div className="flex w-1/4 justify-center border-r-2 border-[#786ADE] pt-4">
              {index + 1}
            </div>
            <div className="flex w-1/4 justify-center border-r-2 border-[#786ADE] pt-4">
              {group.group_name}
            </div>
            <div className="flex w-1/4 justify-center border-r-2 border-[#786ADE] pt-4">
              {group.group_code}
            </div>
            <div className="flex w-1/4 items-center justify-center border-r-2 border-[#786ADE]">
              <GroupColors
                brand_name={group.brand_name}
                group_code={group.group_code}
                group_name={group.group_name}
              />
            </div>
            <div className="mt-4 flex w-1/4 justify-center">
              <button
                className="mr-4 h-8 w-16 rounded-lg bg-[#786ADE] text-white"
                onClick={async () => {
                  const queryObj = {
                    brand_name: group.brand_name,
                    group_code: group.group_code,
                    group_name: group.group_name,
                  };
                  console.log(queryObj);
                  await router.push({
                    pathname: props.editUrl,
                    query: queryObj,
                  });
                }}
              >
                Edit
              </button>
              <button
                className="h-8 w-16 rounded-lg bg-[#FF6E65] text-white"
                onClick={async () => {
                  const queryObj = {
                    brand_name: group.brand_name,
                    group_code: group.group_code,
                    group_name: group.group_name,
                  };
                  await router.push({
                    pathname: props.deleteUrl,
                    query: queryObj,
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
interface GroupColorProps {
  brand_name: string;
  group_name: string;
  group_code: string;
}

const GroupColors: React.FC<GroupColorProps> = (props) => {
  const {
    data: colors,
    isLoading,
    isError,
  } = api.groupPricing.group_colors.useQuery(
    {
      brand_name: props.brand_name,
      group_code: props.group_code,
      group_name: props.group_name,
    },
    { refetchInterval: false, refetchOnWindowFocus: false }
  );
  return (
    <div className="flex w-full flex-wrap items-center justify-center">
      {colors?.map((color, index) => {
        return (
          <div
            className="mx-2 my-2 flex h-12 w-32 items-center justify-center text-white"
            key={index}
          >
            {color.color_name}
          </div>
        );
      })}
    </div>
  );
};
