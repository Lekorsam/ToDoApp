import React, { useEffect, useState } from "react";
import { TasksFilter, Todo } from "../../types/types";
import styles from "./ToDoList.module.scss";
import TodoItem from "../ToDoItem";

type TodoListProps = {
  tasks: Todo[];
  onToggleChange: (id: number) => void;
  clearAllTasks: () => void;
};

const STORAGE_KEY = "activeFilter";

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  onToggleChange,
  clearAllTasks,
}) => {
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

  const filterButton = (currentFilter: TasksFilter, name: string) => {
    return (
      <button
        onClick={() => setFilter(currentFilter)}
        className={`${styles.toggleButton} ${filter === currentFilter ? styles.active : ""}`}
      >
        {name}
      </button>
    );
  };

  const getClearButton = () => {
    if (tasks.length > 0)
      return (
        tasks && (
          <div className={styles.clearAllButtonWrapper}>
            <button
              onClick={() => clearAllTasks()}
              className={styles.clearAllButton}
            >
              Очистить список дел
            </button>
          </div>
        )
      );
  };

  return (
    <div className={styles.todoListWrapper}>
      <div className={styles.buttonWrapper}>
        {filterButton(TasksFilter.All, "Все задачи")}
        {filterButton(TasksFilter.Active, "Активные задачи")}
        {filterButton(TasksFilter.Completed, "Выполненные задачи")}
      </div>
      <div className={styles.section}>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} task={todo} onToggleChange={onToggleChange} />
        ))}
      </div>
      {getClearButton()}
    </div>
  );
};

export default TodoList;
