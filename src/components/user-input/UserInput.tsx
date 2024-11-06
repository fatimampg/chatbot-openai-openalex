import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../../types/types";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface UserInputProps {
  onSubmitMessage: (userMessage: Message) => void;
  onUserTyping: (isTyping: boolean) => void;
}

const UserInput: React.FC<UserInputProps> = ({
  onSubmitMessage,
  onUserTyping,
}) => {
  const [userInput, setUserInput] = useState<string>("");

  const formatUserMessage = (userInput: string): Message => {
    return {
      id: uuid(),
      role: "user",
      content: userInput,
    };
  };

  const isInputValid = (input: string) => input.trim() !== "";

  const handleSubmitMessage = async () => {
    if (isInputValid(userInput)) {
      const userMessage: Message = formatUserMessage(userInput);
      onSubmitMessage(userMessage);
      setUserInput("");
    }
  };

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitMessage();
    }
  };

  useEffect(() => {
    onUserTyping(isInputValid(userInput));
  }, [userInput, onUserTyping]);

  return (
    <FormControl sx={{ m: 0, padding: 0 }} variant="outlined" fullWidth>
      <InputLabel htmlFor="userInput"> Type here </InputLabel>
      <OutlinedInput
        id="userInput"
        type="text"
        size="medium"
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyEnter}
        value={userInput}
        endAdornment={
          <InputAdornment position="end" sx={{ mr: 0 }}>
            <IconButton
              aria-label="send"
              size="medium"
              color="primary"
              disabled={!userInput.trim()}
              onClick={handleSubmitMessage}
              edge="end"
            >
              <SendIcon fontSize="inherit" />
            </IconButton>
          </InputAdornment>
        }
        label="userInput"
        sx={(theme) => ({
          backgroundColor: "white",
          margin: 0,
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${theme.palette.secondary.main}`,
          },
        })}
      />
    </FormControl>
  );
};

export default UserInput;
