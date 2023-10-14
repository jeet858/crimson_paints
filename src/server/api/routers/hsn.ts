import { z } from "zod";
import {
  basicUnitsInput,
  hsnCodeDeleteInput,
  hsnCodeEditInput,
  hsnCodeInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const hsnCodeRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const hsn = await ctx.db.hsnCode.findMany();
    await ctx.db.$disconnect();
    return hsn.map(({ code, description }) => ({
      code,
      description,
    }));
  }),
  edit: protectedProcedure
    .input(hsnCodeEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.hsnCode.update({
        where: { code: input.existingCode },
        data: {
          code: input.newCode,
          description: input.description,
        },
      });
    }),
  delete: protectedProcedure
    .input(hsnCodeDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.hsnCode.delete({
        where: { code: input.code },
      });
    }),
  create: protectedProcedure
    .input(hsnCodeInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.hsnCode.create({
        data: { code: input.code, description: input.description },
      });
    }),
});
