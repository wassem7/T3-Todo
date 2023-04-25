import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { todoInput } from "@/types";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const todos = ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    console.log(
      "Todos from prisma ",
      (await todos).map(({ id, text, done }) => ({ id, text, done }))
    );
    return [
      {
        id: "fake",
        text: "Fake todo",
        done: false,
      },
      {
        id: "fake 2",
        text: "Fake todo",
        done: false,
      },
    ];
  }),

  create: protectedProcedure
    .input(todoInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          text: input,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input,
        },
      });
    }),
});
