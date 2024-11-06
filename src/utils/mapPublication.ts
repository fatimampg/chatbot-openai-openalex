import { Publication, Authorship, PublicationRawItem } from "../types/types";
import { plainTextTransform } from "./abstract";

export const mapPublication = (item: PublicationRawItem): Publication => ({
  id: item.id ?? null,
  title: item.title ?? null,
  publication_year: item.publication_year ?? null,
  type: item.type ?? null,
  source: item.primary_location?.source?.display_name ?? null,
  doi: item.doi ?? null,
  authors: item.authorships.map(mapAuthorship),
  oa: item.open_access.is_oa ?? null,
  cited_by: item.cited_by_count ?? null,
  abstract: item.abstract_inverted_index
    ? plainTextTransform(item.abstract_inverted_index)
    : null,
});

export const mapAuthorship = (authorship: Authorship) => ({
  author_position: authorship.author_position ?? null,
  display_name: authorship.author.display_name,
  institution:
    authorship.institutions.length > 0
      ? authorship.institutions[0].display_name
      : null,
  orcid: authorship.author.orcid ?? null,
});
