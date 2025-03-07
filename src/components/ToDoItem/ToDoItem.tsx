import React, { useState } from 'react';
import { Todo } from '../../types/types';
import styles from './ToDoItem.module.scss';

type TodoItemProps = {
    task: Todo;
    onToggleChange: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggleChange }) => {
    const [isChecked, setIsChecked] = useState(task.completed);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setTimeout(() => {
            onToggleChange(task.id);
        }, 300); // for cool animation
    };

    return (
        <div
            className={`${styles.todoItem} ${isChecked ? styles.completed : ''}`}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className={styles.checkbox}/>
            <span className={styles.todoText}>{task.text}</span>
        </div>
    );
};

export default TodoItem;