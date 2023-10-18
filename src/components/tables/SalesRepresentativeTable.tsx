import React from "react";

interface DataItem {
  representativename: string;
  phone: string;
}

interface TableProps {
  columns: {
    header: string;
    field: string;
  }[];
  data: DataItem[];
  idField: string[];
  editUrl: string;
  deleteUrl: string;
}

const SalesRepresentativeTable: React.FunctionComponent<TableProps> = (
  props
) => {
  return (
    <div className="flex h-[50vh] w-full flex-col p-4">
      <div className="flex w-full rounded-md bg-[#C4B0FF] text-lg font-semibold">
        {props.columns.map((column, index) => (
          <div key={index} className="w-1/4 py-4 text-center">
            {column.header}
          </div>
        ))}
        <div className="w-1/4 py-4 text-center">Actions</div>
      </div>
      <div className="overflow-y-auto rounded-md">
        {props.data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex border-b-[1px] border-white bg-[#C4B0FF52] bg-opacity-25 py-4 text-center text-base"
          >
            <div className="flex w-1/4 flex-col">
              <div>{row.representativename}</div>
            </div>
            <div className="flex w-1/4 flex-col">
              <div>{row.phone}</div>
            </div>
            <div className="flex w-1/4 items-center justify-center gap-x-4">
              <button
                className="h-8 w-16 rounded-lg bg-[#786ADE] text-base text-white"
                onClick={async () => {}}
              >
                Edit
              </button>
              <button
                className="h-8 w-16 rounded-lg bg-[#FF6E65] text-base text-white"
                onClick={async () => {}}
              >
                Delete
              </button>
              <button
                className="h-8 w-16 rounded-lg bg-[#39952A] text-base text-white"
                onClick={async () => {}}
              >
                Parties
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesRepresentativeTable;
