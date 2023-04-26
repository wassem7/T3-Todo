import { z } from "zod";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./server/api/root";
type RouterOutputs = inferRouterOutputs<AppRouter>;
type allTodosType = RouterOutputs["todo"]["all"];
export type Todo = allTodosType[number];
export const todoInput = z
  .string({
    required_error: "Describe todo",
  })
  .min(1)
  .max(50);
