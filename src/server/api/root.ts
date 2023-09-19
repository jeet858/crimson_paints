import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { basicUnitsRouter } from "./routers/basic-unit";
import { packagingTypeRouter } from "./routers/packaging-type";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  basicUnit: basicUnitsRouter,
  packagingType: packagingTypeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
