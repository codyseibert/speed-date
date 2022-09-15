import { createRouter } from "./context";
import { z } from "zod";

export const usersRouter = createRouter().mutation("createUser", {
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
});
