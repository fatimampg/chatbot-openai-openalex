/// <reference types="vite/client" />

export interface Message {
  id: string;
  role: "ai" | "user";
  content: string;
  publications?: Publication[];
  url?: string;
}

export interface Authorship {
  author_position: string | null;
  author: {
    id: string | null;
    display_name: string | null;
    orcid: string | null;
  };
  institutions: Institution[];
}

export interface AbstractInvertedIndex {
  [key: string]: number[];
}

export interface Institution {
  id: string | null;
  display_name: string | null;
}

export interface PublicationRawItem {
  id: string | null;
  type: string | null;
  title: string | null;
  doi: string | null;
  publication_year: number | null;
  authorships: Authorship[];
  abstract_inverted_index: AbstractInvertedIndex | null;
  open_access: {
    is_oa: boolean | null;
  };
  source: {
    display_name: string | null;
  };
  relevance_score: number | null;
  cited_by_count: number | null;
  primary_location: {
    source: {
      display_name: string | null;
    };
  };
}

export interface Author {
  author_position: string | null;
  display_name: string | null;
  institution: string | null; // only the 1st institution will be added
  orcid: string | null;
}

export interface Publication {
  id: string | null;
  type: string | null;
  title: string | null;
  publication_year: number | null;
  authors: Author[];
  doi: string | null;
  source: string | null;
  oa: boolean | null;
  abstract?: string | null;
  cited_by: number | null;
}
