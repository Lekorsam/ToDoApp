import { render, screen } from "@testing-library/react";
import TodoItem from "./ToDoItem";
import { Todo } from "../../types/types";

const task: Todo = { id: 1, text: "Покормить пегасов", completed: false };
const mockToggleChange = jest.fn();

describe("TodoItem Component", () => {
  test("renders todo text and checkbox", () => {
    render(<TodoItem task={task} onToggleChange={mockToggleChange} />);
    expect(screen.getByText("Покормить пегасов")).toBeInTheDocument();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("checkbox is off if task not completed", () => {
    render(<TodoItem task={task} onToggleChange={mockToggleChange} />);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).not.toBeChecked();
  });

  test("checkbox is on if task completed", () => {
    const completedTask = { ...task, completed: true };
    render(<TodoItem task={completedTask} onToggleChange={mockToggleChange} />);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeChecked();
  });
});
