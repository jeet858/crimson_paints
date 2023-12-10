import {
  salesRepresentativeDeleteInput,
  salesRepresentativeEditInput,
  salesRepresentativeInput,
} from "~/types";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
const inputSchema = z.object({
  phone: z.string({
    required_error: "This is a required field",
  }),
});

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
  where_by_phone: protectedProcedure
    .input(inputSchema)
    .query(async ({ ctx, input }) => {
      const representative = await ctx.db.salesman.findUnique({
        where: {
          phone: input.phone,
        },
      });
      await ctx.db.$disconnect();
      return representative;
    }),
  salesman_orderable_location: protectedProcedure
    .input(inputSchema)
    .query(async ({ ctx, input }) => {
      const representatives = await ctx.db.userOrderableLocation.findMany({
        where: {
          phone: input.phone,
        },
      });
      await ctx.db.$disconnect();
      return representatives.map(({ name, phone, location }) => ({
        name,
        phone,
        location,
      }));
    }),
  salesman_access_location: protectedProcedure
    .input(inputSchema)
    .query(async ({ ctx, input }) => {
      const representatives = await ctx.db.userAcessLocation.findMany({
        where: {
          phone: input.phone,
        },
      });
      await ctx.db.$disconnect();
      return representatives.map(({ name, phone, location }) => ({
        name,
        phone,
        location,
      }));
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
          self_data: false,
        },
      });
    }),
  edit: protectedProcedure
    .input(salesRepresentativeEditInput)
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
          phone: input.newPhone.toString(),
          location: element,
        };
        orderableLocation.push(obj);
      });
      input.acessLocation.forEach((element) => {
        const obj = {
          name: input.name,
          phone: input.newPhone.toString(),
          location: element,
        };
        acessLocationArray.push(obj);
      });
      const user = await ctx.db.user.findUnique({
        where: {
          phone: parseInt(input.existingPhone),
        },
      });
      await ctx.db.user.update({
        where: {
          phone: user?.phone,
          email: user?.email,
        },
        data: {
          phone: parseInt(input.newPhone),
        },
      });
      await ctx.db.userOrderableLocation.deleteMany({
        where: {
          phone: input.existingPhone,
        },
      });
      await ctx.db.userAcessLocation.deleteMany({
        where: {
          phone: input.existingPhone,
        },
      });
      await ctx.db.userOrderableLocation.createMany({
        data: orderableLocation,
      });
      await ctx.db.userAcessLocation.createMany({
        data: acessLocationArray,
      });
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
    .input(salesRepresentativeDeleteInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.deleteMany({
        where: {
          phone: parseInt(input.phone),
        },
      });
      await ctx.db.userOrderableLocation.deleteMany({
        where: {
          phone: input.phone,
        },
      });
      await ctx.db.userAcessLocation.deleteMany({
        where: {
          phone: input.phone,
        },
      });
      return await ctx.db.salesman.delete({
        where: {
          phone: input.phone.toString(),
        },
      });
    }),
});
