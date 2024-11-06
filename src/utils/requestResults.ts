import axios from "axios";
import { v4 as uuid } from "uuid";
import { analyse } from "./ai";
import { mapPublication } from "./mapPublication";
import { Publication, Message } from "../types/types";

const createAiMessage = (
  comments: string,
  url: string,
  publications: Publication[],
): Message => ({
  id: uuid(),
  role: "ai",
  content: comments,
  publications: publications,
  url: url,
});

export const requestAiAnalysis = async (chatHistory: Message[]) => {
  console.log("1 - Received history, to be sent for ai analysis", chatHistory);
  const historyExclPubl = chatHistory.map(({ publications, ...rest }) => {
    return rest;
  });

  console.log("History sent to OpenAI API", historyExclPubl);

  const analysisResult = await analyse(historyExclPubl);

  let publicationsList: Publication[] = [];

  const aiComments: string = analysisResult?.comments || "";
  if (!aiComments) {
    console.log("No results where obtained from OPENAI");
  }

  const url: string = analysisResult?.url || "";

  if (aiComments) {
    if (url) {
      publicationsList = await getDataOpenAlex(url);
    } else {
      console.log("No URL was provided by OpenAlex API");
      publicationsList = [];
    }
  }
  return createAiMessage(aiComments, url, publicationsList);
};

export const getDataOpenAlex = async (url: string): Promise<Publication[]> => {
  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      console.error(
        `Error fetching data OpenAlex: Received status code ${response.status}`,
      );
      return [];
    }

    const resultsOpenAlex = response.data.results;

    if (!Array.isArray(resultsOpenAlex)) {
      console.error("OpenAlex results are not an array.");
      return [];
    }

    return resultsOpenAlex.map(mapPublication);
  } catch (error) {
    console.error("Error while requesting to OpenAlex API:", error);

    return [];
  }
};
