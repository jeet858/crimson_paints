import { z } from "zod";
import {
  basicUnitsDeleteInput,
  basicUnitsEditInput,
  basicUnitsInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const basicUnitsRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.basicUnits.findMany();
    await ctx.db.$disconnect();
    return units.map(({ name, symbol }) => ({
      name,
      symbol,
    }));
  }),
  where: protectedProcedure.input(inputSchema).query(async ({ input, ctx }) => {
    const basicUnits = await ctx.db.basicUnits.findUnique({
      where: {
        name: input,
      },
    });
    await ctx.db.$disconnect();
    return basicUnits;
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
    .input(basicUnitsDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.basicUnits.delete({
        where: { name: input.name },
      });
    }),
  create: protectedProcedure
    .input(basicUnitsInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.basicUnits.create({
        data: { name: input.name, symbol: input.symbol },
      });
    }),
});
