import {
  colorsDeleteInput,
  colorsEditInput,
  colorsInput,
  packagingTypeInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const colorsTypeRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const colors = await ctx.db.colors.findMany({
      orderBy: [{ color_name: "asc" }],
    });
    await ctx.db.$disconnect();
    return colors.map(({ color_name, rgb_code }) => ({
      color_name,
      rgb_code,
    }));
  }),
  edit: protectedProcedure
    .input(colorsEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.colors.update({
        where: { color_name: input.existingName },
        data: {
          color_name: input.newName,
          rgb_code: input.rgb_code,
        },
      });
    }),
  delete: protectedProcedure
    .input(colorsDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.colors.delete({
        where: { color_name: input.color_name },
      });
    }),
  create: protectedProcedure
    .input(colorsInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.colors.create({
        data: { color_name: input.color_name, rgb_code: input.rgb_code },
      });
    }),
});
