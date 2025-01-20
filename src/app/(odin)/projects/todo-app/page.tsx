"use client";

import Card from "@/components/shared/Card";
import TodoList from "@/components/TodoApp/TodoList";

const Index = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-16">
      <Card>
        <h1 className="text-3xl font-bold text-center my-8">Todo List App</h1>
        <TodoList />
      </Card>
    </div>
  );
};

export default Index;
