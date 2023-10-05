import { z } from "zod";
import { basicUnitsEditInput, basicUnitsInput } from "../../../types";
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
    return units.map(({ name, symbol, short_code }) => ({
      name,
      symbol,
      short_code,
    }));
  }),
  where: protectedProcedure.input(inputSchema).query(async ({ input, ctx }) => {
    const basicUnits = await ctx.db.basicUnits.findUnique({
      where: {
        name: input,
      },
    });
    return basicUnits;
  }),
  edit: protectedProcedure
    .input(basicUnitsEditInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.basicUnits.update({
        where: { name: input.existingName },
        data: {
          name: input.newName,
          symbol: input.symbol,
        },
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
