import { describe, expect, it } from "vitest";
import { getFullAuthorsString, getShortAuthorsString } from "./authorsList";
import {
  author1,
  author2,
  author3,
  author4,
  publication1,
} from "../tests/testData";

const fullList: string = `${author1.display_name}, ${author2.display_name}, ${author3.display_name}, ${author4.display_name}`;

const shortList: string = `${author1.display_name}, ${author2.display_name}, ${author3.display_name}, et al.`;

describe("Utils: authorsList", () => {
  it("should return short list - max.: 3 authors", () => {
    const short = getShortAuthorsString(publication1);

    expect(short).toEqual(shortList);
  });

  it("should return full list - all authors", () => {
    const full = getFullAuthorsString(publication1);

    expect(full).toEqual(fullList);
  });
});
