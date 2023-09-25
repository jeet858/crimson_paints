import { z } from "zod";
import { basicUnitsInput } from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const brandRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const brands = await ctx.db.brand.findMany();
    return brands.map(({ brand_name, categoriesName, hsnCode_id }) => ({
      brand_name,
      categoriesName,
      hsnCode_id,
    }));
  }),
  where_categories: protectedProcedure
    .input(inputSchema)
    .query(async ({ input, ctx }) => {
      const brands = await ctx.db.brand.findMany({
        where: {
          categoriesName: input,
        },
      });
      return brands.map(({ brand_name, categoriesName, hsnCode_id }) => ({
        brand_name,
        categoriesName,
        hsnCode_id,
      }));
    }),
  // create: protectedProcedure
  //   .input(basicUnitsInput)
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.basic_units.create({
  //       data: {
  //         name: input.name,
  //         symbol: input.symbol,
  //         short_code: input.short_code,
  //       },
  //     });
  //   }),
  // delete: protectedProcedure
  //   .input(basicUnitsInput)
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.basic_units.delete({
  //       where: {
  //         name: input.name,
  //       },
  //     });
  //   }),
});
