import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import z from "zod";
import { Message } from "../types/types";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    comments: z.string().describe(
      `You are an agent that will respond to users questions. Answer those questions and if user asks for help finding research publications, based on specific criteria such as search terms (theme/topic), number of citations, year or open access, then you should generate a query string according to the following instructions. Respond naturally and acknowledge it in your own words. 
      - If the users requests for publications BUT criteria are unclear and/or a search term appears to be a random combination of letters or doesn’t contain recognizable words: Respond by saying that the term doesn’t seem to match any known topic and ask the user to clarify or provide a more specific keyword.
      - If no criteria are provided: Offer to find publications on any topic, and show results based on publication year, number of citations or open-access.,
      - If search terms and criteria are clear: Tell the user that you'll present a list of publicashions matching those criteria. Use your own words!`,
    ),
    query: z.string().describe(
      `Generate query strings based on these criteria from user's message:
            1) **Publication Year**: could be a single or range of years.
                - Single year: "publication_year:{YEAR}" 
                (where {YEAR} is the specific year).
                - Range: "publication_year:%3E{YEAR_START},publication_year:%3C{YEAR_END}"
                (where {YEAR_START} and {YEAR_END} are the start and end years).
                - After: "publication_year:%3E{YEAR_L}"
                (where {YEAR_L} is the start year).
                - Before: "publication_year:%3C{YEAR_H}"
                (where {YEAR_H} is the start year).
            2) **Citations Count**: could be a single value or a range of values.
                - Single value: "cited_by_count:{NUMBER}"
                (where {NUMBER} is the specified citation count).
                - Range: "cited_by_count:%3E{LOW_CITATION_NUMBER},cited_by_count:%3C{HIGH_CITATION_NUMBER}"
                (where {LOW_CITATION_NUMBER} and {HIGH_CITATION_NUMBER} are the lower and upper bounds.
                - More than: "cited_by_count:%3E{CITATION_NUMBER_L}"
                (where {CITATION_NUMBER_L} is the minimum number of citations).
                - Less than: "cited_by_count:%3C{CITATION_NUMBER_H}"
                (where {CITATION_NUMBER_H} is the maximum number of citations).
            3) **Open Access**: "is_oa:true"
            4) **Search Terms**: "default.search:{CONCATENATED_MAIN_SEARCH_TERMS}"
                (where {CONCATENATED_MAIN_SEARCH_TERMS} is the string of main search terms concatenated using plus signs (+) to replace spaces).
            If more than one criterion is met, generate separate strings for each criterion and concatenate them using comma (,). The default.search related query must allways be present!. If no criteria are provided or are unclear, return empty query string (""). Add the strings allways in the same order (order of related strings (add the ones identified): Publication Year, Citations Count, Open Access, Search Terms): !`,
    ),
  }),
);

const getPrompt = async (messages: Message[]) => {
  const formattedMessages = messages.map(
    (message) =>
      `${message.role}: ${message.content} ${message.role === "ai" && message.publications && message.publications.length > 0 ? ` --> ${JSON.stringify(message.publications)}` : ""}`,
  );

  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template: `Analyse the following conversation (messages given by you and by the user, are identified with "role: ai" and "role: user", respectively) and respond to the last user message. Respond naturally and be accurate. Follow the instructions given and ensure that your response follows the required format strictly, no matter what! If user ask for publications (indicate search terms and other criteria), do not search or check for publications that include the provided search terms and criteria defined by the user! Concerning publications, your goal is to translate users' requirements and generate a query string following the instructions. \n {format_instructions} \n {conversation}`,
    inputVariables: ["conversation"],
    partialVariables: { format_instructions },
  });
  const input = await prompt.format({
    conversation: formattedMessages,
  });
  console.log("Received message - from OPENAI:", input);
  return input;
};

export const analyse = async (chatHistory: Message[]) => {
  const input = await getPrompt(chatHistory);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const model = new ChatOpenAI({
    apiKey,
    temperature: 0,
    model: "gpt-4o-mini",
  });

  try {
    const result = await model.invoke(input);
    const rawContent = String(result.content);

    const contentString = rawContent.replace(/```json\n|```/g, "").trim();
    const content = JSON.parse(contentString);
    const comments = content.comments;
    const query = content.query;
    console.log(query, "Query string generated by GPT-4");
    let url = "";
    if (query) {
      url = `https://api.openalex.org/works?filter=${query}&select=id,relevance_score,title,type,primary_location,publication_year,authorships,doi,open_access,abstract_inverted_index,cited_by_count&sort=relevance_score:desc`;
    }

    return { comments, url };
  } catch (error) {
    console.log(error);
    console.error(`Error while requesting to OpenAI API: ${error}`);
  }
};
