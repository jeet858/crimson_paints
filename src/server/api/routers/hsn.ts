import { z } from "zod";
import { basicUnitsInput } from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const hsnCodeRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const hsn = await ctx.db.hsnCode.findMany();
    return hsn.map(({ code, description }) => ({
      code,
      description,
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
