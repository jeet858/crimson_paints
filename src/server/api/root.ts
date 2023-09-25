import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { basicUnitsRouter } from "./routers/basic-unit";
import { packagingTypeRouter } from "./routers/packaging-type";
import { colorsTypeRouter } from "./routers/colors";
import { packagingUnitRouter } from "./routers/packaging-units";
import { hsnCodeRouter } from "./routers/hsn";
import { categoriesRouter } from "./routers/categories";
import { brandRouter } from "./routers/brand";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  basicUnit: basicUnitsRouter,
  packagingType: packagingTypeRouter,
  colors: colorsTypeRouter,
  packagingUnit: packagingUnitRouter,
  hsn: hsnCodeRouter,
  categories: categoriesRouter,
  brand: brandRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
