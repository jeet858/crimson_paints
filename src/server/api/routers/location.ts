import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const locationRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.state.findMany();
    await ctx.db.$disconnect();
    return units.map(({ location }) => ({
      location,
    }));
  }),
  all_district: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.district.findMany();
    await ctx.db.$disconnect();
    return units.map(({ district, state }) => ({
      district,
      state,
    }));
  }),
});
