import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme.ts";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import EngineeringIcon from "@mui/icons-material/Engineering";
import WMLogo from "../../public/WM.svg"; // Adjust path if needed

// Simple translation object
const translations = {
  en: {
    welcome: "Welcome to WattMaintain",
    areYou: "Are you:",
    homeowner: "Homeowner",
    technician: "Technician",
  },
  de: {
    welcome: "Willkommen bei WattMaintain",
    areYou: "Sind Sie:",
    homeowner: "Hausbesitzer",
    technician: "Techniker",
  },
};

function LandingPage() {
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  const t = translations[language];

  return (
    <ThemeProvider theme={theme}>
      <Box
        height="95dvh"
        width="95dvw"
        bgcolor="background.default"
        display="flex"
        flexDirection="column"
        p={2}
        sx={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          boxShadow: 8,
          mx: "auto",
          mt: 3,
          maxWidth: 600,
          position: "relative",
        }}
      >
        {/* Language Dropdown */}
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-end"
          mb={2}
          mt={6}
          zIndex={2}
        >
          <FormControl size="small" variant="standard">
            <Select
              labelId="lang-label"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{
                minWidth: 100,
                padding: "0px 16px",
              }}
              IconComponent={KeyboardArrowRightIcon}
              disableUnderline
            >
              <MenuItem value="en">Eng</MenuItem>
              <MenuItem value="de">Ger</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Welcome text below the circle */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={14}
          zIndex={2}
        >
          {/* Header with green circle and text */}
          <Box
            position="relative"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={4}
            mt={8}
          >
            <Box
              sx={{
                position: "absolute",
                width: 280,
                height: 280,
                bgcolor: "primary.main",
                borderRadius: "50%",
                zIndex: 1,
                opacity: 1,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                position: "relative",
                zIndex: 2,
                fontWeight: "bold",
                color: "secondary.main",
                textAlign: "center",
              }}
            >
              {t.welcome}
            </Typography>
          </Box>
          <Typography variant="h4" textAlign="center" mt={22} mb={2}>
            {t.areYou}
          </Typography>
          {/* Buttons */}
          <Box display="flex" flexDirection="row" gap={4} alignItems="center">
            {/* Homeowner */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
            >
              <HomeIcon sx={{ fontSize: 80, mb: 1, color: "primary.main" }} />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  fontSize: "1rem",
                  py: 1.5,
                  boxShadow: 3,
                  borderRadius: 3,
                  width: 160,
                  height: 120,
                }}
                onClick={() => navigate("/homeowner")}
              >
                {t.homeowner}
              </Button>
            </Box>
            {/* Technician */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
            >
              <EngineeringIcon
                sx={{ fontSize: 80, mb: 1, color: "secondary.main" }}
              />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{
                  fontSize: "1rem",
                  py: 1.5,
                  boxShadow: 3,
                  borderRadius: 3,
                  width: 160,
                  height: 120,
                }}
                onClick={() => navigate("/technician")}
              >
                {t.technician}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;
