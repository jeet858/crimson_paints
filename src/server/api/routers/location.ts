import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  districtEditInput,
  districtInput,
  stateEditInput,
  stateInput,
} from "~/types";

export const locationRouter = createTRPCRouter({
  all_state: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.state.findMany();
    await ctx.db.$disconnect();
    return units.map(({ location }) => ({
      location,
    }));
  }),
  create_state: protectedProcedure
    .input(stateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.state.create({
        data: input,
      });
    }),
  edit_state: protectedProcedure
    .input(stateEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.state.update({
        where: { location: input.existingLocation },
        data: { location: input.newLocation },
      });
    }),
  delete_state: protectedProcedure
    .input(stateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.state.delete({
        where: { location: input.location },
      });
    }),
  all_district: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.district.findMany();
    await ctx.db.$disconnect();
    return units.map(({ district, state }) => ({
      district,
      state,
    }));
  }),
  create_district: protectedProcedure
    .input(districtInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.district.create({
        data: input,
      });
    }),
  edit_district: protectedProcedure
    .input(districtEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.district.update({
        where: {
          state_district: {
            state: input.existingState,
            district: input.existingDistrict,
          },
        },
        data: {
          state: input.newState,
          district: input.newDistrict,
        },
      });
    }),
  delete_district: protectedProcedure
    .input(districtInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.district.delete({
        where: {
          state_district: {
            district: input.district,
            state: input.state,
          },
        },
      });
    }),
});
