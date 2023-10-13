import { z } from "zod";
import {
  basicUnitsDeleteInput,
  basicUnitsEditInput,
  basicUnitsInput,
  brandPackagingDeleteInput,
  brandPackagingInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { api } from "~/utils/api";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const brandPackagingRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.brandPackagingType.findMany();
    await ctx.db.$disconnect();
    return units.map(({ brand_name, packaging }) => ({
      brand_name,
      packaging,
    }));
  }),
  where_brand_name: protectedProcedure
    .input(inputSchema)
    .query(async ({ input, ctx }) => {
      const brand = await ctx.db.brandPackagingType.findMany({
        where: {
          brand_name: input,
        },
      });
      return brand;
    }),
  edit: protectedProcedure
    .input(brandPackagingInput)
    .mutation(async ({ ctx, input }) => {
      // try {
      //   return await ctx.db.brandPackagingType.create({
      //     data: {
      //       brand_name: input.brand_name,
      //       packaging: input.packaging_array,
      //     },
      //   });
      // } catch (e) {}
      const data = input.packaging_array.map((item) => {
        return {
          brand_name: input.brand_name,
          packaging: item,
        };
      });
      await ctx.db.brandPackagingType.deleteMany({
        where: {
          brand_name: input.brand_name,
        },
      });
      return await ctx.db.brandPackagingType.createMany({
        data: data,
      });
    }),
  delete: protectedProcedure
    .input(brandPackagingDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.brand.deleteMany({
        where: {
          brand_name: input.brand_name,
        },
      });
    }),
});
