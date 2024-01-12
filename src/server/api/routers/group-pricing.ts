import { z } from "zod";
import {
  groupInfoInput,
  groupPricingDeleteInput,
  groupPricingEditInput,
  groupPricingInput,
} from "../../../types";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
const groupsInput = z.string({ required_error: "This field cant be null" });
const groupColorInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  group_name: z.string({
    required_error: "This field cant be null",
  }),
  group_code: z.string({
    required_error: "This field cant be null",
  }),
});
const groupColorByBrandInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
});
const groupColorByBrandColorInput = z.object({
  brand_name: z.string({
    required_error: "This field cant be null",
  }),
  color_name: z.string({
    required_error: "This field cant be null",
  }),
});
export const groupPricingTypeRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.groupPricing.findMany();
    await ctx.db.$disconnect();
    return units;
  }),
  create: protectedProcedure
    .input(groupPricingInput)
    .mutation(async ({ ctx, input }) => {
      if (input.data[0]) {
        await ctx.db.groupInfo.create({
          data: {
            brand_name: input.data[0].brand_name,
            group_code: input.data[0].group_code,
            group_name: input.data[0].group_name,
          },
        });
      } else {
        throw Error("Empty input");
      }
      return await ctx.db.groupPricing.createMany({
        data: input.data,
      });
    }),
  create_groupInfo: protectedProcedure
    .input(groupInfoInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.groupInfo.create({
        data: {
          brand_name: input.brand_name,
          group_code: input.group_code,
          group_name: input.group_name,
        },
      });
    }),
  gorups: protectedProcedure
    .input(groupsInput)
    .query(async ({ input, ctx }) => {
      const groups = await ctx.db.groupInfo.findMany({
        where: {
          brand_name: input,
        },
      });
      return groups;
    }),
  groups_all: protectedProcedure.query(async ({ ctx }) => {
    const groups = await ctx.db.groupInfo.findMany();
    await ctx.db.$disconnect();
    return groups;
  }),
  group_colors: protectedProcedure
    .input(groupColorInput)
    .query(async ({ input, ctx }) => {
      const colors = await ctx.db.groupPricing.findMany({
        where: {
          brand_name: input.brand_name,
          group_name: input.group_name,
          group_code: input.group_code,
        },
      });
      return colors;
    }),
  group_colors_edit: protectedProcedure
    .input(groupPricingEditInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.groupPricing.deleteMany({
        where: {
          brand_name: input.brand_name,
          group_code: input.group_code,
          group_name: input.group_name,
        },
      });
      return await ctx.db.groupPricing.createMany({
        data: input.data,
      });
    }),
  group_colors_delete: protectedProcedure
    .input(groupPricingDeleteInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.groupInfo.deleteMany({
        where: {
          brand_name: input.brand_name,
          group_code: input.group_code,
          group_name: input.group_name,
        },
      });
      return await ctx.db.groupPricing.deleteMany({
        where: {
          brand_name: input.brand_name,
          group_code: input.group_code,
          group_name: input.group_name,
        },
      });
    }),
  brand_wise_fetch: protectedProcedure
    .input(groupsInput)
    .query(async ({ input, ctx }) => {
      const groups = await ctx.db.groupPricing.findMany({
        where: {
          brand_name: input,
        },
      });
      return groups;
    }),
  group_colors_by_brand: protectedProcedure
    .input(groupColorByBrandInput)
    .query(async ({ input, ctx }) => {
      const colors = await ctx.db.groupPricing.findMany({
        where: {
          brand_name: input.brand_name,
        },
      });
      return colors;
    }),
  where_by_group_brande: protectedProcedure
    .input(groupColorByBrandColorInput)
    .query(async ({ input, ctx }) => {
      const group = await ctx.db.groupPricing.findUnique({
        where: {
          brand_name_color_name: {
            brand_name: input.brand_name,
            color_name: input.color_name,
          },
        },
      });
      return group;
    }),
});
