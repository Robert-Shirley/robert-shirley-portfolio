// pages/projects/todo-list.tsx

import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/useLocalStorage";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string; // ISO date string
}

const TodoList: React.FC = () => {
  const { toast } = useToast();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [
    {
      id: 1,
      text: "Pet a dog",
      completed: false,
      dueDate: addDays(new Date(), 1).toISOString().split("T")[0],
    },
    {
      id: 2,
      text: "Buy groceries",
      completed: false,
      dueDate: addDays(new Date(), 2).toISOString().split("T")[0],
    },
    {
      id: 3,
      text: "Watch Youtube until 3am",
      completed: true,
      dueDate: addDays(new Date(), 5).toISOString().split("T")[0],
    },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [newDueDate, setNewDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingDueDate, setEditingDueDate] = useState("");

  const [showForm, setShowForm] = useState(false);

  const addTodo = () => {
    if (newTodo.trim() === "") {
      toast({
        title: "Error",
        description: "Todo cannot be empty",
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      });
      return;
    }
    const todo: Todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      dueDate: newDueDate || new Date().toISOString().split("T")[0],
    };
    setTodos([...todos, todo]);
    setNewTodo("");
    setNewDueDate(new Date().toISOString().split("T")[0]);
    setShowForm(false);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (
    id: number,
    currentText: string,
    currentDueDate: string
  ) => {
    setEditingTodoId(id);
    setEditingText(currentText);
    setEditingDueDate(currentDueDate);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
    setEditingText("");
    setEditingDueDate("");
  };

  const saveEditing = (id: number) => {
    if (editingText.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: editingText, dueDate: editingDueDate }
          : todo
      )
    );
    setEditingTodoId(null);
    setEditingText("");
    setEditingDueDate("");
  };

  // Sort todos: incomplete first
  const sortedTodos = [...todos].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        {showForm ? (
          <div className="mb-6 border p-4 rounded-sm">
            <div className="mb-4">
              <label
                htmlFor="newTodo"
                className="block text-sm font-medium text-gray-700"
              >
                Todo
              </label>
              <input
                id="newTodo"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="mt-1 block w-full border rounded px-4 py-2"
                placeholder="Enter your task"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newDueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                id="newDueDate"
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="mt-1 block w-full border rounded px-4 py-2"
              />
            </div>
            <button
              onClick={addTodo}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <AiOutlinePlus size={20} />
              <span className="ml-2">Add Todo</span>
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="w-full bg-red-400 text-white px-4 py-2 rounded flex items-center justify-center mt-2"
            >
              <span className="ml-2">Close</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-emerald-500 text-white px-4 py-2 rounded flex items-center justify-center mb-6"
          >
            <span className="ml-2">Create New Todo</span>
          </button>
        )}

        {hasMounted ? (
          <ul className="space-y-2">
            {sortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                startEditing={startEditing}
                editingTodoId={editingTodoId}
                editingText={editingText}
                setEditingText={setEditingText}
                editingDueDate={editingDueDate}
                setEditingDueDate={setEditingDueDate}
                cancelEditing={cancelEditing}
                saveEditing={saveEditing}
              />
            ))}
          </ul>
        ) : (
          // Optionally, render a placeholder or skeleton
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
