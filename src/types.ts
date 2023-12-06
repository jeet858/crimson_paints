import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allBasicUnitOutput = RouterOutputs["basicUnit"]["all"];
type allPackagingTypeOutput = RouterOutputs["packagingType"]["all"];
type allPackagingUnitOutput = RouterOutputs["packagingUnit"]["all"];
type allColorsOutput = RouterOutputs["colors"]["all"];
type allHsnCodeOutput = RouterOutputs["hsn"]["all"];
type allCategoriesOutput = RouterOutputs["categories"]["all"];
type allBrandOutput = RouterOutputs["brand"]["all"];

export type basicUnit = allBasicUnitOutput[number];
export type packagingType = allPackagingTypeOutput[number];
export type packagingUnit = allPackagingUnitOutput[number];
export type colors = allColorsOutput[number];
export type hsnCode = allHsnCodeOutput[number];
export type categories = allCategoriesOutput[number];
export type brand = allBrandOutput[number];

export const basicUnitsInput = z.object({
  name: z.string({
    required_error: "Describe your basic units name",
  }),
  symbol: z.string({
    required_error: "Describe your basic units symbol",
  }),
});

export const basicUnitsEditInput = z.object({
  existingName: z.string({
    required_error: "Describe your old basic units name",
  }),
  newName: z.string({
    required_error: "Describe your new basic units name",
  }),
  symbol: z.string({
    required_error: "Describe your basic units symbol",
  }),
});

export const basicUnitsDeleteInput = z.object({
  name: z.string({
    required_error: "Describe your old basic units name",
  }),
});

export const packagingTypeInput = z.object({
  name: z.string({
    required_error: "Describe your basic units name",
  }),
});
export const packagingEditTypeInput = z.object({
  existingName: z.string({
    required_error: "Describe your old basic units name",
  }),
  newName: z.string({
    required_error: "Describe your new basic units name",
  }),
});
export const packagingDeleteInput = z.object({
  name: z.string({
    required_error: "Describe your basic units name",
  }),
});
export const packagingUnitInput = z.object({
  name: z.string({
    required_error: "This field cant be null",
  }),
  packaging: z.string({
    required_error: "This field cant be null",
  }),
  unit: z.string({
    required_error: "This field cant be null",
  }),
  unit_value: z.number({
    required_error: "This field cant be null",
  }),
});
export const packagingUnitEditInput = z.object({
  existingName: z.string({
    required_error: "Describe your old basic units name",
  }),
  packaging: z.string({
    required_error: "This field cant be null",
  }),
  unit: z.string({
    required_error: "This field cant be null",
  }),
  unit_value: z.number({
    required_error: "This field cant be null",
  }),
});
export const packagingUnitDeleteInput = z.object({
  name: z.string({
    required_error: "This field cant be null",
  }),
});
export const complexUnitInput = z.object({
  packaging: z.string({
    required_error: "This field cant be null",
  }),
  unit: z.number({
    required_error: "This field cant be null",
  }),
  unit_packaging: z.string({
    required_error: "This field cant be null",
  }),
});
export const complexUnitEditInput = z.object({
  existingName: z.string({
    required_error: "Describe your old basic units name",
  }),
  packaging: z.string({
    required_error: "This field cant be null",
  }),
  unit: z.number({
    required_error: "This field cant be null",
  }),
  unit_packaging: z.string({
    required_error: "This field cant be null",
  }),
});
export const complexUnitDeleteInput = z.object({
  name: z.string({
    required_error: "Describe your old basic units name",
  }),
});
export const colorsInput = z.object({
  color_name: z.string({
    required_error: "This field cant be null",
  }),
  rgb_code: z.string({
    required_error: "This field cant be null",
  }),
});
export const colorsEditInput = z.object({
  newName: z.string({
    required_error: "This field cant be null",
  }),
  existingName: z.string({
    required_error: "Describe your old colors name",
  }),
  rgb_code: z.string({
    required_error: "This field cant be null",
  }),
});
export const colorsDeleteInput = z.object({
  color_name: z.string({
    required_error: "This field cant be null",
  }),
});

