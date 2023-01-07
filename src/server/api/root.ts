import { createTRPCRouter } from "./trpc";
import { noteRouter } from "./routers/note";

export const appRouter = createTRPCRouter({
  note: noteRouter,
});

export type AppRouter = typeof appRouter;
