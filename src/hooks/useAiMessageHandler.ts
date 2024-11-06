import { useState } from "react";
import { Message } from "../types/types";
import { requestAiAnalysis } from "../utils";

export const useAiMessageHandler = () => {
  const [history, setHistory] = useState<Message[]>([]);
  const [isAnalysisInProgress, setIsAnalysisInProgress] =
    useState<boolean>(false); 
  const [publicationsReqState, setPublicationReqState] = useState<{
    [messageId: string]: {
      loaded: boolean;
      url: string;
      numberPage: number;
    };
  }>({});

  const handleMessageSubmitted = async (userMessage: Message) => {
    setIsAnalysisInProgress(true);
    const newHistory = [...history, userMessage];
    setHistory((prevHistory) => [...prevHistory, userMessage]);

    try {
      const receivedAiComments: Message = await requestAiAnalysis(newHistory);
      console.log("Commments received from OpenAI API", receivedAiComments);
      let newReceivedUrl: string = receivedAiComments.url || "";
      
      if (history.length > 1 &&  history[history.length - 1].url && receivedAiComments.url)  {
        const previeousReceivedUrl: string = history[history.length - 1].url || "";
        if (previeousReceivedUrl === receivedAiComments.url) {
          newReceivedUrl = "";
        } else {
          newReceivedUrl = receivedAiComments.url;
        }
      }
      setHistory((prevHistory) => [...prevHistory, {...receivedAiComments, url: newReceivedUrl}
        ]);

      if (newReceivedUrl !== "") {
                
        setPublicationReqState((prevState) => ({
          ...prevState,
          [receivedAiComments.id]: {
            loaded: true,
            url: newReceivedUrl || "",
            numberPage: 1,
          },
        }));
      } else {
        setPublicationReqState((prevState) => ({
          ...prevState,
          [receivedAiComments.id]: {
            loaded: false,
            url: newReceivedUrl || "",
            numberPage: 1,
          },
        }));
    }

      setIsAnalysisInProgress(false);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
      setIsAnalysisInProgress(false);
    }
  };
  return {
    history,
    setHistory,
    isAnalysisInProgress,
    publicationsReqState,
    setPublicationReqState,
    handleMessageSubmitted,
  };
};
