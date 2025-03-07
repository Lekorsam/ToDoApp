import React, { useState } from "react";
import styles from "./ToDoInput.module.scss";

type TodoInputProps = {
  onAddTask: (task: string) => void;
};

const TodoInput: React.FC<TodoInputProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedInput = inputValue.trim();
    if (trimmedInput) {
      onAddTask(trimmedInput);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoInput}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Что нужно сделать?"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Добавить
      </button>
    </form>
  );
};

export default TodoInput;
