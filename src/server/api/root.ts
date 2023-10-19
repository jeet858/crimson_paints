import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { basicUnitsRouter } from "./routers/basic-unit";
import { packagingTypeRouter } from "./routers/packaging-type";
import { colorsTypeRouter } from "./routers/colors";
import { packagingUnitRouter } from "./routers/packaging-units";
import { hsnCodeRouter } from "./routers/hsn";
import { categoriesRouter } from "./routers/categories";
import { brandRouter } from "./routers/brand";
import { complexUnitRouter } from "./routers/complex-units";
import { brandPackagingRouter } from "./routers/brand-packaging";
import { orderableUnitRouter } from "./routers/orderable-unit";
import { groupPricingTypeRouter } from "./routers/group-pricing";

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
  complex: complexUnitRouter,
  brandPackaging: brandPackagingRouter,
  orderableUnit: orderableUnitRouter,
  groupPricing: groupPricingTypeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
