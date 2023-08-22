import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import dbConnection from "../db";

export const brandRouer = createTRPCRouter({
  return_all: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const result = await dbConnection.query(input.query);
      return {
        result: result[0],
      };
    }),
  return_where: publicProcedure
    .input(z.object({ column: z.string(), value: z.string() }))
    .query(async ({ input }) => {
      const result = await dbConnection.query(
        `select * from brand where ${input.column} = ${input.value}`
      );
      return {
        result: result[0],
      };
    }),
});
