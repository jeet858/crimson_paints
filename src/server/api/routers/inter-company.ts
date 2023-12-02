import { z } from "zod";
import {
  basicUnitsDeleteInput,
  basicUnitsEditInput,
  basicUnitsInput,
  interComapnyDeleteInput,
  interComapnyEditInput,
  interComapnyInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const interComapnyRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.interCompany.findMany();
    await ctx.db.$disconnect();
    return units.map(
      ({ name, address, bill, city, gst, phone, pin, type }) => ({
        name,
        address,
        bill,
        city,
        gst,
        phone,
        pin,
        type,
      })
    );
  }),
  edit: protectedProcedure
    .input(interComapnyEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.interCompany.update({
        where: { name: input.existingName },
        data: {
          name: input.newName,
          address: input.address,
          bill: input.bill,
          city: input.city,
          gst: input.gst,
          phone: input.phone,
          pin: input.pin,
          type: input.type,
        },
      });
    }),
  delete: protectedProcedure
    .input(interComapnyDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.interCompany.delete({
        where: { name: input.name },
      });
    }),
  create: protectedProcedure
    .input(interComapnyInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.interCompany.create({
        data: {
          name: input.name,
          address: input.address,
          bill: input.bill,
          city: input.city,
          gst: input.gst,
          phone: input.phone,
          pin: input.pin,
          type: input.type,
        },
      });
    }),
});
