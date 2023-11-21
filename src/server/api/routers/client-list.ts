import { z } from "zod";
import {
  ClientDeleteInput,
  ClientEditInput,
  ClientInput,
  basicUnitsDeleteInput,
  basicUnitsEditInput,
  basicUnitsInput,
} from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
const inputSchema = z.string({
  required_error: "This is a required field",
});
export const clientListRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.client.findMany();
    await ctx.db.$disconnect();
    return units.map(
      ({
        address,
        bank_branch,
        account,
        code,
        distributor,
        district,
        pin_code,
        email,
        gst,
        ifsc,
        legal_name,
        location,
        phone_primary,
        phone_secondary,
        sales_representative,
        state,
        trade_license,
        type,
        unique_name,
        is_cheque,
      }) => ({
        address,
        bank_branch,
        account,
        code,
        distributor,
        district,
        email,
        pin_code,
        gst,
        ifsc,
        legal_name,
        location,
        phone_primary,
        phone_secondary,
        sales_representative,
        state,
        trade_license,
        type,
        unique_name,
        is_cheque,
      })
    );
  }),
  by_unique_name: protectedProcedure
    .input(inputSchema)
    .query(async ({ ctx, input }) => {
      const unit = await ctx.db.client.findUnique({
        where: {
          unique_name: input,
        },
      });
      await ctx.db.$disconnect();
      return unit;
    }),
  by_distributor_name: protectedProcedure
    .input(inputSchema)
    .query(async ({ ctx, input }) => {
      const units = await ctx.db.client.findMany({
        where: {
          distributor: input,
        },
      });
      await ctx.db.$disconnect();
      return units.map(
        ({
          address,
          bank_branch,
          account,
          code,
          distributor,
          district,
          pin_code,
          email,
          gst,
          ifsc,
          legal_name,
          location,
          phone_primary,
          phone_secondary,
          sales_representative,
          state,
          trade_license,
          type,
          unique_name,
          is_cheque,
        }) => ({
          address,
          bank_branch,
          account,
          code,
          distributor,
          district,
          email,
          pin_code,
          gst,
          ifsc,
          legal_name,
          location,
          phone_primary,
          phone_secondary,
          sales_representative,
          state,
          trade_license,
          type,
          unique_name,
          is_cheque,
        })
      );
    }),
  create: protectedProcedure
    .input(ClientInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.client.create({
        data: {
          address: input.address,
          bank_branch: input.bank_branch,
          account: input.account,
          code: input.code,
          distributor: input.distributor,
          district: input.district,
          email: input.email,
          pin_code: input.pin_code.toString(),
          gst: input.gst,
          ifsc: input.ifsc,
          legal_name: input.legal_name,
          location: input.location,
          phone_primary: input.phone_primary.toString(),
          phone_secondary: input.phone_secondary.toString(),
          sales_representative: input.sales_representative,
          state: input.state,
          trade_license: input.trade_license,
          type: input.type,
          unique_name: input.unique_name,
          is_cheque: input.is_cheque,
        },
      });
    }),
  edit: protectedProcedure
    .input(ClientEditInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.client.update({
        where: {
          unique_name: input.existing_unique_name,
        },
        data: {
          address: input.address,
          bank_branch: input.bank_branch,
          account: input.account,
          code: input.code,
          distributor: input.distributor,
          district: input.district,
          email: input.email,
          pin_code: input.pin_code.toString(),
          gst: input.gst,
          ifsc: input.ifsc,
          legal_name: input.legal_name,
          location: input.location,
          phone_primary: input.phone_primary.toString(),
          phone_secondary: input.phone_secondary.toString(),
          sales_representative: input.sales_representative,
          state: input.state,
          trade_license: input.trade_license,
          type: input.type,
          unique_name: input.unique_name,
          is_cheque: input.is_cheque,
        },
      });
    }),
  delete: protectedProcedure
    .input(ClientDeleteInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.client.deleteMany({
        where: {
          distributor: input.unique_name,
        },
      });
      return await ctx.db.client.delete({
        where: { unique_name: input.unique_name },
      });
    }),
});
