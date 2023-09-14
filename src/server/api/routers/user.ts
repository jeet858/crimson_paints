import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import dbConnection from "../db";

export const userRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ id: z.string(), pass: z.string() }))
    .query(async ({ input }) => {
      const result = await dbConnection.query(
        `select * from users where id=${input.id} and password=${input.pass}`
      );
      return {
        result: result[0],
      };
    }),
});
