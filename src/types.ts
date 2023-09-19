import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allBasicUnitOutput = RouterOutputs["basicUnit"]["all"];
type allPackagingTypeOutput = RouterOutputs["packagingType"]["all"];

export type basicUnit = allBasicUnitOutput[number];
export type packagingType = allPackagingTypeOutput[number];

export const basicUnitsInput = z.object({
  name: z.string({
    required_error: "Describe your basic units name",
  }),
  symbol: z.string({
    required_error: "Describe your basic units symbol",
  }),
  short_code: z.string({
    required_error: "Describe your basic units short name",
  }),
});

export const packagingTypeInput = z.object({
  name: z.string({
    required_error: "Describe your basic units name",
  }),
  short_code: z.string({
    required_error: "Describe your basic units short name",
  }),
});
