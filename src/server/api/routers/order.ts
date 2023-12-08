import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { OrderInput } from "~/types";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const orderRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany();
    await ctx.db.$disconnect();
    return orders;
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
        total_qty,
      })
    );
  }),
  create: protectedProcedure
    .input(OrderInput)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.order.create({
          data: {
            id: input.id,
            client_unique_name: input.client_unique_name,
            salesman_name: input.salesman_name,
            company: input.company,
            salesman_phone: input.salesman_phone,
            state: input.location,
            client_type: input.client_type,
            status: "Pending",
            client_legal_name: input.client_name,
            date: input.date,
          },
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          try {
            await ctx.db.orderDetails.create({
              data: {
                id: input.id,
                brand_name: input.brand_name,
                color_name: input.color_name,
                packaging_type: input.packaging_type,
                client_unique_name: input.client_name,
                salesman_name: input.salesman_name,
                date: input.date,
                location: input.location,
                amount: input.amount * parseInt(input.total_qty),
                cancelled_qty: 0,
                executed_qty: 0,
                total_qty: parseInt(input.total_qty),
                company: input.company,
              },
            });
          } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
              const existingOrderDetails = await ctx.db.orderDetails.findUnique(
                {
                  where: {
                    id_salesman_name_client_unique_name_date_location_brand_name_color_name_packaging_type:
                      {
                        id: input.id,
                        brand_name: input.brand_name,
                        client_unique_name: input.client_name,
                        color_name: input.color_name,
                        date: input.date,
                        location: input.location,
                        packaging_type: input.packaging_type,
                        salesman_name: input.salesman_name,
                      },
                  },
                }
              );
              if (
                existingOrderDetails &&
                existingOrderDetails.total_qty &&
                existingOrderDetails.amount
              ) {
                const price =
                  parseInt(existingOrderDetails.amount.toString()) /
                  parseInt(existingOrderDetails.total_qty.toString());
                const amount =
                  parseInt(existingOrderDetails.amount.toString()) +
                  price * parseInt(input.total_qty);
                return await ctx.db.orderDetails.update({
                  where: {
                    id_salesman_name_client_unique_name_date_location_brand_name_color_name_packaging_type:
                      {
                        id: input.id,
                        brand_name: input.brand_name,
                        client_unique_name: input.client_name,
                        color_name: input.color_name,
                        date: input.date,
                        location: input.location,
                        packaging_type: input.packaging_type,
                        salesman_name: input.salesman_name,
                      },
                  },
                  data: {
                    id: input.id,
                    brand_name: input.brand_name,
                    color_name: input.color_name,
                    packaging_type: input.packaging_type,
                    client_unique_name: input.client_name,
                    salesman_name: input.salesman_name,
                    date: input.date,
                    location: input.location,
                    amount: amount,
                    cancelled_qty: 0,
                    executed_qty: 0,
                    total_qty:
                      parseInt(input.total_qty) +
                      parseInt(existingOrderDetails.total_qty.toString()),
                    company: input.company,
                  },
                });
              }
            } else {
              throw Error("Error occured");
            }
          }
        } else {
          throw Error("Error occured");
        }
      } finally {
        try {
          await ctx.db.orderDetails.create({
            data: {
              id: input.id,
              brand_name: input.brand_name,
              color_name: input.color_name,
              packaging_type: input.packaging_type,
              client_unique_name: input.client_name,
              salesman_name: input.salesman_name,
              date: input.date,
              location: input.location,
              amount: input.amount * parseInt(input.total_qty),
              cancelled_qty: 0,
              executed_qty: 0,
              total_qty: parseInt(input.total_qty),
              company: input.company,
            },
          });
        } catch (e) {
          if (e instanceof PrismaClientKnownRequestError) {
            const existingOrderDetails = await ctx.db.orderDetails.findUnique({
              where: {
                id_salesman_name_client_unique_name_date_location_brand_name_color_name_packaging_type:
                  {
                    id: input.id,
                    brand_name: input.brand_name,
                    client_unique_name: input.client_name,
                    color_name: input.color_name,
                    date: input.date,
                    location: input.location,
                    packaging_type: input.packaging_type,
                    salesman_name: input.salesman_name,
                  },
              },
            });
            if (
              existingOrderDetails &&
              existingOrderDetails.total_qty &&
              existingOrderDetails.amount
            ) {
              const price =
                parseInt(existingOrderDetails.amount.toString()) /
                parseInt(existingOrderDetails.total_qty.toString());
              const amount =
                parseInt(existingOrderDetails.amount.toString()) +
                price * parseInt(input.total_qty);
              return await ctx.db.orderDetails.update({
                where: {
                  id_salesman_name_client_unique_name_date_location_brand_name_color_name_packaging_type:
                    {
                      id: input.id,
                      brand_name: input.brand_name,
                      client_unique_name: input.client_name,
                      color_name: input.color_name,
                      date: input.date,
                      location: input.location,
                      packaging_type: input.packaging_type,
                      salesman_name: input.salesman_name,
                    },
                },
                data: {
                  id: input.id,
                  brand_name: input.brand_name,
                  color_name: input.color_name,
                  packaging_type: input.packaging_type,
                  client_unique_name: input.client_name,
                  salesman_name: input.salesman_name,
                  date: input.date,
                  location: input.location,
                  amount: amount,
                  cancelled_qty: 0,
                  executed_qty: 0,
                  total_qty:
                    parseInt(input.total_qty) +
                    parseInt(existingOrderDetails.total_qty.toString()),
                  company: input.company,
                },
              });
            }
          } else {
            throw Error("Error occured");
          }
        }
      }
    }),
});
