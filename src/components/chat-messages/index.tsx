import { useEffect } from "react";
import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";
import { Message } from "../../types/types";
import { Typography, Card, CardContent } from "@mui/material";

interface ChatMessageProps {
  message: Message;
  onLoadMorePublications: (messageId: string, numberPage: number) => void;
  newPublLoaded: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onLoadMorePublications,
  newPublLoaded,
}) => {
  useEffect(() => {
    console.log("newPublLoaded?", newPublLoaded);
  }, [newPublLoaded]);

  return (
    <Card
      role="region"
      aria-label={message.role === "ai" ? "agent-message" : "user-message"}
      sx={{
        borderRadius: "1rem",
        borderBottomRightRadius: message.role === "user" ? "0" : "1rem",
        borderBottomLeftRadius: message.role === "ai" ? "0" : "1rem",
        border: "none",
        boxShadow: "none",
        width: message.role === "ai" ? "100%" : "90%",
        color: message.role === "ai" ? "black" : "black",
        backgroundColor: message.role === "ai" ? "white" : "#F6F6F6",
        alignSelf: message.role === "ai" ? "flex-start" : "flex-end",
      }}
    >
      <CardContent>
        <Typography
          variant="body2"
          sx={(theme) => ({
            color: theme.palette.primary.main,
            paddingBottom: "0.5rem",
            fontWeight: "800",
          })}
        >
          {message.role === "ai" ? "Agent" : "You"}
        </Typography>

        {message.role === "user" && <UserMessage message={message} />}

        {message.role === "ai" && (
          <AiMessage
            message={message}
            onLoadMorePublications={onLoadMorePublications}
            newPublLoaded={newPublLoaded}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ChatMessage;
