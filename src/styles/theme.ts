import { createTheme, responsiveFontSizes } from "@mui/material";
import { grey } from "@mui/material/colors";

let theme = createTheme({
  typography: {
    fontFamily: '"Lato", "Roboto", "Helvica", "Arial", sans-serif',
    body3: {
      fontSize: "0.8125rem",
      fontWeight: 300,
      lineHeight: 1.5,
    },
  },

  palette: {
    primary: {
      main: "#3D7C91",
      contrastText: "#797979", 
    },
    secondary: {
      main: "#AAAAAA",
      light: grey[100],
      dark: grey[600],
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          "&:hover": {
            backgroundColor: "#3D7C91",
            color: "white",
          },
        },
      },
      variants: [
        {
          props: { variant: "secondaryButton" },
          style: {
            textTransform: "none",
            border: "none",
            textDecoration: "underline",
            color: grey[700],
            "&:hover": {
              color: "#3D7C91",
              backgroundColor: "transparent",
              border: "none",
              textDecoration: "underline",
            },
          },
        },
      ],
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0.8rem",
          "&:last-child": {
            paddingBottom: "0.8rem",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
