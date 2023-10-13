import { z } from "zod";
import {
  basicUnitsDeleteInput,
  basicUnitsEditInput,
  basicUnitsInput,
  brandPackagingInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { api } from "~/utils/api";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const brandPackagingRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.brandPackagingType.findMany();
    await ctx.db.$disconnect();
    return units.map(({ brand_name, packaging }) => ({
      brand_name,
      packaging,
    }));
  }),
  where_brand_name: protectedProcedure
    .input(inputSchema)
    .query(async ({ input, ctx }) => {
      const brand = await ctx.db.brandPackagingType.findMany({
        where: {
          brand_name: input,
        },
      });
      await ctx.db.$disconnect();
      return brand;
    }),
});
