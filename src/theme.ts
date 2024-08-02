import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      primary: {
        main: "#1A3636",
      },
      secondary: {
        main: "#40534C",
      },
      background: {
        default: "#677D6A",
      },
    },
    typography: {
      h1: {
        fontSize: "3rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "1.75rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.5rem",
        color: "#D6BD98",
      },
      body1: {
        fontSize: "1.10rem",
        fontWeight: 400,
        main: "#fff"
      }
    },
  });