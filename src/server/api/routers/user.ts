import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { userInput } from "~/types";
const inputSchema = z.object({
  id: z.string({
    required_error: "This is a required field",
  }),
});
export const userRouter = createTRPCRouter({
  by_id: protectedProcedure.input(inputSchema).query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: input.id,
      },
    });
    await ctx.db.$disconnect();
    return user;
  }),
  create: protectedProcedure
    .input(userInput)
    .mutation(async ({ ctx, input }) => {
      const objArray: { name: string; phone: string; location: string }[] = [];
      input.location.forEach((element) => {
        const obj = {
          name: input.name,
          phone: input.phone.toString(),
          location: element,
        };
        objArray.push(obj);
      });
      if (input.type === "Salesman") {
        await ctx.db.salesman.create({
          data: {
            name: input.name,
            phone: input.phone.toString(),
            company: input.company,
          },
        });
      }
      await ctx.db.salesmanLocation.createMany({
        data: objArray,
      });
      return await ctx.db.user.create({
        data: {
          id: input.id,
          name: input.name,
          email: input.email,
          phone: input.phone,
          password: input.password,
          user_type: input.type,
        },
      });
    }),
});
