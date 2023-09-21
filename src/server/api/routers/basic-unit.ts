import { z } from "zod";
import { basicUnitsInput } from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const basicUnitsRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.basic_units.findMany();
    return units.map(({ name, symbol, short_code }) => ({
      name,
      symbol,
      short_code,
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
