import { useState } from "react";

type UseUserFirstTyping = {
  onHeaderRemoval: () => void;
};

export const useUserFirstTyping = ({ onHeaderRemoval }: UseUserFirstTyping) => {
  const [isUserTyping, setIsUserTyping] = useState<boolean>(false);
  const [firstTypingDone, setFirstTypingDone] = useState<boolean>(false);

  const handleUserTyping = (userTypingStatus: boolean) => {
    setIsUserTyping(userTypingStatus);
    if (!firstTypingDone && userTypingStatus) {
      setFirstTypingDone(true);
      onHeaderRemoval();
    }
  };
  return {
    isUserTyping,
    setIsUserTyping,
    firstTypingDone,
    setFirstTypingDone,
    handleUserTyping,
  };
};
