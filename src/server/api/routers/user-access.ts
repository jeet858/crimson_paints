import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { userAccessInput } from "~/types";
const inputSchema = z.object({
  user_type: z.string({
    required_error: "This field cant be null",
  }),
  menu_type: z.string({
    required_error: "This field cant be null",
  }),
});
export const userAcessRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userAccess = await ctx.db.userAccess.findMany();
    await ctx.db.$disconnect();
    return userAccess;
  }),
  specific: protectedProcedure
    .input(inputSchema)
    .query(async ({ ctx, input }) => {
      const userAccess = await ctx.db.userAccess.findMany({
        where: {
          user_type: input.user_type,
          menu_type: input.menu_type,
        },
      });
      await ctx.db.$disconnect();
      return userAccess;
    }),
  edit: protectedProcedure
    .input(userAccessInput)
    .mutation(async ({ ctx, input }) => {
      const arr: any = [];
      input.forEach((element) => {
        arr.push(
          ctx.db.userAccess.upsert({
            where: {
              user_type_page_name: {
                page_name: element.page_name,
                user_type: element.user_type,
              },
            },
            create: {
              access: element.access,
              del: element.del,
              edit: element.edit,
              menu_type: element.menu_type,
              page_name: element.page_name,
              user_type: element.user_type,
            },
            update: {
              access: element.access,
              del: element.del,
              edit: element.edit,
              menu_type: element.menu_type,
              page_name: element.page_name,
              user_type: element.user_type,
            },
          })
        );
      });
      return await ctx.db.$transaction(arr);
    }),
});
