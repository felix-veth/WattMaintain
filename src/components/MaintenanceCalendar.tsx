import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

export default function CalendarPage() {
  const navigate = useNavigate();
  const { form } = useHomeOwner();
  const calendarEvents = form.calendarEvents || [];

  // Find the first scheduled date
  const firstScheduledDate = calendarEvents.length
    ? new Date(calendarEvents[0].date)
    : null;

  // Set initial selectedDate to first scheduled date if available
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    firstScheduledDate
  );
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Find tasks for the selected date
  const selectedDateStr = selectedDate
    ? selectedDate.toISOString().slice(0, 10)
    : null;
  const tasksForDay = calendarEvents.filter(
    (ev) => ev.date === selectedDateStr
  );

  const handleClick = () => {
    navigate("/homeowner/technicians");
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setCarouselIndex(0);
  };

  const handlePrev = () => {
    setCarouselIndex((i) => (i > 0 ? i - 1 : i));
  };

  const handleNext = () => {
    setCarouselIndex((i) => (i < tasksForDay.length - 1 ? i + 1 : i));
  };

  return (
    <Box
      position="relative"
      height="95dvh"
      width="95dvw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.default"
      sx={{
        borderRadius: 4,
        boxShadow: 8,
        mx: "auto",
        mt: 3,
        maxWidth: 600,
        overflow: "hidden",
      }}
    >
      {/* Green circle absolutely positioned in top right */}
      <Box
        sx={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 280,
          height: 280,
          bgcolor: "primary.main",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      <Typography variant="h5" fontWeight="bold" mt={16} sx={{ zIndex: 2 }}>
        Maintenance Calendar
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 2,
          p: 3,
        }}
        mt={6}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            slots={{ day: MaintenanceDay }}
          />
        </LocalizationProvider>
      </Box>
      {/* Carousel for tasks scheduled on selected day */}
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight={tasksForDay.length ? 120 : 0}
      >
        {selectedDateStr && tasksForDay.length > 0 ? (
          <Box
            sx={{
              width: "90%",
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 2,
              p: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Button
              onClick={handlePrev}
              disabled={carouselIndex === 0}
              sx={{ minWidth: 0, p: 1 }}
            >
              <ArrowBackIosIcon />
            </Button>
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {tasksForDay[carouselIndex].title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {tasksForDay[carouselIndex].message}
              </Typography>
              {tasksForDay[carouselIndex].severity && (
                <Typography
                  variant="body2"
                  color={
                    tasksForDay[carouselIndex].severity === "Critical"
                      ? "error.main"
                      : "success.main"
                  }
                  fontWeight="bold"
                >
                  Severity: {tasksForDay[carouselIndex].severity}
                </Typography>
              )}
              {tasksForDay[carouselIndex].estTime && (
                <Typography variant="body2" color="info.main">
                  Estimated time: {tasksForDay[carouselIndex].estTime}
                </Typography>
              )}
            </Box>
            <Button
              onClick={handleNext}
              disabled={carouselIndex === tasksForDay.length - 1}
              sx={{ minWidth: 0, p: 1 }}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Box>
        ) : selectedDateStr ? (
          <Typography variant="body2" color="text.secondary" mt={2}>
            No maintenance tasks scheduled for this day.
          </Typography>
        ) : null}
      </Box>
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
