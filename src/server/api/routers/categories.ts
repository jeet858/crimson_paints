import { z } from "zod";
import {
  basicUnitsInput,
  categoriesDeleteInput,
  categoriesEditInput,
  categoriesInput,
} from "../../../types";
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
    await ctx.db.$disconnect();
    return categories.map(({ name, code }) => ({
      name,
      code,
    }));
  }),
  edit: protectedProcedure
    .input(categoriesEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.categories.update({
        where: { name: input.existingName },
        data: {
          name: input.newName,
          code: input.code,
        },
      });
    }),
  delete: protectedProcedure
    .input(categoriesDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.categories.delete({
        where: { name: input.name },
      });
    }),
  create: protectedProcedure
    .input(categoriesInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.categories.create({
        data: { code: input.code, name: input.name },
      });
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
