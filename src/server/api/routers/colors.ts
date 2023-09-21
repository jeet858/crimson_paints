import { packagingTypeInput } from "../../../types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const colorsTypeRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const units = await ctx.db.colors.findMany({
      orderBy: [{ color_name: "asc" }],
    });
    return units.map(({ color_name, rgb_code }) => ({
      color_name,
      rgb_code,
    }));
  }),
});
