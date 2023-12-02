import { z } from "zod";
import {
  basicUnitsDeleteInput,
  basicUnitsEditInput,
  basicUnitsInput,
  orderableColorInput,
  orderableColorListDetailsInput,
  orderableColorListWiseDeleteInput,
  orderableColorListWiseDetailsInput,
  orderableColorListWiseEditInput,
  orderableUniBrandPackagingInput,
  orderableUnitInput,
  orderableUnitListDetailsEditInput,
  orderableUnitListDetailsInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const orderableColorRouter = createTRPCRouter({
  create: protectedProcedure
    .input(orderableColorInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.oderableColors.create({
        data: { list_name: input.list_name },
      });
    }),
  all_list: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.oderableColors.findMany();
    await ctx.db.$disconnect();
    return units.map(({ list_name }) => ({
      list_name,
    }));
  }),
  all_list_details: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.oderableColorsDetails.findMany();
    await ctx.db.$disconnect();
    return units.map(({ brand_name, color_name, list_name }) => ({
      brand_name,
      color_name,
      list_name,
    }));
  }),
  list_details: protectedProcedure
    .input(orderableColorListDetailsInput)
    .query(async ({ ctx, input }) => {
      const details = await ctx.db.oderableColorsDetails.findMany({
        where: {
          list_name: input.list_name,
          brand_name: input.brand_name,
        },
      });
      await ctx.db.$disconnect();
      return details.map(({ brand_name, color_name, list_name }) => ({
        brand_name,
        color_name,
        list_name,
      }));
    }),
  list_name_wise_detaiils: protectedProcedure
    .input(orderableColorListWiseDetailsInput)
    .query(async ({ ctx, input }) => {
      const details = await ctx.db.oderableColorsDetails.findMany({
        where: {
          list_name: input.list_name,
        },
      });
      await ctx.db.$disconnect();
      return details.map(({ brand_name, color_name, list_name }) => ({
        brand_name,
        color_name,
        list_name,
      }));
    }),
  edit: protectedProcedure
    .input(orderableColorListWiseEditInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.oderableColorsDetails.deleteMany({
        where: {
          list_name: input.list_name,
        },
      });
      return await ctx.db.oderableColorsDetails.createMany({
        data: input.data,
      });
    }),
  delete: protectedProcedure
    .input(orderableColorListWiseDeleteInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.oderableColors.deleteMany({
        where: {
          list_name: input.list_name,
        },
      });
      return await ctx.db.oderableColorsDetails.deleteMany({
        where: {
          list_name: input.list_name,
        },
      });
    }),
});
