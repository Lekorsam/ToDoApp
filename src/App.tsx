import React, { useEffect, useState } from "react";
import { Todo } from "./types/types";
import styles from "./App.module.scss";
import TodoInput from "./components/ToDoInput";
import TodoList from "./components/ToDoList";

const STORAGE_KEY = "todoList";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTodo = (text: string) => {
    const newTask: Todo = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleToggleChange = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>ToDo List</h1>
      <TodoInput onAddTask={handleAddTodo} />
      <TodoList tasks={tasks} onToggleChange={handleToggleChange} />
    </div>
  );
};

export default App;
