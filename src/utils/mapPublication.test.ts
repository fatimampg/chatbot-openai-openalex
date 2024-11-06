import { describe, expect, it } from "vitest";
import { mapPublication, mapAuthorship } from "./mapPublication";
import {
  rawPublication2,
  publication2,
  authorship1,
  author1,
} from "../tests/testData";

describe("Utils: mapPublication", () => {
  it("should map rawPublication obj into a Publication obj", () => {
    const publ = mapPublication(rawPublication2);

    expect(publ).toEqual(publication2);
  });

  it("should map Authorship obj into an Author obj", () => {
    const author = mapAuthorship(authorship1);

    expect(author).toEqual(author1);
  });
});
