import { z } from "zod";
import {
  basicUnitsDeleteInput,
  basicUnitsEditInput,
  basicUnitsInput,
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
export const orderableUnitRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.oderableUnits.findMany();
    await ctx.db.$disconnect();
    return units.map(({ list_name }) => ({
      list_name,
    }));
  }),
  list_details: protectedProcedure
    .input(orderableUnitListDetailsInput)
    .query(async ({ ctx, input }) => {
      const details = await ctx.db.oderableUnitsDetails.findMany({
        where: {
          list_name: input.list_name,
        },
      });
      await ctx.db.$disconnect();
      return details.map(({ brand_name, packaging, list_name }) => ({
        brand_name,
        packaging,
        list_name,
      }));
    }),
  brand_packaging: protectedProcedure
    .input(orderableUniBrandPackagingInput)
    .query(async ({ ctx, input }) => {
      const details = await ctx.db.oderableUnitsDetails.findMany({
        where: {
          AND: {
            brand_name: input.brand_name,
            list_name: input.list_name,
          },
        },
      });
      await ctx.db.$disconnect();
      return details.map(({ brand_name, packaging, list_name }) => ({
        brand_name,
        packaging,
        list_name,
      }));
    }),
  edit: protectedProcedure
    .input(basicUnitsEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.basicUnits.update({
        where: { name: input.existingName },
        data: {
          name: input.newName,
          symbol: input.symbol,
        },
      });
    }),
  delete: protectedProcedure
    .input(orderableUnitInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.oderableUnits.delete({
        where: { list_name: input.list_name },
      });
      return await ctx.db.oderableUnitsDetails.deleteMany({
        where: {
          list_name: input.list_name,
        },
      });
    }),
  create: protectedProcedure
    .input(orderableUnitInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.oderableUnits.create({
        data: { list_name: input.list_name },
      });
    }),
  update_list_details: protectedProcedure
    .input(orderableUnitListDetailsEditInput)
    .mutation(async ({ ctx, input }) => {
      const data = input.data.map((item) => {
        return {
          list_name: item.list_name,
          packaging: item.packaging,
          brand_name: item.brand_name,
        };
      });
      await ctx.db.oderableUnitsDetails.deleteMany({
        where: {
          list_name: input.list_name,
        },
      });
      return await ctx.db.oderableUnitsDetails.createMany({
        data: data,
      });
    }),
});
