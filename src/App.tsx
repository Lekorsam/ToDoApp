import React, { useState } from 'react';
import { Todo } from './types/types';
import styles from './App.module.scss';
import TodoInput from "./components/ToDoInput";
import TodoList from "./components/ToDoList";

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAddTodo = (text: string) => {
        const newTodo: Todo = { id: Date.now(), text, completed: false };
        setTodos([...todos, newTodo]);
    };

    const handleToggleCompleted = (id: number) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    return (
        <div className={styles.app}>
            <h1 className={styles.title}>ToDo List</h1>
            <TodoInput onAddTask={handleAddTodo} />
            <TodoList tasks={todos} onToggleChange={handleToggleCompleted} />
        </div>
    );
};

export default App;