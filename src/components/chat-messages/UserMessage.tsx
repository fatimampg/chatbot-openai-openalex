import React from "react";
import { Message } from "../../types/types";
import { Typography } from "@mui/material";

const UserMessage: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <Typography
      aria-label="user-message"
      variant="body1"
      sx={{ wordWrap: "break-word" }}
    >
      {message.content}
    </Typography>
  );
};

export default UserMessage;
