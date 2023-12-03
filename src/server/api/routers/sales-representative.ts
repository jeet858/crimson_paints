import {
  salesRepresentativeEditInput,
  salesRepresentativeInput,
} from "~/types";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const salesRepresentativeRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const representatives = await ctx.db.salesman.findMany();
    await ctx.db.$disconnect();
    return representatives.map(
      ({ name, phone, company, orderable_color, orderable_unit }) => ({
        name,
        phone,
        company,
        orderable_color,
        orderable_unit,
      })
    );
  }),
  create: protectedProcedure
    .input(salesRepresentativeInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.salesman.create({
        data: {
          name: input.name,
          phone: input.phone.toString(),
          company: input.company,
          orderable_color: input.orderable_color,
          orderable_unit: input.orderable_unit,
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
          phone: input.newPhone.toString(),
          company: input.company,
          orderable_color: input.orderable_color,
          orderable_unit: input.orderable_unit,
        },
      });
    }),
  delete: protectedProcedure
    .input(salesRepresentativeInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.salesman.delete({
        where: {
          phone: input.phone.toString(),
          name: input.name,
        },
      });
    }),
});
