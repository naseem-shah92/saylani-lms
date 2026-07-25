import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: "#f4f6f8",  // halka grey background
    },
    primary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  shape: {
    borderRadius: 10,  // cards ke corners thode round
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",  // soft shadow
        },
      },
    },
  },
});

export default theme;