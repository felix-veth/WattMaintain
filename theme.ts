// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d8de95", // WattMaintain primary
    },
    secondary: {
      main: "#1e534b", // WattMaintain secondary
    },
    info: {
      main: "#ffffff", // WattMaintain tertiary
    },
    error: {
      main: "#FF0000", // WattMaintain basic
    },
    success: {
      main: "#777777", // WattMaintain basic
    },
  },
});

export default theme;
