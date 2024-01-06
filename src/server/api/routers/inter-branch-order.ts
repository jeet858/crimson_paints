import { InterBracnhOrderInput } from "~/types";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const interBracnhOrderRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.interBranchOrder.findMany();
    await ctx.db.$disconnect();
    return orders;
  }),
  all_details: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.interBranchOrderDetails.findMany();
    await ctx.db.$disconnect();
    return orders;
  }),
  create: protectedProcedure
    .input(InterBracnhOrderInput)
    .mutation(async ({ ctx, input }) => {
      const arr: any[] = [
        ctx.db.interBranchOrder.upsert({
          where: { id: input.id },
          create: {
            id: input.id,
            status: "Pending",
            date: input.date,
            order_by: input.order_by,
            order_to: input.order_to,
          },
          update: {
            id: input.id,
            status: "Pending",
            date: input.date,
            order_by: input.order_by,
            order_to: input.order_to,
          },
        }),
      ]; //array of transactions and first transaction where order is created or updated

      const stocks = await ctx.db.stock.findMany(); //fetch all information about stocks
      const orderDetails = await ctx.db.interBranchOrderDetails.findMany({
        where: { id: input.id },
      });

      const relatedOrder = orderDetails.find(
        (data) =>
          data.brand_name === input.brand_name &&
          data.color_name === input.color_name &&
          data.packaging_type === input.packaging_type &&
          data.id === input.id
      ); //find if the same item exists for same order

      relatedOrder
        ? arr.push(
            ctx.db.interBranchOrderDetails.update({
              where: {
                id_date_brand_name_color_name_packaging_type: {
                  id: input.id,
                  brand_name: input.brand_name,
                  date: input.date,
                  color_name: input.color_name,
                  packaging_type: input.packaging_type,
                },
              },
              data: {
                total_qty:
                  Number(relatedOrder.total_qty) + Number(input.total_qty),
                amount: Number(relatedOrder.amount) + Number(input.amount),
              },
            })
          ) // if same item exists for same order modify it else create it
        : arr.push(
            ctx.db.interBranchOrderDetails.create({
              data: {
                total_qty: input.total_qty,
                id: input.id,
                brand_name: input.brand_name,
                date: input.date,
                color_name: input.color_name,
                packaging_type: input.packaging_type,
                cancelled_qty: 0,
                executed_qty: 0,
                amount: input.amount,
              },
            })
          );
      const relatedStock = stocks.find(
        (data) =>
          data.branch === input.order_by &&
          data.brand_name === input.brand_name &&
          data.color_name === input.color_name &&
          data.packaging === input.packaging_type
      ); //find if stock exists for item in order

      relatedStock
        ? arr.push(
            ctx.db.stock.update({
              where: {
                brand_name_color_name_packaging_branch: {
                  brand_name: input.brand_name,
                  branch: input.order_by,
                  color_name: input.color_name,
                  packaging: input.packaging_type,
                },
              },
              data: {
                brand_name: input.brand_name,
                branch: input.order_by,
                color_name: input.color_name,
                packaging: input.packaging_type,
                current_stock: relatedStock.current_stock,
                pending: relatedStock.pending + parseInt(input.total_qty),
              },
            })
          )
        : arr.push(
            ctx.db.stock.create({
              data: {
                brand_name: input.brand_name,
                branch: input.order_by,
                color_name: input.color_name,
                packaging: input.packaging_type,
                current_stock: 0,
                pending: parseInt(input.total_qty),
              },
            })
          ); // if stock exists then update else create stock

      return await ctx.db.$transaction(arr);
    }),
});
