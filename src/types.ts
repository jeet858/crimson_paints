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

export const colorsInput = z.object({
  color_name: z.string({
    required_error: "This field cant be null",
  }),
  rgb_code: z.string({
    required_error: "This field cant be null",
  }),
});

export const hsnCodeInput = z.object({
  code: z.string({
    required_error: "This field cant be null",
  }),
  description: z.string(),
});

export const categoriesInput = z.object({
  name: z.string({
    required_error: "This field cant be null",
  }),
  code: z.string({
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
  hsnCode_id: z.string({
    required_error: "This field cant be null",
  }),
});
