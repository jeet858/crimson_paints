import { z } from "zod";
import {
  complexUnitDeleteInput,
  complexUnitEditInput,
  complexUnitInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const complexUnitRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const complexUnit = await ctx.db.complexPackagingUnits.findMany({
      orderBy: [{ name: "asc" }],
    });
    return complexUnit.map(({ name, packaging, unit, unit_packaging }) => ({
      name,
      packaging,
      unit,
      unit_packaging,
    }));
  }),
  create: protectedProcedure
    .input(complexUnitInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.complexPackagingUnits.create({
        data: {
          name: `${input.packaging} of (${input.unit_packaging} X ${input.unit})`,
          packaging: input.packaging,
          unit: input.unit,
          unit_packaging: input.unit_packaging,
        },
      });
    }),
  edit: protectedProcedure
    .input(complexUnitEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.complexPackagingUnits.update({
        where: { name: input.existingName },
        data: {
          name: `${input.packaging} of (${input.unit_packaging} X ${input.unit})`,
          packaging: input.packaging,
          unit: input.unit,
          unit_packaging: input.unit_packaging,
        },
      });
    }),
  delete: protectedProcedure
    .input(complexUnitDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.complexPackagingUnits.delete({
        where: {
          name: input.name,
        },
      });
    }),
});
