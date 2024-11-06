import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import UserMessage from "./UserMessage";
import { Message } from "../../types/types";

const message: Message = {
  id: "930c3416-74f4-4e7d-8aea-ad389a336ea5",
  role: "user",
  content: "test message",
};

describe("UserMessage", () => {
  it("should display user message content", () => {
    render(<UserMessage message={message} />);

    expect(screen.getByText("test message")).toBeInTheDocument();

    const msg = screen.getByText("test message");
    expect(msg).toHaveTextContent("test message");
  });
});
