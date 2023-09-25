import { z } from "zod";
import { basicUnitsInput } from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.categories.findMany();
    return categories.map(({ name, code }) => ({
      name,
      code,
    }));
  }),
  with_brand: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.categories.findMany({
      where: {
        brand: {
          some: {},
        },
      },
    });
    return categories.map(({ name, code }) => ({
      name,
      code,
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
