import { Box, Typography } from "@mui/material";
import chatbot from "../assets/icons/chatbot.svg";
import Typewriter from "./Typewriter";

const Header = () => {
  return (
    <Box
      width={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
        alignItems: "center",
        margin: "4rem 0rem",
        padding: {
          xs: "0rem 1rem",
          sm: "0rem 2rem",
          md: "0rem 3rem",
        },
      }}
    >
      <img src={chatbot} alt="assistant" className="roll-in-icon" />
      <Typography
        variant="h4"
        sx={{
          color: "#AAAAAA",
          fontWeight: "900",
          paddingBottom: "2rem",
        }}
      >
        Research Assistant
      </Typography>

      <Typography sx={(theme) => ({
        color: theme.palette.primary.contrastText,
        textAlign: "center",
        minHeight: "2rem",
      })}>
        <Typewriter text="  Looking for research papers on a specific topic?  I'm here to help you find them!
        " speed={30} delay={2000}/>

      </Typography>
      <Typography sx={(theme) => ({
        color: theme.palette.primary.contrastText,
        textAlign: "center",
        marginTop: "0.5rem",
        minHeight: "2rem",
      })}>
        <Typewriter text="  Share your search terms and any of the specify criteria you'd like to
        apply!
        " speed={30} delay={5000} />
      </Typography>
    </Box>
  );
};

export default Header;
