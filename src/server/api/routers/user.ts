import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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
  by_email: protectedProcedure
    .input(inputSchema)
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.id,
        },
      });
      await ctx.db.$disconnect();
      return user;
    }),
  create: protectedProcedure
    .input(userInput)
    .mutation(async ({ ctx, input }) => {
      const orderableLocation: {
        name: string;
        phone: string;
        location: string;
      }[] = [];
      const acessLocationArray: {
        name: string;
        phone: string;
        location: string;
      }[] = [];
      input.orderableLocation.forEach((element) => {
        const obj = {
          name: input.name,
          phone: input.phone.toString(),
          location: element,
        };
        orderableLocation.push(obj);
      });
      input.acessLocation.forEach((element) => {
        const obj = {
          name: input.name,
          phone: input.phone.toString(),
          location: element,
        };
        acessLocationArray.push(obj);
      });
      try {
        await ctx.db.user.create({
          data: {
            email: input.email,
            id: input.id,
            name: input.name,
            password: input.password,
            phone: input.phone,
            user_type: input.type,
          },
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new Error(
            `An user with similar userid or phone number or email already exists `
          );
        }
      }
      if (input.type === "Salesman") {
        await ctx.db.salesman.create({
          data: {
            name: input.name,
            phone: input.phone.toString(),
            company: input.company,
            orderable_color: input.orderable_color_list,
            orderable_unit: input.orderable_unit_list,
            self_data: input.self_data,
          },
        });
      }
      await ctx.db.userOrderableLocation.createMany({
        data: orderableLocation,
      });
      await ctx.db.userAcessLocation.createMany({
        data: acessLocationArray,
      });
    }),
});
