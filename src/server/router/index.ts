// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { usersRouter } from "./users";
import { matchesRouter } from "./matches";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("users.", usersRouter)
  .merge("matches.", matchesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