export const hsnCodeInput = z.object({
  code: z.number({
    required_error: "This field cant be null",
  }),
  description: z.string(),
});
export const hsnCodeEditInput = z.object({
  existingCode: z.number({
    required_error: "This field cant be null",
  }),
  newCode: z.number({
    required_error: "This field cant be null",
  }),
  description: z.string(),
});
export const hsnCodeDeleteInput = z.object({
  code: z.number({
    required_error: "This field cant be null",
  }),
});

export const categoriesInput = z.object({
  name: z.string({
    required_error: "This field cant be null",
  }),
  code: z.string({
    required_error: "This field cant be null",
  }),
});
export const categoriesEditInput = z.object({
  existingName: z.string({
    required_error: "This field cant be null",
  }),
  newName: z.string({
    required_error: "This field cant be null",
  }),
  code: z.string({
    required_error: "This field cant be null",
  }),
});
export const categoriesDeleteInput = z.object({
  name: z.string({
    required_error: "This field cant be null",
  }),
});

export const brandInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  categoriesName: z.string({
    required_error: "This field cant be null",
  }),
  hsnCode_id: z.number({
    required_error: "This field cant be null",
  }),
});
export const brandEditInput = z.object({
  existingName: z.string({
    required_error: "This field cant be null",
  }),
  newName: z.string({
    required_error: "This field cant be null",
  }),
  categoriesName: z.string({
    required_error: "This field cant be null",
  }),
  hsnCode_id: z.number({
    required_error: "This field cant be null",
  }),
});
export const brandDeleteInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const brandPackagingInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  packaging_array: z.array(z.string()),
});
export const brandPackagingWhereInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  packaging: z.string({
    required_error: "This field cant be null",
  }),
});
export const brandPackagingDeleteInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const orderableUnitInput = z.object({
  list_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const orderableUnitListDetailsInput = z.object({
  list_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const orderableUniBrandPackagingInput = z.object({
  list_name: z.string({
    required_error: "This field cant be null",
  }),
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const orderableUnitListDetailsEditInput = z.object({
  list_name: z.string({
    required_error: "This field cant be null",
  }),
  data: z.array(
    z.object({
      list_name: z.string({
        required_error: "This field cant be null",
      }),
      brand_name: z.string({
        required_error: "This field cant be null",
      }),
      packaging: z.string({
        required_error: "This field cant be null",
      }),
    })
  ),
});
export const groupInfoInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  group_name: z.string({
    required_error: "This field cant be null",
  }),
  group_code: z.string({
    required_error: "This field cant be null",
  }),
});
export const groupPricingInput = z.object({
  data: z.array(
    z.object({
      brand_name: z.string({
        required_error: "This field cant be null",
      }),
      group_name: z.string({
        required_error: "This field cant be null",
      }),
      group_code: z.string({
        required_error: "This field cant be null",
      }),
      color_name: z.string({
        required_error: "This field cant be null",
      }),
    })
  ),
});
export const groupPricingEditInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  group_name: z.string({
    required_error: "This field cant be null",
  }),
  group_code: z.string({
    required_error: "This field cant be null",
  }),
  data: z.array(
    z.object({
      brand_name: z.string({
        required_error: "This field cant be null",
      }),
      group_name: z.string({
        required_error: "This field cant be null",
      }),
      group_code: z.string({
        required_error: "This field cant be null",
      }),
      color_name: z.string({
        required_error: "This field cant be null",
      }),
    })
  ),
});
export const groupPricingDeleteInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  group_name: z.string({
    required_error: "This field cant be null",
  }),
  group_code: z.string({
    required_error: "This field cant be null",
  }),
});
export const orderableColorInput = z.object({
  list_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const orderableColorListDetailsInput = z.object({
  list_name: z.string({
    required_error: "This field cant be null",
  }),
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const orderableColorListWiseDetailsInput = z.object({
  list_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const orderableColorListWiseEditInput = z.object({
  list_name: z.string({
    required_error: "This field cant be null",
  }),
  data: z.array(
    z.object({
      list_name: z.string({
        required_error: "This field cant be null",
      }),
      brand_name: z.string({
        required_error: "This field cant be null",
      }),
      color_name: z.string({
        required_error: "This field cant be null",
      }),
    })
  ),
});
export const orderableColorListWiseDeleteInput = z.object({
  list_name: z.string({
    required_error: "This field cant be null",
  }),
});

export const priceListNameInput = z.object({
  price_list_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const priceListNameEditInput = z.object({
  existing_price_list_name: z.string({
    required_error: "This field cant be null",
  }),
  new_price_list_name: z.string({
    required_error: "This field cant be null",
  }),
});

export const salesRepresentativeInput = z.object({
  name: z.string({
    required_error: "This field cant be null",
  }),
  phone: z.number({
    required_error: "This field cant be null",
  }),
  company: z.string({
    required_error: "This field cant be null",
  }),
  orderable_unit: z.string({
    required_error: "This field cant be null",
  }),
  orderable_color: z.string({
    required_error: "This field cant be null",
  }),
});
export const salesRepresentativeEditInput = z.object({
  name: z.string({
    required_error: "This field cant be null",
  }),
  existingPhone: z.string({
    required_error: "This field cant be null",
  }),
  newPhone: z.string({
    required_error: "This field cant be null",
  }),
  company: z.string({
    required_error: "This field cant be null",
  }),
  orderable_unit: z.string({
    required_error: "This field cant be null",
  }),
  orderable_color: z.string({
    required_error: "This field cant be null",
  }),
  orderableLocation: z.array(z.string()),
  acessLocation: z.array(z.string()),
});
export const salesRepresentativeDeleteInput = z.object({
  phone: z.string({
    required_error: "This field cant be null",
  }),
});
export const interComapnyInput = z.object({
  name: z.string({
    required_error: "This field cant be null",
  }),
  address: z.string({
    required_error: "This field cant be null",
  }),
  bill: z.string({
    required_error: "This field cant be null",
  }),
  city: z.string({
    required_error: "This field cant be null",
  }),
  gst: z.string({
    required_error: "This field cant be null",
  }),
  phone: z.number({
    required_error: "This field cant be null",
  }),
  pin: z.number({
    required_error: "This field cant be null",
  }),
  type: z.string({
    required_error: "This field cant be null",
  }),
  price_list_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const interComapnyEditInput = z.object({
  newName: z.string({
    required_error: "This field cant be null",
  }),
  existingName: z.string({
    required_error: "This field cant be null",
  }),
  gst: z.string({
    required_error: "This field cant be null",
  }),
  address: z.string({
    required_error: "This field cant be null",
  }),
  bill: z.string({
    required_error: "This field cant be null",
  }),
  city: z.string({
    required_error: "This field cant be null",
  }),
  phone: z.number({
    required_error: "This field cant be null",
  }),
  pin: z.number({
    required_error: "This field cant be null",
  }),
  type: z.string({
    required_error: "This field cant be null",
  }),
  price_list_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const interComapnyDeleteInput = z.object({
  name: z.string({
    required_error: "This field cant be null",
  }),
});

export const pricingSingleEditInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  packaging: z.string({
    required_error: "This field cant be null",
  }),
  group_name: z.string({
    required_error: "This field cant be null",
  }),
  list_name: z.string({
    required_error: "This field cant be null",
  }),
  price: z.number({
    required_error: "This field cant be null",
  }),
});

export const pricingSingleDeleteInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  packaging: z.string({
    required_error: "This field cant be null",
  }),
  group_name: z.string({
    required_error: "This field cant be null",
  }),
  list_name: z.string({
    required_error: "This field cant be null",
  }),
});

export const pricingByGroupFindInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  group_name: z.string({
    required_error: "This field cant be null",
  }),
  list_name: z.string({
    required_error: "This field cant be null",
  }),
});

export const pricingByGroupEditInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  group_name: z.string({
    required_error: "This field cant be null",
  }),
  list_name: z.string({
    required_error: "This field cant be null",
  }),
  data: z.array(
    z.object({
      brand_name: z.string({
        required_error: "This field cant be null",
      }),
      packaging: z.string({
        required_error: "This field cant be null",
      }),
      group_name: z.string({
        required_error: "This field cant be null",
      }),
      list_name: z.string({
        required_error: "This field cant be null",
      }),
      price: z.number({
        required_error: "This field cant be null",
      }),
    })
  ),
});

export const StockFilterInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  location: z.string({
    required_error: "This field cant be null",
  }),
  color_name: z.string({
    required_error: "This field cant be null",
  }),
});

export const StockInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  location: z.string({
    required_error: "This field cant be null",
  }),
  color_name: z.string({
    required_error: "This field cant be null",
  }),
  data: z.array(
    z.object({
      brand_name: z.string({
        required_error: "This field cant be null",
      }),
      packaging: z.string({
        required_error: "This field cant be null",
      }),
      location: z.string({
        required_error: "This field cant be null",
      }),
      color_name: z.string({
        required_error: "This field cant be null",
      }),
      current_stock: z.number({
        required_error: "This field cant be null",
      }),
    })
  ),
});
export const StockLedgerInput = z.array(
  z.object({
    brand_name: z.string({
      required_error: "This field cant be null",
    }),
    color_name: z.string({
      required_error: "This field cant be null",
    }),
    client_name: z.string(),
    packaging: z.string({
      required_error: "This field cant be null",
    }),
    notes: z.string(),
    location: z.string({
      required_error: "This field cant be null",
    }),
    date: z.string({
      required_error: "This field cant be null",
    }),
    open_stock: z.number(),
    added: z.number(),
    closing: z.number(),
    executed: z.number(),
  })
);
export const StockLedgerDeleteInput = z.object({
  id: z.bigint({
    required_error: "This field cant be null",
  }),
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  color_name: z.string({
    required_error: "This field cant be null",
  }),
  packaging: z.string({
    required_error: "This field cant be null",
  }),
  location: z.string({
    required_error: "This field cant be null",
  }),
  added: z.number({
    required_error: "This field cant be null",
  }),
});

