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
  all_list_name: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.priceListName.findMany();
    await ctx.db.$disconnect();
    return units.map(({ price_list_name }) => ({
      price_list_name,
    }));
  }),
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
      input.data.forEach((firstData) => {
        if (!firstData.packaging.includes("X")) {
          input.data.forEach((secondtData) => {
            if (
              secondtData.packaging.includes(firstData.packaging) &&
              secondtData.packaging.includes("X") &&
              secondtData.price === 0 //if the price is 0 only then it calculates the complex price
            ) {
              const str = secondtData.packaging.split("X ");
              let modifiedString = str[1]?.replace(/\)/g, "");
              secondtData.price =
                firstData.price * parseInt(modifiedString as string);
            }
          });
        }
      });
      const arr = input.data.filter((obj) => obj.price !== 0);
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
        data: arr,
      });
    }),
});
