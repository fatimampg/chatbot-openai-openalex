import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import PublicationAuthors from "./PublicationAuthors";
import { getFullAuthorsString, getShortAuthorsString } from "../../utils";
import { publication1, publication2 } from "../../tests/testData";

let user: UserEvent;
const shortListPub1 = getShortAuthorsString(publication1);
const fullListPub1 = getFullAuthorsString(publication1);
const fullListPub2 = getFullAuthorsString(publication2);

describe("PublicationAuthors - less than 3 authors", () => {
  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should display authors", () => {
    render(<PublicationAuthors publication={publication1} />);
    const authors = screen.getByTestId("authors");

    expect(authors).toBeInTheDocument();
  });

  it("should display full list of authors and no button", async () => {
    render(<PublicationAuthors publication={publication2} />);
    if (publication2.authors.length <= 3) {
      const authors = screen.getByTestId("authors");
      const button = screen.queryByRole("button");

      expect(button).not.toBeInTheDocument();
      expect(authors).toHaveTextContent(fullListPub2);
    }
  });
});

describe("PublicationAuthors - more than 3 authors", () => {
  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should display button 'Show full list'", () => {
    render(<PublicationAuthors publication={publication1} />);
    if (publication1.authors.length > 3) {
      const button = screen.getByRole("button", { name: "Show full list" });

      expect(button).toBeInTheDocument();
    }
  });

  it("should display short list of authors", () => {
    render(<PublicationAuthors publication={publication1} />);
    if (publication1.authors.length > 3) {
      const authors = screen.getByTestId("authors");

      expect(authors).toHaveTextContent(shortListPub1);
    }
  });

  it("should display 'Show short list' button after click on 'Show full list", async () => {
    render(<PublicationAuthors publication={publication1} />);
    if (publication1.authors.length > 3) {
      const buttonShowFull = screen.getByRole("button", {
        name: "Show full list",
      });
      await user.click(buttonShowFull);
      const buttonShowShort = screen.getByRole("button", {
        name: "Show short list",
      });

      expect(buttonShowShort).toBeInTheDocument();
    }
  });

  it("should display full list of authors after click on 'Show full list' button", async () => {
    render(<PublicationAuthors publication={publication1} />);
    if (publication1.authors.length > 3) {
      const buttonShowFull = screen.getByRole("button", {
        name: "Show full list",
      });
      await user.click(buttonShowFull);
      const authors = screen.getByTestId("authors");

      expect(authors).toHaveTextContent(fullListPub1);
    }
  });
});
