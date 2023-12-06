import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { OrderInput } from "~/types";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const orderRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.order.findMany();
    await ctx.db.$disconnect();
    return units.map(({ id }) => ({
      id,
    }));
  }),
  all_details: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.orderDetails.findMany();
    await ctx.db.$disconnect();
    return units.map(
      ({
        amount,
        brand_name,
        cancelled_qty,
        client_unique_name,
        color_name,
        company,
        date,
        executed_qty,
        id,
        location,
        packaging_type,
        salesman_name,
        status,
        total_qty,
      }) => ({
        amount,
        brand_name,
        cancelled_qty,
        client_unique_name,
        color_name,
        company,
        date,
        executed_qty,
        id,
        location,
        packaging_type,
        salesman_name,
        status,
        total_qty,
      })
    );
  }),
  create: protectedProcedure
    .input(OrderInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.order.create({
        data: {
          id: input.id,
          client_unique_name: input.client_name,
          salesman_name: input.salesman_name,
          company: input.company,
          salesman_phone: input.salesman_phone,
          state: input.location,
          client_type: input.client_type,
        },
      });
      return await ctx.db.orderDetails.create({
        data: {
          id: input.id,
          brand_name: input.brand_name,
          color_name: input.color_name,
          packaging_type: input.packaging_type,
          client_unique_name: input.client_name,
          salesman_name: input.salesman_name,
          date: input.date,
          location: input.location,
          amount: input.amount,
          cancelled_qty: 0,
          executed_qty: 0,
          total_qty: parseInt(input.total_qty),
          company: input.company,
          status: "Pending",
        },
      });
    }),
});
