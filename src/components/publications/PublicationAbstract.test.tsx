import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import PublicationAbstract from "./PublicationAbstract";
import { publication1 } from "../../tests/testData";

describe("PublicationAbstract", () => {
  let user: UserEvent;
  const renderPublicationAbstract = () => {
    render(<PublicationAbstract publication={publication1} />);
    return {
      buttonShow: screen.getByRole("button", { name: "Show Abstract" }),
    };
  };
  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should display button 'Show Abstract'", () => {
    const { buttonShow } = renderPublicationAbstract();

    expect(buttonShow).toBeInTheDocument();
  });

  it("should display button 'Hide Abstract' after user click on button", async () => {
    const { buttonShow } = renderPublicationAbstract();
    expect(buttonShow).toBeInTheDocument();
    await user.click(buttonShow);
    const buttonHide = screen.getByRole("button", { name: "Hide Abstract" });

    expect(buttonHide).toBeInTheDocument();
  });

  it("should display expected publication abstract when user clicks on Show Abstract", async () => {
    const { buttonShow } = renderPublicationAbstract();
    await user.click(buttonShow);
    const abstract = screen.getByTestId("abstract");

    expect(abstract).toBeInTheDocument();
    if (publication1.abstract) {
      expect(abstract).toHaveTextContent(publication1.abstract);
    }
  });
});