export const ClientInput = z.object({
  type: z.string({
    required_error: "This field cant be null",
  }),
  legal_name: z.string({
    required_error: "This field cant be null",
  }),
  unique_name: z.string({
    required_error: "This field cant be null",
  }),
  distributor: z.string(),
  sales_representative: z.string({
    required_error: "This field cant be null",
  }),
  sales_supervisor: z.array(
    z.object({
      name: z.string(),
      phone: z.string(),
    })
  ),
  secondary_company: z.array(z.string()),
  code: z.string({
    required_error: "This field cant be null",
  }),
  pin_code: z.number({
    required_error: "This field cant be null",
  }),
  gst: z.string({
    required_error: "This field cant be null",
  }),
  trade_license: z.string({
    required_error: "This field cant be null",
  }),
  address: z.string({
    required_error: "This field cant be null",
  }),
  legal_address: z.string({
    required_error: "This field cant be null",
  }),
  state: z.string({
    required_error: "This field cant be null",
  }),
  district: z.string({
    required_error: "This field cant be null",
  }),
  phone_primary: z.number({
    required_error: "This field cant be null",
  }),
  phone_secondary: z.number(),
  email: z.string({
    required_error: "This field cant be null",
  }),
  is_cheque: z.boolean({
    required_error: "This field cant be null",
  }),
  in_india: z.boolean({
    required_error: "This field cant be null",
  }),
  is_active: z.boolean({
    required_error: "This field cant be null",
  }),
  price_list_name: z.string({
    required_error: "This field cant be null",
  }),
  primary_company: z.string({
    required_error: "This field cant be null",
  }),
  gst_validity: z.string({
    required_error: "This field cant be null",
  }),
  max_credit_days: z.string({
    required_error: "This field cant be null",
  }),
  max_credit_amount: z.string({
    required_error: "This field cant be null",
  }),
  account: z.string(),
  ifsc: z.string(),
  bank_branch: z.string(),
  sales_representative_phone: z.string({
    required_error: "This field cant be null",
  }),
});
export const ClientEditInput = z.object({
  type: z.string({
    required_error: "This field cant be null",
  }),
  existing_type: z.string({
    required_error: "This field cant be null",
  }),
  legal_name: z.string({
    required_error: "This field cant be null",
  }),
  unique_name: z.string({
    required_error: "This field cant be null",
  }),
  existing_unique_name: z.string({
    required_error: "This field cant be null",
  }),
  distributor: z.string(),
  sales_representative: z.string({
    required_error: "This field cant be null",
  }),
  sales_representative_phone: z.string({
    required_error: "This field cant be null",
  }),
  code: z.string({
    required_error: "This field cant be null",
  }),
  pin_code: z.number({
    required_error: "This field cant be null",
  }),
  gst: z.string({
    required_error: "This field cant be null",
  }),
  trade_license: z.string({
    required_error: "This field cant be null",
  }),
  address: z.string({
    required_error: "This field cant be null",
  }),
  legal_address: z.string({
    required_error: "This field cant be null",
  }),
  state: z.string({
    required_error: "This field cant be null",
  }),
  district: z.string({
    required_error: "This field cant be null",
  }),
  phone_primary: z.number({
    required_error: "This field cant be null",
  }),
  phone_secondary: z.number(),
  email: z.string({
    required_error: "This field cant be null",
  }),
  is_cheque: z.boolean({
    required_error: "This field cant be null",
  }),
  account: z.string(),
  ifsc: z.string(),
  bank_branch: z.string(),
  in_india: z.boolean({
    required_error: "This field cant be null",
  }),
  is_active: z.boolean({
    required_error: "This field cant be null",
  }),
  price_list_name: z.string({
    required_error: "This field cant be null",
  }),
  primary_company: z.string({
    required_error: "This field cant be null",
  }),
  gst_validity: z.string(),
  max_credit_days: z.string({
    required_error: "This field cant be null",
  }),
  max_credit_amount: z.string({
    required_error: "This field cant be null",
  }),
  sales_supervisor: z.array(
    z.object({
      name: z.string(),
      phone: z.string(),
    })
  ),
  secondary_company: z.array(z.string()),
});
export const ClientDeleteInput = z.object({
  unique_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const OrderInput = z.object({
  id: z.string({
    required_error: "This field cant be null",
  }),
  client_name: z.string({
    required_error: "This field cant be null",
  }),
  client_type: z.string({
    required_error: "This field cant be null",
  }),
  salesman_name: z.string({
    required_error: "This field cant be null",
  }),
  salesman_phone: z.string({
    required_error: "This field cant be null",
  }),
  location: z.string({
    required_error: "This field cant be null",
  }),
  date: z.string({
    required_error: "This field cant be null",
  }),
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  color_name: z.string({
    required_error: "This field cant be null",
  }),
  packaging_type: z.string({
    required_error: "This field cant be null",
  }),
  total_qty: z.string({
    required_error: "This field cant be null",
  }),
  amount: z.number(),
  notes: z.string(),
  company: z.string({ required_error: "This field cant be null" }),
});

export const userInput = z.object({
  id: z.string({
    required_error: "This field cant be null",
  }),
  type: z.string({
    required_error: "This field cant be null",
  }),
  name: z.string({
    required_error: "This field cant be null",
  }),
  phone: z.number({
    required_error: "This field cant be null",
  }),
  email: z.string({
    required_error: "This field cant be null",
  }),
  self_data: z.boolean({
    required_error: "This field cant be null",
  }),
  password: z.string({
    required_error: "This field cant be null",
  }),
  confirm_password: z.string({
    required_error: "This field cant be null",
  }),
  orderableLocation: z.array(z.string()),
  acessLocation: z.array(z.string()),
  company: z.string({
    required_error: "This field cant be null",
  }),
  orderable_color_list: z.string({
    required_error: "This field cant be null",
  }),
  orderable_unit_list: z.string({
    required_error: "This field cant be null",
  }),
});
export const stateInput = z.object({
  location: z.string({
    required_error: "This field cant be null",
  }),
});
export const stateEditInput = z.object({
  newLocation: z.string({
    required_error: "This field cant be null",
  }),
  existingLocation: z.string({
    required_error: "This field cant be null",
  }),
});
export const districtInput = z.object({
  state: z.string({
    required_error: "This field cant be null",
  }),
  district: z.string({
    required_error: "This field cant be null",
  }),
});
export const districtEditInput = z.object({
  newState: z.string({
    required_error: "This field cant be null",
  }),
  newDistrict: z.string({
    required_error: "This field cant be null",
  }),
  existingState: z.string({
    required_error: "This field cant be null",
  }),
  existingDistrict: z.string({
    required_error: "This field cant be null",
  }),
});
