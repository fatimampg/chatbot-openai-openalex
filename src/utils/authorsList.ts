import { Author, Publication } from "../types/types";

export function getFullAuthorsString(publication: Publication) {
  const authorsArray = publication.authors.map(
    (author: Author) => author.display_name,
  );
  return authorsArray.join(", ");
}

export function getShortAuthorsString(publication: Publication) {
  const authorsShortArray = publication.authors
    .slice(0, 3)
    .map((author: Author) => author.display_name);

  return authorsShortArray.join(", ") + ", et al.";
}
