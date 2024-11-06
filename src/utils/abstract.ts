import { AbstractInvertedIndex } from "../types/types";

export const plainTextTransform = (
  abstract_inverted_index: AbstractInvertedIndex,
): string => {
  const arrayOfArrays = Object.entries(abstract_inverted_index); 
  type WordPositionsPair = [string, number];
  const wordPositionPairArray: WordPositionsPair[] = [];

  arrayOfArrays.forEach(([word, position]) => {
    position.forEach((position) => {
      const newWordPosition: WordPositionsPair = [word, position]; 
      wordPositionPairArray.push(newWordPosition);
    });
  });

  wordPositionPairArray.sort((a, b) => a[1] - b[1]); 
  const abstract: string = wordPositionPairArray
    .map((item) => item[0])
    .join(" ");

  return abstract;
};
