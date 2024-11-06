import {
  Author,
  Publication,
  Authorship,
  PublicationRawItem,
  Message,
} from "../types/types";

export const author1: Author = {
  author_position: "first",
  display_name: "John Doe",
  institution: "institution1",
  orcid: "https://orcid.org/0000-0000-0000-0001",
};
export const author2: Author = {
  ...author1,
  author_position: "second",
  display_name: "Jane Doe",
  orcid: "https://orcid.org/0000-0000-0000-0002",
};
export const author3: Author = {
  ...author1,
  author_position: "third",
  display_name: "Mary Brown",
  orcid: "https://orcid.org/0000-0000-0000-0002",
};
export const author4: Author = {
  ...author1,
  author_position: "fourth",
  display_name: "Bob Smith",
  orcid: "https://orcid.org/0000-0000-0000-0002",
};

// publication1 must contain more than 3 authors!
export const publication1: Publication = {
  id: "https://openalex.org/W0000001",
  type: "book-chapter",
  title: "test book",
  publication_year: 2024,
  authors: [author1, author2, author3, author4],
  doi: "https://doi.org/00.0000/0000-0-00-00000",
  source: "source test",
  oa: true,
  abstract:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  cited_by: 1,
};

// publication2 must contain less than 3 authors!
export const publication2: Publication = {
  ...publication1,
  authors: [author1, author2],
  id: "https://openalex.org/W0000002",
  abstract: null,
};

export const publication3: Publication = {
  id: "https://openalex.org/W0000003",
  type: null,
  title: null,
  publication_year: null,
  authors: [],
  doi: null,
  source: null,
  oa: null,
  abstract: null,
  cited_by: null,
};


export const authorship1: Authorship = {
  author_position: author1.author_position,
  author: {
    id: "author 1 id",
    display_name: author1.display_name,
    orcid: author1.orcid,
  },
  institutions: [
    {
      id: "inst1",
      display_name: author1.institution,
    },
    {
      id: "inst2",
      display_name: author1.institution,
    },
  ],
};

export const authorshipArrayPubl2: Authorship[] = [
  {
    author_position: author1.author_position,
    author: {
      id: "author 1 id",
      display_name: author1.display_name,
      orcid: author1.orcid,
    },
    institutions: [
      {
        id: "inst1",
        display_name: author1.institution,
      },
      {
        id: "inst2",
        display_name: author1.institution,
      },
    ],
  },
  {
    author_position: author2.author_position,
    author: {
      id: "author 2 id",
      display_name: author2.display_name,
      orcid: author2.orcid,
    },
    institutions: [
      {
        id: "inst1",
        display_name: author2.institution,
      },
      {
        id: "inst2",
        display_name: author2.institution,
      },
    ],
  },
];

export const rawPublication2: PublicationRawItem = {
  id: publication2.id,
  type: publication2.type,
  title: publication2.title,
  doi: publication2.doi,
  publication_year: publication2.publication_year,
  authorships: authorshipArrayPubl2,
  abstract_inverted_index: null,
  open_access: {
    is_oa: true,
  },
  source: {
    display_name: publication2.source,
  },
  relevance_score: 1254.26,
  cited_by_count: publication2.cited_by,
  primary_location: {
    source: {
      display_name: publication2.source,
    },
  },
};

export const history: Message[] = [
  {
    id: "testid1",
    role: "user",
    content: "user message content",
  },
  {
    id: "testid2",
    role: "ai",
    content: "test content",
    publications: [publication1, publication2],
    url: "",
  },
];
