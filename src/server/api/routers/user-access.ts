import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userAcessRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userAccess = await ctx.db.userAccess.findMany();
    await ctx.db.$disconnect();
    return userAccess;
  }),
});
