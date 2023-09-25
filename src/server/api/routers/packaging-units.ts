import { z } from "zod";
import { basicUnitsInput } from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const packagingUnitRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const packagingUnit = await ctx.db.packagingUnits.findMany({
      orderBy: [{ unit_value: "asc" }],
    });
    return packagingUnit.map(({ name, packaging, unit, unit_value }) => ({
      name,
      packaging,
      unit,
      unit_value,
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
