import { useState } from "react";
import { Publication } from "../types/types";
import { getFullAuthorsString } from "../utils";

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = async (publication: Publication) => {
    const authorsFullList: string = getFullAuthorsString(publication);

    const publicationInfo: string = `
    Type: ${publication.type}
    Title: ${publication.title}
    Year: ${publication.publication_year}
    Source: ${publication.source}
    DOI: ${publication.doi}
    Citations: ${publication.cited_by}
    Open Access: ${publication.oa ? "Yes" : "No"}
    Authors: ${authorsFullList}.
    Abstract: ${publication.abstract ? publication.abstract : "not available"}`;

    try {
      await navigator.clipboard.writeText(publicationInfo);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  };
  return { isCopied, copyToClipboard };
};
