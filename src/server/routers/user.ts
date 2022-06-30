import { TRPCError } from "@trpc/server";
import { ZUser, client } from "../../fmschemas/User";
import { createRouter } from "../createRouter";

export const userRouter = createRouter()
  .mutation("update", {
    input: ZUser.partial(),
    async resolve({ ctx: { session }, input }) {
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const {
        data: { recordId },
      } = await client.findOne({ query: { id: `==${session.user.id}` } });
      const { modId } = await client.update({
        recordId: parseInt(recordId),
        fieldData: input,
      });
      return modId;
    },
  })
  .query("me", {
    async resolve({ ctx: { session } }) {
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const {
        data: { fieldData },
      } = await client.findOne({ query: { id: `==${session.user.id}` } });
      return fieldData;
    },
  });
