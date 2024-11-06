import { useRef, useEffect, useState } from "react";
import ChatMessage from "./chat-messages";
import UserInput from "./user-input/UserInput";
import { useAiMessageHandler } from "../hooks/useAiMessageHandler";
import { useUserFirstTyping } from "../hooks/useUserFirstTyping";
import { getDataOpenAlex } from "../utils";
import { Stack, Box } from "@mui/material";
import { grey } from "@mui/material/colors";

interface ChatbotProps {
  onHeaderRemoval: () => void;
}

const respMargin = (xs: string, sm: string, md: string) => ({
  xs,
  sm,
  md,
});

const Chatbot: React.FC<ChatbotProps> = ({ onHeaderRemoval }) => {
  const {
    history,
    setHistory,
    handleMessageSubmitted,
    publicationsReqState,
    setPublicationReqState,
  } = useAiMessageHandler();

  const { isUserTyping, firstTypingDone, handleUserTyping } =
    useUserFirstTyping({ onHeaderRemoval });

  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    console.log("history:", history);
  }, [history]);

  useEffect(() => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isUserTyping]);

  const loadMorePublications = async (messageId: string) => {
    const message = history.find((message) => message.id === messageId);

    if (!message) {
      console.log("No message received... Check this out");
      return;
    }

    const { url, numberPage } = publicationsReqState[messageId] || {
      url: "",
      numberPage: 1,
    };

    const newUrl = `${url}&per_page=25&page=${numberPage + 1}`;
    const newPublicationsList = await getDataOpenAlex(newUrl);

    if (newPublicationsList.length > 0) {
      setPublicationReqState((prevState) => ({
        ...prevState,
        [messageId]: {
          loaded: true,
          url: url,
          numberPage: numberPage + 1,
        },
      }));

      const updatedMessage = {
        ...message,
        publications: [...(message.publications || []), ...newPublicationsList],
      };

      setHistory((prevState) =>
        prevState.map((message) =>
          message.id === messageId ? updatedMessage : message,
        ),
      );
    } else {
      setPublicationReqState((prevState) => ({
        ...prevState,
        [messageId]: {
          ...prevState[messageId],
          loaded: false,
        },
      }));
    }
  };

  useEffect(() => {
    const checkWindowHeight = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", checkWindowHeight);
    return () => window.removeEventListener("resize", checkWindowHeight);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {(screenHeight >= 700 ||
        (screenHeight < 700 && firstTypingDone!)) && (
        <Box
          sx={(theme) => ({
            flex: 1,
            overflowY: "auto",
            border: `1px solid ${theme.palette.secondary.main}`,
            padding: {
              xs: "0.5rem",
              sm: "2rem",
            },
            borderRadius: "0.5rem",
            backgroundColor: "white",
            scrollbarWidth: "thin",
            msOverflowStyle: "thin",
            scrollbarColor: `${grey[300]} ${grey[100]}`,
            marginBottom: respMargin("4.5rem", "6.0rem", "7.0rem"),
            marginTop: firstTypingDone
              ? respMargin("0.5rem", "1.5rem", "2.5rem")
              : "0rem",
            marginRight: respMargin("0.5rem", "1.5rem", "2.5rem"),
            marginLeft: respMargin("0.5rem", "1.5rem", "2.5rem"),
          })}
        >
          <Stack spacing={2} direction="column">
            {history.map((message, index) => {
              return (
                <ChatMessage
                  key={index}
                  message={message}
                  onLoadMorePublications={loadMorePublications}
                  newPublLoaded={publicationsReqState[message.id]?.loaded}
                />
              );
            })}
            <div ref={scrollEndRef} />
          </Stack>
        </Box>
      )}

      <Box
        sx={{
          position: "fixed",
          bottom: respMargin("0.5rem", "1.5rem", "2.5rem"),
          left: respMargin("0.5rem", "1.5rem", "2.5rem"),
          right: respMargin("0.5rem", "1.5rem", "2.5rem"),
          display: "flex",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <UserInput
            onSubmitMessage={handleMessageSubmitted}
            onUserTyping={handleUserTyping}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;
