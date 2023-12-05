import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { api } from "~/utils/api";

interface GroupPricesTableEditProps {
  brand_name: string;
  list_name: string;
  group_name: string;
}

const GroupPricesEditTable: React.FC<GroupPricesTableEditProps> = (props) => {
  const {
    data: orderableUnits,
    isLoading: isOrderableUnitsLoading,
    isError: isOrderableUnitsError,
  } = api.brandPackaging.where_brand_name.useQuery(props.brand_name, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const [edit, setEdit] = useState(false);

  const {
    data: pricingData,
    isLoading,
    isError,
  } = api.pricing.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const updatedOrderableUnits = orderableUnits?.map((orderableUnit) => {
    const obj = pricingData?.find(
      (data) =>
        data.brand_name === orderableUnit.brand_name &&
        data.list_name === props.list_name &&
        data.group_name === props.group_name &&
        data.packaging === orderableUnit.packaging
    );

    const group_name = props.group_name;
    const price = obj ? obj.price : 0;
    const list_name = props.list_name;

    return { ...orderableUnit, group_name, price, list_name };
  });
  const [editData, setEditData] = useState(
    updatedOrderableUnits ? updatedOrderableUnits : []
  );
  useEffect(() => {
    if (pricingData && orderableUnits) {
      const updatedOrderableUnits = orderableUnits.map((orderableUnit) => {
        const obj = pricingData.find(
          (data) =>
            data.brand_name === orderableUnit.brand_name &&
            data.list_name === props.list_name &&
            data.group_name === props.group_name &&
            data.packaging === orderableUnit.packaging
        );

        const group_name = props.group_name;
        const price = obj ? obj.price : 0;
        const list_name = props.list_name;

        return { ...orderableUnit, group_name, price, list_name };
      });
      setEditData(updatedOrderableUnits);
    }
  }, [pricingData, orderableUnits]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedEditData = editData?.map((data) => {
      if (name === data.packaging) {
        return { ...data, price: parseFloat(value) };
      }
      return data;
    });
    setEditData(updatedEditData);
  };

  const update = api.pricing.update_by_group.useMutation({
    onError: (err, newPricing, context) => {
      alert(`${err.message}`);
    },
    onSuccess: () => {
      alert("Data updated sucessfully");
    },
  });
  const updateData = () => {
    update.mutate({
      brand_name: props.brand_name,
      group_name: props.group_name,
      list_name: props.list_name,
      data: editData,
    });
  };
  return (
    <div className="mx-12 flex h-fit w-full min-w-full flex-col flex-wrap px-8 pt-6">
      <div className="mt-4 flex h-4/5 w-full flex-col border-2 border-[#11009E]">
        <div className="flex justify-between bg-[#786ADE] p-1 text-lg font-semibold text-white">
          Group: {props.group_name}
          <div className="flex items-center justify-center">
            Edit?
            <div
              className="ml-2 flex h-6 w-6 items-center justify-center border-2 border-black"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              {edit ? <FaCheck /> : null}
            </div>
          </div>
        </div>
        {editData?.map((data, index) => {
          return (
            <div className="flex w-full justify-between px-4 pt-4" key={index}>
              <div className="self-center text-lg font-semibold">
                {data.packaging}
              </div>
              <input
                className="h-10 w-36 rounded-md border border-[#11009E] bg-[#C4B0FF45] px-2 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                name={data.packaging}
                value={data.price}
                type="number"
                onChange={handleInputChange}
              />
            </div>
          );
        })}
        {edit ? (
          <button
            className="mx-4 my-4 h-12 w-24 self-end rounded-md bg-[#786ADE] text-white"
            onClick={() => {
              console.log(editData);
              updateData();
            }}
          >
            Update
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default GroupPricesEditTable;
