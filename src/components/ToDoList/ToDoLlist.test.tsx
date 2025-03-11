import { render, screen, fireEvent } from "@testing-library/react";
import { Todo } from "../../types/types";
import TodoList from "./ToDoList";

const mockOnToggleChange = jest.fn();
const mockClearAllTasks = jest.fn();

const mockTasks: Todo[] = [
  { id: 1, text: "Задача 1", completed: false },
  { id: 2, text: "Задача 2", completed: true },
  { id: 3, text: "Задача 3", completed: false },
];

describe("TodoList component", () => {
  beforeEach(() => {
    mockOnToggleChange.mockClear();
  });

  test("render all tasks", () => {
    render(
      <TodoList
        tasks={mockTasks}
        onToggleChange={mockOnToggleChange}
        clearAllTasks={mockClearAllTasks}
      />,
    );
    const taskElements = screen.getAllByText(/Задача/);
    expect(taskElements).toHaveLength(mockTasks.length);
  });

  test("no filter for all tasks", () => {
    render(
      <TodoList
        tasks={mockTasks}
        onToggleChange={mockOnToggleChange}
        clearAllTasks={mockClearAllTasks}
      />,
    );
    const allButton = screen.getByText("Все задачи");
    fireEvent.click(allButton);
    const taskElements = screen.getAllByText(/Задача/);
    expect(taskElements).toHaveLength(mockTasks.length);
  });

  test("filter active tasks", () => {
    render(
      <TodoList
        tasks={mockTasks}
        onToggleChange={mockOnToggleChange}
        clearAllTasks={mockClearAllTasks}
      />,
    );
    const activeButton = screen.getByText("Активные задачи");
    fireEvent.click(activeButton);
    const taskElements = screen.getAllByText(/Задача/);
    expect(taskElements).toHaveLength(2);
    expect(taskElements[0]).toHaveTextContent("Задача 1");
    expect(taskElements[1]).toHaveTextContent("Задача 3");
  });

  test("filter completed tasks", () => {
    render(
      <TodoList
        tasks={mockTasks}
        onToggleChange={mockOnToggleChange}
        clearAllTasks={mockClearAllTasks}
      />,
    );
    const completedButton = screen.getByText("Выполненные задачи");
    fireEvent.click(completedButton);
    const taskElements = screen.getAllByText(/Задача/);
    expect(taskElements).toHaveLength(1);
    expect(taskElements[0]).toHaveTextContent("Задача 2");
  });

  test("Call clearAllTasks when click clear all button", () => {
    render(
      <TodoList
        tasks={mockTasks}
        onToggleChange={mockOnToggleChange}
        clearAllTasks={mockClearAllTasks}
      />,
    );
    const clearButton = screen.getByText("Очистить список дел");
    fireEvent.click(clearButton);
    expect(mockClearAllTasks).toHaveBeenCalledTimes(1);
  });

  test("Hide clear all button if the task list is empty", () => {
    render(
      <TodoList
        tasks={[]}
        onToggleChange={mockOnToggleChange}
        clearAllTasks={mockClearAllTasks}
      />,
    );
    expect(screen.queryByText("Очистить список дел")).toBeNull();
  });
});
