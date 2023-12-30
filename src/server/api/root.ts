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
import { orderableColorRouter } from "./routers/orderale-colors";
import { namingPriceListRouter } from "./routers/naming-price-list";
import { salesRepresentativeRouter } from "./routers/sales-representative";
import { interComapnyRouter } from "./routers/inter-company";
import { pricingRouter } from "./routers/pricing";
import { locationRouter } from "./routers/location";
import { stockRouter } from "./routers/stock";
import { clientListRouter } from "./routers/client-list";
import { userRouter } from "./routers/user";
import { orderRouter } from "./routers/order";
import { userAcessRouter } from "./routers/user-access";
import { proxyAccessRouter } from "./routers/proxy-access";

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
  orderablrColor: orderableColorRouter,
  namingPriceList: namingPriceListRouter,
  salesRepresentative: salesRepresentativeRouter,
  interComapny: interComapnyRouter,
  pricing: pricingRouter,
  location: locationRouter,
  stock: stockRouter,
  client: clientListRouter,
  user: userRouter,
  order: orderRouter,
  userAccess: userAcessRouter,
  proxyAccess: proxyAccessRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
