import React from "react";
import { api } from "~/utils/api";

interface BrandTableProps {
  category: string;
}

const BrandTable: React.FunctionComponent<BrandTableProps> = (props) => {
  // const br={
  //   brand_name,
  //   hsn_code
  // }
  const {
    data: brand,
    isLoading,
    isError,
  } = api.brand.where_categories.useQuery(props.category);
  console.log(brand);
  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      {brand.map((br, index) => {
        return <div key={index}>{br.brand_name}</div>;
      })}
    </div>
  );
};

export default BrandTable;
