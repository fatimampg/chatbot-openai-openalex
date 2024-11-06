import { describe, expect, it } from "vitest";
import { plainTextTransform } from "./abstract";
import { AbstractInvertedIndex } from "../types/types";

const textInvertedIndex: AbstractInvertedIndex = {
  This: [0],
  text: [1, 18],
  was: [2],
  written: [3],
  to: [4, 11],
  test: [5],
  abstract: [6],
  utility: [7],
  function: [8],
  that: [9],
  aims: [10],
  convert: [12],
  an: [13],
  inverted: [14],
  index: [15],
  into: [16],
  plain: [17],
};

const textPlainText =
  "This text was written to test abstract utility function that aims to convert an inverted index into plain text";

describe("Utils: abstract (inverted index)", () => {
  it("should transform into plain text", () => {
    const transformed = plainTextTransform(textInvertedIndex);

    expect(transformed).toEqual(textPlainText);
  });
});
