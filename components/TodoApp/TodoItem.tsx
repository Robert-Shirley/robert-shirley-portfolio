// components/TodoItem.tsx

import classNames from "@/functions/classNames";
import {
  differenceInDays,
  endOfDay,
  isPast,
  parseISO,
  startOfDay,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaTrashAlt, FaUndo } from "react-icons/fa";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string; // Added dueDate to the interface
}

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  startEditing: (
    id: number,
    currentText: string,
    currentDueDate: string
  ) => void;
  editingTodoId: number | null;
  editingText: string;
  setEditingText: React.Dispatch<React.SetStateAction<string>>;
  editingDueDate: string;
  setEditingDueDate: React.Dispatch<React.SetStateAction<string>>;
  cancelEditing: () => void;
  saveEditing: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
  startEditing,
  editingTodoId,
  editingText,
  setEditingText,
  editingDueDate,
  setEditingDueDate,
  cancelEditing,
  saveEditing,
}) => {
  console.log(todo);
  const isEditing = editingTodoId === (todo?.id! || "") || false;

  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [isOverdue, setIsOverdue] = useState<boolean>(false);

  useEffect(() => {
    const dueDate = parseISO(todo.dueDate);

    setDaysRemaining(
      differenceInDays(endOfDay(dueDate), startOfDay(new Date()))
    );
    setIsOverdue(isPast(dueDate) && !todo.completed);
  }, [todo.dueDate, todo.completed]);
  // Calculate due date information

  if (!todo) {
    return null;
  }

  return (
    <li
      className={classNames(
        "flex items-center justify-between p-4 rounded border border-gray-200",
        todo.completed ? "bg-gray-200" : "bg-white"
      )}
    >
      {isEditing ? (
        <>
          <div className="flex-grow mr-2">
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="w-full border px-2 py-1 mb-2 rounded"
            />
            <input
              type="date"
              value={editingDueDate}
              onChange={(e) => setEditingDueDate(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <button
            onClick={() => saveEditing(todo.id)}
            className="text-green-500 mr-2 hover:text-green-600"
            title="Save"
          >
            <FaCheck />
          </button>
          <button
            onClick={cancelEditing}
            className="text-gray-500 hover:text-gray-600"
            title="Cancel"
          >
            <FaUndo />
          </button>
        </>
      ) : (
        <>
          <div
            className={classNames(
              "flex-grow mr-2",
              todo.completed ? "line-through text-gray-500" : ""
            )}
          >
            <div>{todo.text}</div>
            <div className="text-sm text-gray-500">
              {todo.completed ? (
                <span className="text-green-500">Completed</span>
              ) : isOverdue ? (
                <span className="text-red-500">Overdue</span>
              ) : (
                <span>
                  Due in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleComplete(todo.id)}
              className="text-blue-500 mr-2"
              title={todo.completed ? "Undo" : "Complete"}
            >
              {todo.completed ? <FaUndo /> : <FaCheck />}
            </button>
            <button
              onClick={() => startEditing(todo.id, todo.text, todo.dueDate)}
              className="text-yellow-500 mr-2"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500"
              title="Delete"
            >
              <FaTrashAlt />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
