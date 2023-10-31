import { z } from "zod";
import {
  basicUnitsDeleteInput,
  basicUnitsEditInput,
  basicUnitsInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const pricingRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.pricing.findMany();
    await ctx.db.$disconnect();
    return units.map(
      ({ brand_name, group_name, list_name, packaging, price }) => ({
        brand_name,
        group_name,
        list_name,
        packaging,
        price,
      })
    );
  }),
});
