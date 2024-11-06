import PublicationList from "../publications/index";
import { useRef, useEffect, useState } from "react";
import { Message } from "../../types/types";
import { Typography, Button, Box } from "@mui/material";

interface AiMessageProps {
  message: Message;
  onLoadMorePublications: (messageId: string, numberPage: number) => void;
  newPublLoaded: boolean;
}
const AiMessage: React.FC<AiMessageProps> = ({
  message,
  onLoadMorePublications,
  newPublLoaded,
}) => {
  const [numberPage, setNumberPage] = useState<number>(1);
  const scrollStartListRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (newPublLoaded && scrollStartListRef.current) {
      scrollStartListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [newPublLoaded]);

  const handleLoadMore = async () => {
    onLoadMorePublications(message.id, numberPage); 
    setNumberPage((prevState) => prevState + 1);
  };

  return (
    <div ref={scrollStartListRef}>
      {message.content === "" && (
        <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
          Oops! Something went wrong. Please try again later.
        </Typography>
      )}

      {message.content && message.url === "" && (
        <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
          {message.content}
        </Typography>
      )}

      {message.url !== "" &&
        message.publications &&
        message.publications.length === 0 && (
          <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
            Sorry I couldn't find any publications about that topic or matching
            those criteria. Please, consider a broader topic or less restrictive
            criteria, if that is the case.
          </Typography>
        )}

      {message.url !== "" &&
        message.publications &&
        message.publications.length > 0 && (
          <div>
            <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
              {message.content}
            </Typography>
            <Box sx={{ wordWrap: "break-word", marginTop: "2rem" }}>
              {message.publications.map((publication) => {
                return (
                  <PublicationList
                    key={publication.id}
                    publication={publication}
                  />
                );
              })}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleLoadMore}
                disabled={!newPublLoaded}
              >
                {newPublLoaded
                  ? "Load more publications"
                  : "No more publications to load"}
              </Button>
            </Box>
          </div>
        )}
    </div>
  );
};

export default AiMessage;