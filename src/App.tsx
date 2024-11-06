import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { Box } from "@mui/material";
import theme from "./styles/theme";
import Chatbot from "./components/Chatbot";
import Header from "./components/Header";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [showHeader, setShowHeader] = useState<boolean>(true);

  const handleHeaderRemoval = () => setShowHeader(false);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F3F3F3",
        }}
      >
        {showHeader && <Header />}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Chatbot onHeaderRemoval={handleHeaderRemoval} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
