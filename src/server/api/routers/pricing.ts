import { z } from "zod";
import {
  pricingByGroupEditInput,
  pricingByGroupFindInput,
  pricingSingleDeleteInput,
  pricingSingleEditInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const pricingRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.pricing.findMany();
    await ctx.db.$disconnect();
    return units.map(
      ({ brand_name, group_name, list_name, packaging, price }) => ({
        brand_name,
        group_name,
        list_name,
        packaging,
        price,
      })
    );
  }),
  single_edit: protectedProcedure
    .input(pricingSingleEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.pricing.upsert({
        where: {
          brand_name_group_name_packaging_list_name: {
            brand_name: input.brand_name,
            group_name: input.group_name,
            packaging: input.packaging,
            list_name: input.list_name,
          },
        },
        update: {
          price: input.price,
        },
        create: {
          brand_name: input.brand_name,
          group_name: input.group_name,
          packaging: input.packaging,
          list_name: input.list_name,
          price: input.price,
        },
      });
    }),
  single_delete: protectedProcedure
    .input(pricingSingleDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.pricing.delete({
        where: {
          brand_name_group_name_packaging_list_name: {
            brand_name: input.brand_name,
            group_name: input.group_name,
            packaging: input.packaging,
            list_name: input.list_name,
          },
        },
      });
    }),
  where_by_group: protectedProcedure
    .input(pricingByGroupFindInput)
    .query(async ({ ctx, input }) => {
      const units = await ctx.db.pricing.findMany({
        where: {
          AND: {
            brand_name: input.brand_name,
            group_name: input.group_name,
            list_name: input.list_name,
          },
        },
      });
      await ctx.db.$disconnect();
      return units.map(
        ({ brand_name, group_name, list_name, packaging, price }) => ({
          brand_name,
          group_name,
          list_name,
          packaging,
          price,
        })
      );
    }),
  update_by_group: protectedProcedure
    .input(pricingByGroupEditInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.pricing.deleteMany({
        where: {
          AND: {
            brand_name: input.brand_name,
            group_name: input.group_name,
            list_name: input.list_name,
          },
        },
      });
      return await ctx.db.pricing.createMany({
        data: input.data,
      });
    }),
});
