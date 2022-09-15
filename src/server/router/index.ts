// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { usersRouter } from "./users";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("users.", usersRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
