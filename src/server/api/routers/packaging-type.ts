import { packagingTypeInput } from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const packagingTypeRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const packagingType = await ctx.db.packagingType.findMany({
      orderBy: [{ name: "asc" }],
    });
    return packagingType.map(({ name }) => ({
      name,
    }));
  }),
  create: protectedProcedure
    .input(packagingTypeInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.packagingType.create({
        data: {
          name: input.name,
        },
      });
    }),
  delete: protectedProcedure
    .input(packagingTypeInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.packagingType.delete({
        where: {
          name: input.name,
        },
      });
    }),
});
