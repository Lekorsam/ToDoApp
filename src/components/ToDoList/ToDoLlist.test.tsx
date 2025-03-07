import { render, screen, fireEvent } from '@testing-library/react';
import { Todo } from '../../types/types';
import TodoList from "./ToDoList";

const mockOnToggleChange = jest.fn();

const mockTasks: Todo[] = [
    { id: 1, text: 'Задача 1', completed: false },
    { id: 2, text: 'Задача 2', completed: true },
    { id: 3, text: 'Задача 3', completed: false },
];

describe('TodoList component', () => {
    beforeEach(() => {
        mockOnToggleChange.mockClear();
    });

    test('render all tasks', () => {
        render(<TodoList tasks={mockTasks} onToggleChange={mockOnToggleChange} />);
        const taskElements = screen.getAllByText(/Задача/);
        expect(taskElements).toHaveLength(mockTasks.length);
    });

    test('no filter for all tasks', () => {
        render(<TodoList tasks={mockTasks} onToggleChange={mockOnToggleChange} />);
        const allButton = screen.getByText('Все задачи');
        fireEvent.click(allButton);
        const taskElements = screen.getAllByText(/Задача/);
        expect(taskElements).toHaveLength(mockTasks.length);
    });

    test('filter active tasks', () => {
        render(<TodoList tasks={mockTasks} onToggleChange={mockOnToggleChange} />);
        const activeButton = screen.getByText('Активные задачи');
        fireEvent.click(activeButton);
        const taskElements = screen.getAllByText(/Задача/);
        expect(taskElements).toHaveLength(2);
        expect(taskElements[0]).toHaveTextContent('Задача 1');
        expect(taskElements[1]).toHaveTextContent('Задача 3');
    });

    test('filter completed tasks', () => {
        render(<TodoList tasks={mockTasks} onToggleChange={mockOnToggleChange} />);
        const completedButton = screen.getByText('Выполненные задачи');
        fireEvent.click(completedButton);
        const taskElements = screen.getAllByText(/Задача/);
        expect(taskElements).toHaveLength(1);
        expect(taskElements[0]).toHaveTextContent('Задача 2');
    });
});