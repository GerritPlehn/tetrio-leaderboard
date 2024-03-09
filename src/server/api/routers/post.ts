import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

let post = {
  id: 1,
  name: "Hello World",
  title: "Hello World",
  published: true,
  createdAt: new Date(),
};

export type Post = typeof post;

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      post = {
        id: post.id + 1,
        name: input.name,
        title: input.name,
        published: false,
        createdAt: new Date(),
      };
      return post;
    }),

  getLatest: protectedProcedure.query(() => {
    return post;
  }),

  getSome: protectedProcedure.query(() => {
    return [post];
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
