import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
uuidv4();
export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    const task = todo.trim();
    if (task.length === 0) {
      alert("Add some tasks!");
      return;
    }
    if (todos.some((t) => t.task === task)) {
      alert("task already exists");
      return;
    }
    if (task.length >= 30) {
      alert("maximum 30 characters allowed");
      return;
    }
    if (todos.length >= 5) {
      alert("maximum 5 todos allowed");
      return;
    }
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);

    console.log(todos);
  };
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const deleteTodo = (id) => {
    alert("you really want to  delte this todo");
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const editTask = (task, id) => {
    if (task.trim().length === 0) {
      alert("empty task not allowed");
      return;
    }
    if (task.length >= 30) {
      alert("only maximum 30 charcters are allowed");
      return;
    }
    if (todos.some((t) => t.task === task.trim() && t.id !== id)) {
      alert("task already exists");
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
