import { Box, Typography, Button, Modal } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useHomeOwner } from "../context/HomeOwnerContext.tsx";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { LineChart } from "@mui/x-charts";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

// Example data
const data = [
  { date: "08-01", performance: 83 },
  { date: "09-01", performance: 86 },
  { date: "10-01", performance: 77 },
  { date: "11-01", performance: 78 },
  { date: "12-01", performance: 75 },
  { date: "01-01", performance: 77 },
  { date: "02-01", performance: 72 },
];

// Example carousel data
const carouselItems = [
  {
    title: "Current performance reduced by 17%",
    description: "Due to weather, pollen and missing maintenance",
    color: "warning.main",
  },
  {
    title: "Weather impact",
    description: "Partly cloudy\nEfficiency loss: -1%",
    color: "info.main",
  },
  {
    title: "Pollen impact",
    description: "High pollen count\nEfficiency loss: -6%",
    color: "info.main",
  },
  {
    title: "Maintenance impact",
    description: "Maintenance need\nEfficiency loss: -10%",
    color: "info.main",
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 8,
  p: 4,
  minWidth: 320,
  maxWidth: 400,
  outline: "none",
  textAlign: "center",
};

// Custom day renderer to highlight maintenance dates
function MaintenanceDay(props) {
  const { form } = useHomeOwner();
  const calendarEvents = form.calendarEvents || [];
  const dateStr = props.day.toISOString().slice(0, 10);
  const isMaintenance = calendarEvents.some((ev) => ev.date === dateStr);

  return (
    <PickersDay
      {...props}
      sx={isMaintenance ? { bgcolor: "secondary.main", color: "white" } : {}}
    />
  );
}

export default function MaintenanceDashboard() {
  const { form } = useHomeOwner();
  const theme = useTheme();
  const navigate = useNavigate();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Upcoming Maintenance",
      message: `on ${form.nextMaintenanceDate}`,
    },
    // Add more notifications here if needed
  ].filter(Boolean);

  const handleClick = () => {
    navigate("/homeowner/technicians");
  };

  const [showBanner, setShowBanner] = useState(notifications.length > 0);

  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => setShowBanner(false), 7000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Box
      height="95dvh"
      width="95dvw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.default"
      position="relative"
      sx={{
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        boxShadow: 8,
        mx: "auto",
        mt: 3,
        maxWidth: 600,
        overflow: "hidden",
      }}
    >
      {/* Sun-like circle in top center */}
      <Box
        sx={{
          position: "absolute",
          top: -330,
          left: "50%",
          transform: "translateX(-50%)",
          width: 420,
          height: 430,
          bgcolor: "primary.main",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      {/* Dashboard Content */}
      <Box>
        <Box
          width="95%"
          p={1}
          display="flex"
          flexDirection="column"
          mt={12}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Maintenance Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome, {form.name || "Homeowner"}!
          </Typography>
        </Box>
        {/* Add more dashboard content here */}
        {/* Performance Graph */}
        <Box
          width={360}
          height={350}
          mb={1}
          display="flex"
          flexDirection="column"
          boxShadow={2}
          borderRadius={3}
        >
          <Typography fontWeight="bold" variant="subtitle1" ml={1} mt={1}>
            Projected Performance Over Time
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            ml={1}
            gap={1}
          >
            <Typography variant="body2" color="text.primary">
              System Health:
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="secondary.main">
              Good
            </Typography>
          </Box>
          <Typography variant="body2" ml={1}>
            Current Performance: 83%
          </Typography>
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 3,
              width: 340,
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LineChart
              hideLegend={true}
              xAxis={[
                {
                  data: data.map((d) => d.date),
                  scaleType: "point",
                  disableTicks: true,
                },
              ]}
              series={[
                {
                  data: data.map((d) => d.performance),
                  area: true,
                },
              ]}
              height={250}
              width={370}
              grid={{ horizontal: true }}
              yAxis={[
                {
                  min: 70,
                  max: 90,
                  colorMap: {
                    type: "continuous",
                    min: 60,
                    max: 90,
                    color: ["white", theme.palette.primary.main],
                  },
                  disableTicks: true,
                },
              ]}
              sx={{
                marginRight: "20px",
              }}
            ></LineChart>
          </Box>
        </Box>
      </Box>

      {/* Energy Production Section */}
      <Box
        width={360}
        mb={1}
        display="flex"
        flexDirection="column"
        bgcolor="background.paper"
        borderRadius={3}
        boxShadow={2}
        px={3}
        py={2}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Today's Production */}
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight="bold"
            >
              Today's Production
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="flex-end"
              justifyContent="flex-end"
            >
              <Typography
                variant="subtitle1"
                color="primary.main"
                fontWeight="bold"
              >
                18 kWh
              </Typography>
              <Typography
                variant="subtitle1"
                color="secondary.main"
                fontWeight="bold"
                ml={1}
              >
                (2.00 kWh)
              </Typography>
            </Box>
          </Box>
          {/* Estimated Savings */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight="bold"
            >
              Estimated Savings
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="flex-start"
              mr={3}
            >
              <Typography
                variant="subtitle1"
                color="primary.main"
                fontWeight="bold"
              >
                € 4.60
              </Typography>
              <Typography
                variant="subtitle1"
                color="secondary.main"
                fontWeight="bold"
                ml={1}
              >
                € 0.51
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Legend below numbers */}
        <Box display="flex" alignItems="center" ml={1}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: "secondary.main",
              mr: 1,
              display: "inline-block",
            }}
          />
          <Typography variant="body2" color="secondary.main" fontWeight="bold">
            maintenance loss
          </Typography>
        </Box>
      </Box>

      {/* System Performance Carousel */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        ml={5}
        width="100%"
      >
        <Typography fontWeight="bold" variant="subtitle1" ml={1}>
          System Performance
        </Typography>
        <Box
          sx={{
            overflowX: "auto",
            display: "flex",
            flexDirection: "row",
            gap: 1,
            boxSizing: "border-box",
            maxWidth: "360px",
            scrollbarWidth: "none",
          }}
        >
          {carouselItems.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                borderRadius: 3,
                boxShadow: 2,
                p: 2,
                width: 220,
                textAlign: "left",
                flex: "0 0 auto",
                mb: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography variant="body2" mt={1} whiteSpace="pre-line">
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Modal open={calendarOpen} onClose={() => setCalendarOpen(false)}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" mb={2}>
            Next Maintenance Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar value={null} slots={{ day: MaintenanceDay }} />
          </LocalizationProvider>
        </Box>
      </Modal>

      {/* Footer Navigation */}
      {/* Footer Navigation */}
      <Box
        width="100%"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        bgcolor="background.paper"
        py={0.5}
        sx={{
          borderTop: "1px solid #eee",
          boxShadow: 3,
        }}
      >
        <Button onClick={() => navigate("/homeowner/calendar")}>
          <CalendarMonthIcon fontSize="large" color="secondary" />
        </Button>

        <Button>
          <EngineeringIcon
            fontSize="large"
            color="secondary"
            onClick={handleClick}
          />
        </Button>
        <Button onClick={() => navigate("/homeowner/maintenancedashboard")}>
          <img
            src="/WM.svg"
            alt="WM Logo"
            style={{ width: 40, height: 40, marginTop: 2 }}
          />
        </Button>

        <Button onClick={() => navigate("/homeowner/notifications")}>
          <NotificationsNoneIcon fontSize="large" color="secondary" />
        </Button>
        <Button onClick={() => navigate("/homeowner/profile")}>
          <AccountCircleIcon fontSize="large" color="secondary" />
        </Button>
      </Box>
    </Box>
  );
}
