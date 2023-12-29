import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { OrderInput } from "~/types";
const inputSchema = z.object({
  id: z.string({
    required_error: "order_id cant be null",
  }),
});
export const orderRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany();
    await ctx.db.$disconnect();
    return orders;
  }),
  order_by_id: protectedProcedure
    .input(inputSchema)
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.id },
      });
      await ctx.db.$disconnect();
      return order;
    }),
  order_details_by_id: protectedProcedure
    .input(inputSchema)
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.orderDetails.findMany({
        where: { id: input.id },
      });
      await ctx.db.$disconnect();
      return order;
    }),
  all_details: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.orderDetails.findMany();
    await ctx.db.$disconnect();
    return units;
  }),
  create: protectedProcedure
    .input(OrderInput)
    .mutation(async ({ ctx, input }) => {
      // try {
      //   await ctx.db.order.create({
      //     data: {
      //       id: input.id,
      //       client_unique_name: input.client_unique_name,
      //       salesman_name: input.salesman_name,
      //       company: input.company,
      //       salesman_phone: input.salesman_phone,
      //       state: input.location,
      //       client_type: input.client_type,
      //       status: "Pending",
      //       client_legal_name: input.client_name,
      //       date: input.date,
      //     },
      //   });
      // // } catch (e) {
      // //   if (e instanceof PrismaClientKnownRequestError) {
      // //     try {
      // //       await ctx.db.orderDetails.create({
      // //         data: {
      // //           id: input.id,
      // //           brand_name: input.brand_name,
      // //           color_name: input.color_name,
      // //           packaging_type: input.packaging_type,
      // //           client_unique_name: input.client_name,
      // //           salesman_name: input.salesman_name,
      // //           date: input.date,
      // //           location: input.location,
      // //           amount: input.amount * parseInt(input.total_qty),
      // //           cancelled_qty: 0,
      // //           executed_qty: 0,
      // //           total_qty: parseInt(input.total_qty),
      // //           company: input.company,
      // //         },
      // //       });
      // //     } catch (e) {
      // //       if (e instanceof PrismaClientKnownRequestError) {
      // //         const existingOrderDetails = await ctx.db.orderDetails.findUnique(
      // //           {
      // //             where: {
      // //               id_salesman_name_client_unique_name_date_location_brand_name_color_name_packaging_type:
      // //                 {
      // //                   id: input.id,
      // //                   brand_name: input.brand_name,
      // //                   client_unique_name: input.client_name,
      // //                   color_name: input.color_name,
      // //                   date: input.date,
      // //                   location: input.location,
      // //                   packaging_type: input.packaging_type,
      // //                   salesman_name: input.salesman_name,
      // //                 },
      // //             },
      // //           }
      // //         );
      // //         if (
      // //           existingOrderDetails &&
      // //           existingOrderDetails.total_qty &&
      // //           existingOrderDetails.amount
      // //         ) {
      // //           const price =
      // //             parseInt(existingOrderDetails.amount.toString()) /
      // //             parseInt(existingOrderDetails.total_qty.toString());
      // //           const amount =
      // //             parseInt(existingOrderDetails.amount.toString()) +
      // //             price * parseInt(input.total_qty);
      // //           const stock = await ctx.db.stock.findUnique({
      // //             where: {
      // //               brand_name_color_name_packaging_branch: {
      // //                 brand_name: input.brand_name,
      // //                 branch: input.company,
      // //                 color_name: input.color_name,
      // //                 packaging: input.packaging_type,
      // //               },
      // //             },
      // //           });
      // //           await ctx.db.stock.upsert({
      // //             where: {
      // //               brand_name_color_name_packaging_branch: {
      // //                 brand_name: input.brand_name,
      // //                 branch: input.company,
      // //                 color_name: input.color_name,
      // //                 packaging: input.packaging_type,
      // //               },
      // //             },
      // //             update: {
      // //               brand_name: input.brand_name,
      // //               branch: input.company,
      // //               color_name: input.color_name,
      // //               packaging: input.packaging_type,
      // //               pending:
      // //                 stock && stock.pending
      // //                   ? stock.pending - parseInt(input.total_qty)
      // //                   : 0 - parseInt(input.total_qty),
      // //             },
      // //             create: {
      // //               brand_name: input.brand_name,
      // //               branch: input.company,
      // //               color_name: input.color_name,
      // //               packaging: input.packaging_type,
      // //               pending: parseInt(input.total_qty),
      // //               current_stock: 0,
      // //             },
      // //           });
      // //           return await ctx.db.orderDetails.update({
      // //             where: {
      // //               id_salesman_name_client_unique_name_date_location_brand_name_color_name_packaging_type:
      // //                 {
      // //                   id: input.id,
      // //                   brand_name: input.brand_name,
      // //                   client_unique_name: input.client_name,
      // //                   color_name: input.color_name,
      // //                   date: input.date,
      // //                   location: input.location,
      // //                   packaging_type: input.packaging_type,
      // //                   salesman_name: input.salesman_name,
      // //                 },
      // //             },
      // //             data: {
      // //               id: input.id,
      // //               brand_name: input.brand_name,
      // //               color_name: input.color_name,
      // //               packaging_type: input.packaging_type,
      // //               client_unique_name: input.client_name,
      // //               salesman_name: input.salesman_name,
      // //               date: input.date,
      // //               location: input.location,
      // //               amount: amount,
      // //               cancelled_qty: 0,
      // //               executed_qty: 0,
      // //               total_qty:
      // //                 parseInt(input.total_qty) +
      // //                 parseInt(existingOrderDetails.total_qty.toString()),
      // //               company: input.company,
      // //             },
      // //           });
      // //         }
      // //       } else {
      // //         throw Error("Error occured");
      // //       }
      // //     }
      // //   } else {
      // //     throw Error("Error occured");
      // //   }
      // // } finally {
      // //   try {
      // //     const orderCreate = ctx.db.orderDetails.create({
      // //       data: {
      // //         id: input.id,
      // //         brand_name: input.brand_name,
      // //         color_name: input.color_name,
      // //         packaging_type: input.packaging_type,
      // //         client_unique_name: input.client_name,
      // //         salesman_name: input.salesman_name,
      // //         date: input.date,
      // //         location: input.location,
      // //         amount: input.amount * parseInt(input.total_qty),
      // //         cancelled_qty: 0,
      // //         executed_qty: 0,
      // //         total_qty: parseInt(input.total_qty),
      // //         company: input.company,
      // //       },
      // //     });
      // //     const stock = await ctx.db.stock.findUnique({
      // //       where: {
      // //         brand_name_color_name_packaging_branch: {
      // //           brand_name: input.brand_name,
      // //           branch: input.company,
      // //           color_name: input.color_name,
      // //           packaging: input.packaging_type,
      // //         },
      // //       },
      // //     });
      // //     const stockUpdate = ctx.db.stock.upsert({
      // //       where: {
      // //         brand_name_color_name_packaging_branch: {
      // //           brand_name: input.brand_name,
      // //           branch: input.company,
      // //           color_name: input.color_name,
      // //           packaging: input.packaging_type,
      // //         },
      // //       },
      // //       update: {
      // //         brand_name: input.brand_name,
      // //         branch: input.company,
      // //         color_name: input.color_name,
      // //         packaging: input.packaging_type,
      // //         pending:
      // //           stock && stock.pending
      // //             ? stock.pending + parseInt(input.total_qty)
      // //             : 0 - parseInt(input.total_qty),
      // //       },
      // //       create: {
      // //         brand_name: input.brand_name,
      // //         branch: input.company,
      // //         color_name: input.color_name,
      // //         packaging: input.packaging_type,
      // //         pending: parseInt(input.total_qty),
      // //         current_stock: 0,
      // //       },
      // //     });
      // //     await ctx.db.$transaction([orderCreate, stockUpdate]);
      // //   } catch (e) {
      // //     if (e instanceof PrismaClientKnownRequestError) {
      // //       const existingOrderDetails = await ctx.db.orderDetails.findUnique({
      // //         where: {
      // //           id_salesman_name_client_unique_name_date_location_brand_name_color_name_packaging_type:
      // //             {
      // //               id: input.id,
      // //               brand_name: input.brand_name,
      // //               client_unique_name: input.client_name,
      // //               color_name: input.color_name,
      // //               date: input.date,
      // //               location: input.location,
      // //               packaging_type: input.packaging_type,
      // //               salesman_name: input.salesman_name,
      // //             },
      // //         },
      // //       });
      // //       if (
      // //         existingOrderDetails &&
      // //         existingOrderDetails.total_qty &&
      // //         existingOrderDetails.amount
      // //       ) {
      // //         const price =
      // //           parseInt(existingOrderDetails.amount.toString()) /
      // //           parseInt(existingOrderDetails.total_qty.toString());
      // //         const amount =
      // //           parseInt(existingOrderDetails.amount.toString()) +
      // //           price * parseInt(input.total_qty);
      // //         const stock = await ctx.db.stock.findUnique({
      // //           where: {
      // //             brand_name_color_name_packaging_branch: {
      // //               brand_name: input.brand_name,
      // //               branch: input.location,
      // //               color_name: input.color_name,
      // //               packaging: input.packaging_type,
      // //             },
      // //           },
      // //         });
      // //         await ctx.db.stock.upsert({
      // //           where: {
      // //             brand_name_color_name_packaging_branch: {
      // //               brand_name: input.brand_name,
      // //               branch: input.company,
      // //               color_name: input.color_name,
      // //               packaging: input.packaging_type,
      // //             },
      // //           },
      // //           update: {
      // //             brand_name: input.brand_name,
      // //             branch: input.company,
      // //             color_name: input.color_name,
      // //             packaging: input.packaging_type,
      // //             pending:
      // //               stock && stock.pending
      // //                 ? stock.pending + parseInt(input.total_qty)
      // //                 : parseInt(input.total_qty),
      // //           },
      // //           create: {
      // //             brand_name: input.brand_name,
      // //             branch: input.company,
      // //             color_name: input.color_name,
      // //             packaging: input.packaging_type,
      // //             current_stock: 0,
      // //             pending: parseInt(input.total_qty),
      // //           },
      // //         });
      // //         return await ctx.db.orderDetails.update({
      // //           where: {
      // //             id_salesman_name_client_unique_name_date_location_brand_name_color_name_packaging_type:
      // //               {
      // //                 id: input.id,
      // //                 brand_name: input.brand_name,
      // //                 client_unique_name: input.client_name,
      // //                 color_name: input.color_name,
      // //                 date: input.date,
      // //                 location: input.location,
      // //                 packaging_type: input.packaging_type,
      // //                 salesman_name: input.salesman_name,
      // //               },
      // //           },
      // //           data: {
      // //             id: input.id,
      // //             brand_name: input.brand_name,
      // //             color_name: input.color_name,
      // //             packaging_type: input.packaging_type,
      // //             client_unique_name: input.client_name,
      // //             salesman_name: input.salesman_name,
      // //             date: input.date,
      // //             location: input.location,
      // //             amount: amount,
      // //             cancelled_qty: 0,
      // //             executed_qty: 0,
      // //             total_qty:
      // //               parseInt(input.total_qty) +
      // //               parseInt(existingOrderDetails.total_qty.toString()),
      // //             company: input.company,
      // //           },
      // //         });
      // //       }
      // //     } else {
      // //       throw Error("Error occured");
      // //     }
      // //   }
      // // }

      const arr: any[] = [
        ctx.db.order.upsert({
          where: { id: input.id },
          create: {
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
          update: {
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
        }),
      ]; //array of transactions and first transaction where order is created or updated

      const stocks = await ctx.db.stock.findMany(); //fetch all information about stocks
      const orderDetails = await ctx.db.orderDetails.findMany({
        where: { id: input.id },
      });

      const relatedOrder = orderDetails.find(
        (data) =>
          data.brand_name === input.brand_name &&
          data.color_name === input.color_name &&
          data.packaging_type === input.packaging_type &&
          data.id === input.id &&
          data.salesman_name === input.salesman_name &&
          data.client_unique_name === input.client_unique_name &&
          data.date === input.date &&
          data.company === input.company
      ); //find if the same item exists for same order

      relatedOrder
        ? arr.push(
            ctx.db.orderDetails.update({
              where: {
                id_salesman_name_client_unique_name_date_company_brand_name_color_name_packaging_type:
                  {
                    id: input.id,
                    client_unique_name: input.client_unique_name,
                    salesman_name: input.salesman_name,
                    brand_name: input.brand_name,
                    date: input.date,
                    company: input.company,
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
            ctx.db.orderDetails.create({
              data: {
                total_qty: input.total_qty,
                id: input.id,
                client_unique_name: input.client_unique_name,
                salesman_name: input.salesman_name,
                brand_name: input.brand_name,
                date: input.date,
                company: input.company,
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
          data.branch === input.company &&
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
                  branch: input.company,
                  color_name: input.color_name,
                  packaging: input.packaging_type,
                },
              },
              data: {
                brand_name: input.brand_name,
                branch: input.company,
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
                branch: input.company,
                color_name: input.color_name,
                packaging: input.packaging_type,
                current_stock: 0,
                pending: parseInt(input.total_qty),
              },
            })
          ); // if stock exists then update else create stock

      return await ctx.db.$transaction(arr);
    }),
  execute_order: protectedProcedure
    .input(inputSchema)
    .mutation(async ({ ctx, input }) => {
      const stocks = await ctx.db.stock.findMany();
      const orderDetails = await ctx.db.orderDetails.findMany({
        where: {
          id: input.id,
        },
      });
      const arr: any[] = [];
      arr.push(
        ctx.db.order.update({
          where: {
            id: input.id,
          },
          data: {
            status: "Executed",
          },
        })
      );
      orderDetails.forEach((element, index) => {
        const stock = stocks.find(
          (data) =>
            data.brand_name === element.brand_name &&
            data.packaging === element.packaging_type &&
            data.color_name === element.color_name &&
            data.branch === element.company
        );
        const a = ctx.db.stock.upsert({
          where: {
            brand_name_color_name_packaging_branch: {
              brand_name: element.brand_name,
              branch: element.company,
              color_name: element.color_name,
              packaging: element.packaging_type,
            },
          },
          create: {
            brand_name: element.brand_name,
            branch: element.company,
            color_name: element.color_name,
            packaging: element.packaging_type,
            current_stock: 0 - Number(element.total_qty),
            pending: 0,
          },
          update: {
            brand_name: element.brand_name,
            branch: element.company,
            color_name: element.color_name,
            packaging: element.packaging_type,
            current_stock: stock?.current_stock
              ? stock.current_stock - Number(element.total_qty)
              : 0 - Number(element.total_qty),
            pending: stock?.pending
              ? stock.pending - Number(element.total_qty)
              : 0,
          },
        });
        arr.push(a);
      });

      return await ctx.db.$transaction(arr);
    }),
});
