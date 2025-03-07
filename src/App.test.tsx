import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  sessionStorage.clear();
  jest.spyOn(Storage.prototype, "setItem");
  jest.spyOn(Storage.prototype, "getItem");
});

test("Load tasks from session storage after updating page", () => {
  const mockTasks = JSON.stringify([
    { id: 1, text: "Test Task", completed: false },
  ]);
  sessionStorage.setItem("todoList", mockTasks);
  render(<App />);
  expect(screen.getByText("Test Task")).toBeInTheDocument();
});

test("Add new task", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Что нужно сделать?");
  const addButton = screen.getByText("Добавить");
  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(addButton);
  expect(screen.getByText("New Task")).toBeInTheDocument();
  expect(sessionStorage.setItem).toHaveBeenCalled();
});

test("Test switch done/not done task", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Что нужно сделать?");
  const addButton = screen.getByText("Добавить");
  fireEvent.change(input, { target: { value: "Купить ящерицу" } });
  fireEvent.click(addButton);
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});
