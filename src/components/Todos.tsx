import React from "react";
import { api } from "@/utils/api";
import Todo from "@/components/Todo";
const Todos = () => {
  const { data: todos, isError, isLoading } = api.todo.all.useQuery();
  if (isLoading) return <div>Loading 🔃</div>;
  if (isError) return <div>Error feteching❌</div>;
  return (
    <>
      {todos.length
        ? todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} />;
          })
        : "Create your first todo !"}
    </>
  );
};

export default Todos;
