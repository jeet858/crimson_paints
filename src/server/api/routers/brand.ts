import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import dbconnnection from "../db";
export const brandRouter = createTRPCRouter({
  brandAll: publicProcedure
    .input(z.object({ method: z.string(), query: z.string() }))
    .query(async ({ input }) => {
      if (input.method === "GET") {
        try {
          const results: any = await dbconnnection.query(input.query);
          return { results: results[0] };
        } catch (e: any) {
          console.log(e);
          return { Error: e.message };
        }
      }
      return {
        method: `Hello ${input.method}`,
        query: `Here is the query ${input.query}`,
      };
    }),
});
