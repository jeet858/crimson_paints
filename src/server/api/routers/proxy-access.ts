import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const proxyAccessRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const proxy = await ctx.db.proxyAccess.findMany();
    await ctx.db.$disconnect();
    return proxy;
  }),
});
