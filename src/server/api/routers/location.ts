import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const locationRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.location.findMany();
    await ctx.db.$disconnect();
    return units.map(({ location }) => ({
      location,
    }));
  }),
});
