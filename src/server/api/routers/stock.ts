import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { StockFilterInput, StockInput } from "~/types";

export const stockRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.stock.findMany();
    await ctx.db.$disconnect();
    return units.map(
      ({ brand_name, color_name, current_stock, packaging, location }) => ({
        brand_name,
        color_name,
        current_stock,
        packaging,
        location,
      })
    );
  }),
  stock_filter: protectedProcedure
    .input(StockFilterInput)
    .query(async ({ ctx, input }) => {
      const units = await ctx.db.stock.findMany({
        where: {
          AND: {
            brand_name: input.brand_name,
            color_name: input.color_name,
            location: input.location,
          },
        },
      });
      await ctx.db.$disconnect();
      return units.map(
        ({ brand_name, color_name, current_stock, packaging, location }) => ({
          brand_name,
          color_name,
          current_stock,
          packaging,
          location,
        })
      );
    }),
  stock_edit: protectedProcedure
    .input(StockInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.stock.deleteMany({
        where: {
          AND: {
            brand_name: input.brand_name,
            color_name: input.color_name,
            location: input.location,
          },
        },
      });
      return await ctx.db.stock.createMany({
        data: input.data,
      });
    }),
});
