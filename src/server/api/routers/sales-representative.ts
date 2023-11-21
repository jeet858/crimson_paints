import {
  salesRepresentativeEditInput,
  salesRepresentativeInput,
} from "~/types";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const salesRepresentativeRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const representatives = await ctx.db.salesman.findMany();
    await ctx.db.$disconnect();
    return representatives.map(({ name, location, phone }) => ({
      name,
      location,
      phone,
    }));
  }),
  create: protectedProcedure
    .input(salesRepresentativeInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.salesman.create({
        data: {
          name: input.name,
          location: input.location,
          phone: input.phone as unknown as string,
        },
      });
    }),
  edit: protectedProcedure
    .input(salesRepresentativeEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.salesman.update({
        where: { phone: input.existingPhone as unknown as string },
        data: {
          name: input.name,
          location: input.location,
          phone: input.newPhone as unknown as string,
        },
      });
    }),
  delete: protectedProcedure
    .input(salesRepresentativeInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.salesman.delete({
        where: {
          phone: input.phone as unknown as string,
          location: input.location,
          name: input.name,
        },
      });
    }),
});
