import React from "react";
import { api } from "~/utils/api";

interface RowData {
  username: string;
  type: string;
  status: string;
  proxyFor: string[];
}

interface TableComponentProps {
  tableData: RowData[];
  onActionButtonClick: (rowData: RowData) => void;
}

const TableComponentProxyAccess: React.FC<TableComponentProps> = ({
  tableData,
  onActionButtonClick,
}) => {
  const { data: proxyAccess } = api.proxyAccess.all.useQuery();
  const { data: usersData } = api.user.all.useQuery();

  return (
    <div className="flex  h-full w-full items-center justify-center">
      <div className="mt-8  w-[95%] ">
        <div className=" flex justify-between border-b-[3px] border-white bg-[#C4B0FF] pr-[10px] font-semibold">
          <div className="flex w-1/12 items-center justify-center p-3">
            Serial No
          </div>
          <div className="flex w-1/6 items-center justify-center p-3">
            User name
          </div>
          <div className="flex w-1/6 items-center justify-center p-3">
            User Id
          </div>
          <div className="flex w-1/6 items-center justify-center p-3">Type</div>
          <div className="flex w-2/6 items-center justify-center p-3">
            Proxy For
          </div>
          <div className="flex w-1/12 items-center justify-center p-3">
            Actions
          </div>
        </div>
        <div className="max-h-[40vh]  overflow-y-auto">
          {usersData?.map((user, index) => {
            if (user.user_type !== "admin") {
              return (
                <div className=" flex justify-between border-b-[3px] border-white bg-[#C4B0FF45] font-semibold">
                  <div className="flex w-1/12 items-center justify-center p-3">
                    {index}
                  </div>
                  <div className="flex w-1/6 items-center justify-center p-3">
                    {user.name}
                  </div>
                  <div className="flex w-1/6 items-center justify-center p-3">
                    {user.id}
                  </div>
                  <div className="flex w-1/6 items-center justify-center p-3">
                    {user.user_type}
                  </div>
                  <div className="flex w-2/6 items-center justify-center p-3">
                    {proxyAccess?.map((proxy, index) => {
                      if (proxy.user_id === user.id) {
                        return (
                          <div className="rounded border-[1px] bg-[#D7D7D7] px-2 py-1 text-center text-xs text-[#787878]">
                            blah
                          </div>
                        );
                      }
                    })}

                    {/* <div className="rounded border-[1px] bg-[#07096E] px-2 py-1 text-center text-xs text-white">
                      blah
                    </div> */}
                  </div>
                  <div className="flex w-1/12 items-center justify-center p-3">
                    <button
                      className="h-[25px] w-[80px] rounded border-[1px] border-[#999691] bg-[#786ADE] text-xs text-white hover:bg-blue-700"
                      onClick={() => {}}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default TableComponentProxyAccess;
