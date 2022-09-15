import { createRouter } from "./context";
import { z } from "zod";

export const usersRouter = createRouter()
  .mutation("createUser", {
    input: z.object({
      name: z.string(),
      contactInfo: z.string(),
    }),
    async resolve({ input, ctx }) {
      const newlyCreatedUser = await ctx.prisma.speedDateUser.create({
        data: input,
      });
      return newlyCreatedUser;
    },
  })
  .mutation("setStatus", {
    input: z.object({
      userId: z.string(),
      status: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.speedDateUser.update({
        where: {
          id: input.userId,
        },
        data: {
          status: input.status,
        },
      });
    },
  })
  .query("findMatch", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const firstMatch = await ctx.prisma.speedDateUser.findFirst({
        where: {
          status: "waiting",
          NOT: {
            id: input.userId,
          },
        },
      });

      if (!firstMatch) return null;

      const match = await ctx.prisma.match.create({
        data: {
          sourceUserId: input.userId,
          sinkUserId: firstMatch.id,
        },
      });

      return match;
    },
  })
  .query("getMatch", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const match = await ctx.prisma.match.findFirst({
        where: {
          sinkUserId: input.userId,
        },
      });
      return match;
    },
  });
