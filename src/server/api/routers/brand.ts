import { z } from "zod";
import {
  basicUnitsInput,
  brandDeleteInput,
  brandEditInput,
  brandInput,
} from "../../../types";
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

  create: protectedProcedure
    .input(brandInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.brand.create({
        data: {
          brand_name: input.brand_name,
          categoriesName: input.categoriesName,
          hsnCode_id: input.hsnCode_id,
        },
      });
    }),
  edit: protectedProcedure
    .input(brandEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.brand.update({
        where: { brand_name: input.existingName },
        data: {
          brand_name: input.newName,
          hsnCode_id: input.hsnCode_id,
          categoriesName: input.categoriesName,
        },
      });
    }),
  delete: protectedProcedure
    .input(brandDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.brand.delete({
        where: {
          brand_name: input.brand_name,
        },
      });
    }),
});
