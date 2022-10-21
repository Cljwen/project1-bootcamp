import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#4e788e",
    },
    secondary: {
      main: "#8e644e",
    },
    warning: {
      main: "#8e4e78",
    },
  },
});

export const cardTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          "&.MuiEntryCard": {
            transition: "0.3s",
            maxWidth: "100%",
            minHeight: "22vh",
            margin: "30px 20px",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            "&:hover": {
              boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
              "& .MuiIconButton": {
                display: "inline",
              },
            },

            "& .MuiIconButton": {
              display: "none",
              padding: "0px 0px",
            },

            "& .MuiDivider": {
              marginBottom: "10px",
            },
            "& .MuiCardContent-root": {
              textAlign: "left",
              padding: "12px 12x 20px 12px",
            },
          },
        },
      },
    },
  },
});
