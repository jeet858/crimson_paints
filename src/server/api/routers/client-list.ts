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
        price_list_name,
        is_cheque,
        gst_validity,
        in_india,
        is_active,
        max_credit_amount,
        max_credit_days,
        primary_company,
      }) => ({
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
        price_list_name,
        is_cheque,
        gst_validity,
        in_india,
        is_active,
        max_credit_amount,
        max_credit_days,
        primary_company,
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
          price_list_name,
          is_cheque,
          gst_validity,
          in_india,
          is_active,
          max_credit_amount,
          max_credit_days,
          primary_company,
        }) => ({
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
          price_list_name,
          is_cheque,
          gst_validity,
          in_india,
          is_active,
          max_credit_amount,
          max_credit_days,
          primary_company,
        })
      );
    }),
  create: protectedProcedure
    .input(ClientInput)
    .mutation(async ({ ctx, input }) => {
      const salesSupervisorArray: {
        uniqe_name: string;
        sales_supervisor: string;
      }[] = [];
      input.sales_supervisor.forEach((element) => {
        const obj = {
          uniqe_name: input.unique_name,
          sales_supervisor: element,
        };
        salesSupervisorArray.push(obj);
      });
      const clientSecondaryCompanyArray: {
        unique_name: string;
        company: string;
      }[] = [];
      input.secondary_company.forEach((element) => {
        const obj = {
          unique_name: input.unique_name,
          company: element,
        };
        clientSecondaryCompanyArray.push(obj);
      });
      await ctx.db.clientSupervisors.createMany({
        data: salesSupervisorArray,
      });
      await ctx.db.clientSecondaryCompany.createMany({
        data: clientSecondaryCompanyArray,
      });
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
          price_list_name: input.price_list_name,
          gst_validity: input.gst_validity,
          in_india: input.in_india,
          is_active: input.is_active,
          max_credit_amount: parseInt(input.max_credit_amount),
          max_credit_days: parseInt(input.max_credit_days),
          primary_company: input.primary_company,
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
          price_list_name: input.price_list_name,
          gst_validity: input.gst_validity,
          in_india: input.in_india,
          is_active: input.is_active,
          max_credit_amount: parseInt(input.max_credit_amount),
          max_credit_days: parseInt(input.max_credit_days),
          primary_company: input.primary_company,
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
