import { createRouter } from "./context";
import { z } from "zod";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";

export const matchesRouter = createRouter()
  .mutation("postFeedback", {
    input: z.object({
      matchId: z.string(),
      userId: z.string(),
      status: z.string(),
    }),
    async resolve({ input, ctx }) {
      const match = await ctx.prisma.match.findUnique({
        where: {
          id: input.matchId,
        },
      });

      const isSinkUser = match?.sinkUserId === input.userId;

      await ctx.prisma.match.update({
        where: {
          id: input.matchId,
        },
        data: {
          [isSinkUser ? "sinkUserFeedback" : "sourceUserFeedback"]:
            input.status,
        },
      });
    },
  })
  .mutation("joinMatch", {
    input: z.object({
      matchId: z.string(),
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const match = await ctx.prisma.match.findUnique({
        where: {
          id: input.matchId,
        },
      });
      const isSinkUser = input.userId === match?.sinkUserId;

      const updatedMatch = await ctx.prisma.match.update({
        where: {
          id: input.matchId,
        },
        data: {
          [isSinkUser ? "sinkUserJoined" : "sourceUserJoined"]: true,
        },
      });

      if (updatedMatch.sinkUserJoined && updatedMatch.sourceUserJoined) {
        await ctx.prisma.match.update({
          where: {
            id: input.matchId,
          },
          data: {
            status: "chatting",
            endsOn: `${Date.now() + 20 * 1000}`,
          },
        });
      }
    },
  })
  .query("getMatch", {
    input: z.object({
      matchId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.match.findUnique({
        where: {
          id: input.matchId,
        },
        include: {
          sinkUser: true,
          sourceUser: true,
        },
      });
    },
  })
  .query("getToken", {
    input: z.object({
      userId: z.string(),
      matchId: z.string(),
    }),
    async resolve({ input }) {
      const appID = process.env.AGORA_APP_ID!;
      const appCertificate = process.env.AGORA_APP_CERT!;
      const channelName = input.matchId;
      const account = input.userId;
      const role = RtcRole.PUBLISHER;
      const expirationTimeInSeconds = 3600;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

      const token = RtcTokenBuilder.buildTokenWithAccount(
        appID,
        appCertificate,
        channelName,
        account,
        role,
        privilegeExpiredTs
      );

      return token;
    },
  });
