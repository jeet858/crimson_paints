import { packagingTypeInput } from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const packagingTypeRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.packaging_type.findMany({
      orderBy: [{ name: "asc" }],
    });
    return units.map(({ name, short_code }) => ({
      name,
      short_code,
    }));
  }),
  // create: protectedProcedure
  //   .input(packagingTypeInput)
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.packaging_type.create({
  //       data: {
  //         name: input.name,
  //         short_code: input.short_code,
  //       },
  //     });
  //   }),
  // delete: protectedProcedure
  //   .input(packagingTypeInput)
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.basic_units.delete({
  //       where: {
  //         name: input.name,
  //       },
  //     });
  //   }),
});
