import { beforeEach, describe, expect, it, vi } from "vitest";
import { requestAiAnalysis } from "./requestResults";
import * as ai from "./ai";
import { history } from "../tests/testData";

const expectedSentHistory = [
  {
    id: "testid1",
    role: "user",
    content: "user message content",
  },
  {
    id: "testid2",
    role: "ai",
    content: "test content",
    url: "",
  },
];

//mock module:
vi.mock("./ai", () => ({
  analyse: vi.fn(),
}));

describe("Utils: requestResults.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should call analyse function (in requestAiAnalysis) and pass the history excluding publications)", async () => {
    await requestAiAnalysis(history);
    expect(ai.analyse).toHaveBeenCalled();
    expect(ai.analyse).toHaveBeenCalledWith(expectedSentHistory);
  });

  it("should return ai message with [] publications, if url is not present", async () => {
    vi.mock("./ai", () => ({
      analyse: vi.fn().mockResolvedValue({
        comments: "test",
        url: "",
      }),
    }));

    const resultAi = await requestAiAnalysis(history);
    const expectedResultAi = {
      id: expect.any(String),
      role: "ai",
      content: "test",
      publications: [],
      url: "",
    };
    expect(resultAi).toEqual(expectedResultAi);
  });

  // it("should call getDataOpenAlex function and pass the url, if aiComments and url are present (ai response)", () => {});
});
