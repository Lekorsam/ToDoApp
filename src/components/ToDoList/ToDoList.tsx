import React, { useEffect, useState } from "react";
import { TasksFilter, Todo } from "../../types/types";
import styles from "./ToDoList.module.scss";
import TodoItem from "../ToDoItem";

type TodoListProps = {
  tasks: Todo[];
  onToggleChange: (id: number) => void;
};

const STORAGE_KEY = "activeFilter";

const TodoList: React.FC<TodoListProps> = ({ tasks, onToggleChange }) => {
  const [filter, setFilter] = useState<TasksFilter>(() => {
    const savedFilter = localStorage.getItem(STORAGE_KEY);
    return savedFilter ? JSON.parse(savedFilter) : TasksFilter.All;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filter));
  }, [filter]);

  const filteredTodos =
    filter === TasksFilter.All
      ? tasks
      : tasks.filter((todo) =>
          filter === TasksFilter.Completed ? todo.completed : !todo.completed,
        );

  return (
    <div className={styles.todoListWrapper}>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => setFilter(TasksFilter.All)}
          className={`${styles.toggleButton} ${filter === TasksFilter.All ? styles.active : ""}`}
        >
          Все задачи
        </button>
        <button
          onClick={() => setFilter(TasksFilter.Active)}
          className={`${styles.toggleButton} ${filter === TasksFilter.Active ? styles.active : ""}`}
        >
          Активные задачи
        </button>
        <button
          onClick={() => setFilter(TasksFilter.Completed)}
          className={`${styles.toggleButton} ${filter === TasksFilter.Completed ? styles.active : ""}`}
        >
          Выполненные задачи
        </button>
      </div>

      <div className={styles.section}>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} task={todo} onToggleChange={onToggleChange} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
