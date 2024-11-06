import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AiMessage from "./AiMessage";
import { Message } from "../../types/types";
import { publication1, publication2 } from "../../tests/testData";

const baseMessage: Message = {
  id: "00000000-00000-00000",
  role: "ai",
  content: "",
  publications: [],
  url: "",
};

const noContentmessage: string =
  "Oops! Something went wrong. Please try again later.";
const noPublicationsmessage: string =
  "Sorry I couldn't find any publications about that topic or matching those criteria. Please, consider a broader topic or less restrictive criteria, if that is the case.";

const mockNewPublLoaded = false;
const mockOnLoadMorePublications = vi.fn();
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("AiMessage - no publications provided", () => {
  it("should display custom msg when there is no content", () => {
    render(
      <AiMessage
        message={baseMessage}
        onLoadMorePublications={mockOnLoadMorePublications}
        newPublLoaded={mockNewPublLoaded}
      />,
    );

    expect(screen.getByText(noContentmessage)).toBeInTheDocument();
  });

  it("should display the received msg content when no url was generated", () => {
    const testMsg = { ...baseMessage, content: "test message" };
    render(
      <AiMessage
        message={testMsg}
        onLoadMorePublications={mockOnLoadMorePublications}
        newPublLoaded={mockNewPublLoaded}
      />,
    );
    expect(screen.getByText("test message")).toBeInTheDocument();
  });

  it("should display custom message when, with a valid url, no publications were found", () => {
    const testMsg = { ...baseMessage, content: "test message", url: "testul" };
    render(
      <AiMessage
        message={testMsg}
        onLoadMorePublications={mockOnLoadMorePublications}
        newPublLoaded={mockNewPublLoaded}
      />,
    );
    expect(screen.getByText(noPublicationsmessage)).toBeInTheDocument();
  });
});

describe("AiMessage - publications provided", () => {
  const testMsg = {
    ...baseMessage,
    content: "test message",
    url: "testurl",
    publications: [publication1, publication2],
  };
  const renderAiMessage = () => {
    render(
      <AiMessage
        message={testMsg}
        onLoadMorePublications={mockOnLoadMorePublications}
        newPublLoaded={mockNewPublLoaded}
      />,
    );
    return {
      content: screen.getByText("test message"),
    };
  };

  it("should display received message content", () => {
    const { content } = renderAiMessage();
    expect(content).toBeInTheDocument();
  });

  it("should render the publicationList component, with the correct number of publications", () => {
    renderAiMessage();
    const list = screen.getAllByTestId("publications-list");
    expect(list.length).toEqual(testMsg.publications.length);
  });

  it("should display button 'Load more publications' when new publications are loaded", () => {
    render(
      <AiMessage
        message={testMsg}
        onLoadMorePublications={mockOnLoadMorePublications}
        newPublLoaded={true}
      />,
    );
    const button = screen.getByRole("button", {
      name: /load more publications/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("should call onLoadMorePublications when 'Load more publications' button is clicked, and reflect changes in page number", async () => {
    render(
      <AiMessage
        message={testMsg}
        onLoadMorePublications={mockOnLoadMorePublications}
        newPublLoaded={true}
      />,
    );
    const button = screen.getByRole("button", {
      name: /load more publications/i,
    });
    const user = userEvent.setup();
    await user.click(button);
    expect(mockOnLoadMorePublications).toHaveBeenCalledWith(testMsg.id, 1);
    await user.click(button);
    expect(mockOnLoadMorePublications).toHaveBeenCalledWith(testMsg.id, 2);
  });

  it("should display button 'No more publications to load' when new publications are not loaded", () => {
    render(
      <AiMessage
        message={testMsg}
        onLoadMorePublications={mockOnLoadMorePublications}
        newPublLoaded={false}
      />,
    );
    const button = screen.getByRole("button", {
      name: /no more publications/i,
    });
    expect(button).toBeInTheDocument();
  });
});
