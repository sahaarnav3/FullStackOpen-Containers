import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Todo from "./Todo";

test("renders todo text and displays not done status", async () => {
  const todo = {
    text: "Write Docker test",
    done: false,
  };

  render(
    <Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />,
  );

  expect(screen.getByText("Write Docker test")).toBeDefined();
  expect(screen.getByText("This todo is not done")).toBeDefined();
});
