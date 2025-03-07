import { render, screen, fireEvent } from "@testing-library/react";
import TodoInput from "./ToDoInput";

const mockOnAddTask = jest.fn();

describe("TodoInput component", () => {
  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  test("render input and add button", () => {
    render(<TodoInput onAddTask={mockOnAddTask} />);
    const inputElement = screen.getByPlaceholderText("Что нужно сделать?");
    const buttonElement = screen.getByText("Добавить");
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("clear input when data was added", () => {
    render(<TodoInput onAddTask={mockOnAddTask} />);
    const inputElement = screen.getByPlaceholderText("Что нужно сделать?");
    const buttonElement = screen.getByText("Добавить");
    fireEvent.change(inputElement, { target: { value: "Помыть каструльку" } });
    fireEvent.click(buttonElement);
    // @ts-ignore
    expect(inputElement.value).toBe("");
  });
});
