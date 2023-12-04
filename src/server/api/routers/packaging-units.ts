import { z } from "zod";
import {
  basicUnitsInput,
  packagingUnitDeleteInput,
  packagingUnitEditInput,
  packagingUnitInput,
} from "../../../types";
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
  create: protectedProcedure
    .input(packagingUnitInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.packagingUnits.create({
        data: {
          name: input.name,
          packaging: input.packaging,
          unit: input.unit,
          unit_value: input.unit_value,
        },
      });
    }),
  edit: protectedProcedure
    .input(packagingUnitEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.packagingUnits.update({
        where: { name: input.existingName },
        data: {
          name: `${input.unit_value} ${input.unit} ${input.packaging}`,
          packaging: input.packaging,
          unit: input.unit,
          unit_value: input.unit_value,
        },
      });
    }),
  delete: protectedProcedure
    .input(packagingUnitDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.packagingUnits.delete({
        where: {
          name: input.name,
        },
      });
    }),
});
