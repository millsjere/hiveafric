import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Plus Jakarta Sans",
    fontSize: 14,
  },
  palette: {
    primary: {
      main: "#ED8A2F",
    },
    secondary: {
      main: "#083554",
      contrastText: "#fff",
    },
  },
});
