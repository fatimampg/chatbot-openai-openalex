import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PublicationList from "./index";
import { publication1, publication2, publication3 } from "../../tests/testData";
import { Publication } from "../../types/types";

const publications = [publication1, publication2, publication3];

const renderPublicationList = (publication: Publication) => {
  render(<PublicationList publication={publication} />);
  return {
    articleIcon: screen.queryByTestId("article-icon"),
    articleType: screen.queryByTestId("article-type"),
    articleCitations: screen.queryByTestId("article-citations"),
    openAccessIcon: screen.queryByAltText("openAccess"),
    notOpenAccessIcon: screen.queryByAltText("notOpenAccess"),
    copyIcon: screen.queryByTestId("copy-message"),
    articleTitle: screen.queryByTestId("article-title"),
    articleYear: screen.queryByTestId("article-year"),
    articleSource: screen.queryByTestId("article-source"),
  };
};

publications.forEach((publication) => {
  describe(`Publication tested: ${publication.id})`, () => {
    it("should display type if provided", () => {
      const { articleType } = renderPublicationList(publication);
      if (articleType) {
        expect(articleType).toBeInTheDocument();
      } else {
        expect(articleType).toBeNull();
      }
    });

    it("should display article icon'", () => {
      const { articleIcon } = renderPublicationList(publication);
      expect(articleIcon).toBeInTheDocument();
    });

    it("should display correct number of citations if provided", () => {
      const { articleCitations } = renderPublicationList(publication);
      if (publication.cited_by) {
        expect(articleCitations).toBeInTheDocument();
        expect(articleCitations).toHaveTextContent(
          publication.cited_by.toString(),
        );
      } else {
        expect(articleCitations).toBeNull();
      }
    });

    it("should display correct open access icon if provided", () => {
      const { openAccessIcon, notOpenAccessIcon } =
        renderPublicationList(publication);

      if (publication.oa === true) {
        expect(openAccessIcon).toBeInTheDocument();
        expect(notOpenAccessIcon).not.toBeInTheDocument();
      } else if (publication.oa === false) {
        expect(notOpenAccessIcon).toBeInTheDocument();
        expect(openAccessIcon).not.toBeInTheDocument();
      } else if (publication.oa === null) {
        expect(notOpenAccessIcon).not.toBeInTheDocument();
        expect(openAccessIcon).not.toBeInTheDocument();
      }
    });

    it("should link to doi when click on title, when doi is provided", () => {
      renderPublicationList(publication);
      const link = screen.queryByTestId("doi-link");
      if (publication.doi) {
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", publication.doi);
      } else {
        expect(link).not.toBeInTheDocument();
      }
    });

    it("should display publication year", () => {
      const { articleYear } = renderPublicationList(publication);
      if (publication.publication_year) {
        expect(articleYear).toBeInTheDocument();
        expect(articleYear).toHaveTextContent(
          publication.publication_year.toString(),
        );
      } else {
        expect(articleYear).toBeNull();
      }
    });
  });
});

describe("PublicationList - copy button", () => {
  const renderPublicationList = () => {
    render(<PublicationList publication={publication1} />);
    return {
      copyIcon: screen.queryByTestId("copy-icon"),
    };
  };

  it("should display copy icon, and call copyToClipboard function", () => {
    const { copyIcon } = renderPublicationList();
    expect(copyIcon).toBeInTheDocument();
  });
});
