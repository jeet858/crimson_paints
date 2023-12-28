import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  StockFilterInput,
  StockInput,
  StockLedgerDeleteInput,
  StockLedgerInput,
} from "~/types";

export const stockRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.stock.findMany();
    await ctx.db.$disconnect();
    return units.map(
      ({ brand_name, color_name, current_stock, packaging, branch }) => ({
        brand_name,
        color_name,
        current_stock,
        packaging,
        branch,
      })
    );
  }),
  stock_ledger_all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.stockLedger.findMany();
    await ctx.db.$disconnect();
    return units.map(
      ({
        brand_name,
        color_name,
        packaging,
        location,
        added,
        client_name,
        closing,
        date,
        executed,
        id,
        notes,
        open_stock,
      }) => ({
        brand_name,
        color_name,
        packaging,
        location,
        added,
        client_name,
        closing,
        date,
        executed,
        id,
        notes,
        open_stock,
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
            branch: input.location,
          },
        },
      });
      await ctx.db.$disconnect();
      return units.map(
        ({ brand_name, color_name, current_stock, packaging, branch }) => ({
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
            branch: input.location,
          },
        },
      });
      return await ctx.db.stock.createMany({
        data: input.data,
      });
    }),
  stock_ledger_create: protectedProcedure
    .input(StockLedgerInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.stockLedger.createMany({
        data: input,
      });
    }),
  stock_ledger_delete: protectedProcedure
    .input(StockLedgerDeleteInput)
    .mutation(async ({ ctx, input }) => {
      const stockData = await ctx.db.stock.findUnique({
        where: {
          brand_name_color_name_packaging_branch: {
            brand_name: input.brand_name,
            color_name: input.color_name,
            branch: input.location,
            packaging: input.packaging,
          },
        },
      });
      await ctx.db.stock.update({
        where: {
          brand_name_color_name_packaging_branch: {
            brand_name: input.brand_name,
            color_name: input.color_name,
            branch: input.location,
            packaging: input.packaging,
          },
        },
        data: {
          brand_name: input.brand_name,
          color_name: input.color_name,
          branch: input.location,
          packaging: input.packaging,
          current_stock: stockData ? stockData.current_stock - input.added : 0,
        },
      });
      return await ctx.db.stockLedger.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
