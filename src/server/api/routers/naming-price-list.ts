import { z } from "zod";
import {
  basicUnitsDeleteInput,
  basicUnitsEditInput,
  basicUnitsInput,
  priceListNameEditInput,
  priceListNameInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const namingPriceListRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const names = await ctx.db.priceListName.findMany();
    await ctx.db.$disconnect();
    return names.map(({ price_list_name }) => ({
      price_list_name,
    }));
  }),
  edit: protectedProcedure
    .input(priceListNameEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.priceListName.update({
        where: { price_list_name: input.existing_price_list_name },
        data: {
          price_list_name: input.new_price_list_name,
        },
      });
    }),
  delete: protectedProcedure
    .input(priceListNameInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.priceListName.delete({
        where: { price_list_name: input.price_list_name },
      });
    }),
  create: protectedProcedure
    .input(priceListNameInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.priceListName.create({
        data: { price_list_name: input.price_list_name },
      });
    }),
});
