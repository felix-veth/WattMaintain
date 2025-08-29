import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useHomeOwner } from "../context/HomeOwnerContext";
import { useState } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Example technician data
const technicians = [
  {
    name: "Anna Müller",
    distance: "2.1 km",
    status: "Available",
    fee: 65,
    verified: true,
    reviews: 4.8,
    slots: ["2025-10-23 10:00", "2026-02-28 14:00"],
    languages: ["German", "English"],
    lastReviews: [
      "Very professional and friendly.",
      "Quick response and solved the issue efficiently.",
    ],
  },
  {
    name: "Jonas Schmidt",
    distance: "3.4 km",
    status: "Busy",
    fee: 55,
    verified: true,
    reviews: 4.5,
    slots: ["2025-08-27 11:00", "2025-08-28 15:00"],
    languages: ["German"],
    lastReviews: [
      "Good service, but arrived a bit late.",
      "Explained everything clearly.",
    ],
  },
  {
    name: "Fatima Yilmaz",
    distance: "5.0 km",
    status: "Available",
    fee: 60,
    verified: true,
    reviews: 4.9,
    slots: ["2025-08-25 16:00", "2026-02-28 10:00"],
    languages: ["Turkish", "German", "English"],
    lastReviews: [
      "Excellent communication and expertise.",
      "Highly recommended for inverter issues.",
    ],
  },
  {
    name: "Lukas Weber",
    distance: "6.2 km",
    status: "Available",
    fee: 58,
    verified: true,
    reviews: 4.7,
    slots: ["2025-09-01 09:00", "2025-09-02 14:00"],
    languages: ["German", "French"],
    lastReviews: [
      "Very knowledgeable and polite.",
      "Helped with warranty paperwork.",
    ],
  },
  {
    name: "Elif Kaya",
    distance: "7.8 km",
    status: "Busy",
    fee: 62,
    verified: true,
    reviews: 4.6,
    slots: ["2025-09-05 10:00", "2025-09-06 15:00"],
    languages: ["Turkish", "English"],
    lastReviews: [
      "Great troubleshooting skills.",
      "Would book again for maintenance.",
    ],
  },
  {
    name: "Maximilian Bauer",
    distance: "8.5 km",
    status: "Available",
    fee: 59,
    verified: true,
    reviews: 4.4,
    slots: ["2025-09-10 11:00", "2025-09-11 16:00"],
    languages: ["German", "Russian"],
    lastReviews: [
      "Efficient and friendly.",
      "Solved a complex wiring problem.",
    ],
  },
];

export default function TechnicianList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { form } = useHomeOwner();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [filterByDate, setFilterByDate] = useState(false);

  const scheduledDate =
    form.maintenanceTasks && form.maintenanceTasks.length > 0
      ? form.maintenanceTasks[0].nextDate
      : null;
  const filteredTechnicians =
    filterByDate && scheduledDate
      ? technicians.filter((tech) =>
          tech.slots.some((slot) => slot.startsWith(scheduledDate))
        )
      : technicians;
  console.log(scheduledDate);
  console.log(form);
  const handleContinue = () => {
    // Forward selectedSlot and technician info to booking page
    navigate("/homeowner/booking", {
      state: {
        technician: selectedIndex !== null ? technicians[selectedIndex] : null,
        slot: selectedSlot,
        acceptedPolicy,
      },
    });
  };

  const handleClick = () => {
    navigate("/homeowner/technicians");
  };

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
      {/* Green circle in top center */}
      <Box
        sx={{
          position: "absolute",
          top: -310,
          left: "50%",
          transform: "translateX(-50%)",
          width: 420,
          height: 430,
          bgcolor: "primary.main",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      {/* Header */}
      <Box
        width="95%"
        p={3}
        display="flex"
        flexDirection="column"
        mt={14}
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        zIndex={2}
      >
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Technician marketplace
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Your location: <b>{form.location || "Unknown"}</b>
        </Typography>
      </Box>
      {/* Technician List */}
      <Box
        sx={{
          width: "100%",
          px: 3,
          mb: 2,
          zIndex: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Nearby Certified Technicians
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={filterByDate}
              onChange={(e) => setFilterByDate(e.target.checked)}
              color="primary"
            />
          }
          label="Show only technicians available on my scheduled maintenance date"
          sx={{ mb: 2 }}
        />
        {filteredTechnicians.map((tech, idx) => (
          <Box key={idx}>
            {selectedIndex !== idx && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bgcolor="background.paper"
                borderRadius={3}
                boxShadow={2}
                p={2}
                mb={2}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedIndex(selectedIndex === idx ? null : idx);
                  setSelectedSlot(null);
                  setAcceptedPolicy(false); // <-- Reset checkbox state
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    <EngineeringIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold">{tech.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tech.distance} from you
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <StarIcon color="warning" fontSize="small" />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="text.secondary"
                  >
                    {tech.reviews} / 5
                  </Typography>
                </Box>
              </Box>
            )}
            {selectedIndex === idx && (
              <Box
                bgcolor="background.paper"
                borderRadius={4}
                boxShadow={8}
                p={3}
                mb={2}
                sx={{
                  minWidth: 320,
                  maxWidth: 380,
                  outline: "none",
                  mx: "auto",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => setSelectedIndex(null)}
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Service Booking Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    <EngineeringIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold">{tech.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tech.distance} from you
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" mb={1}>
                  <b>Fees per hour:</b> {tech.fee} €
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <VerifiedUserIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2">Verified technician</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <StarIcon color="warning" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Past service reviews: {tech.reviews} / 5
                  </Typography>
                </Box>
                <Typography variant="body2" mb={1}>
                  <b>Languages:</b> {tech.languages.join(", ")}
                </Typography>
                <Typography variant="body2" mt={2} mb={1}>
                  <b>Next available slots:</b>
                </Typography>
                <Box display="flex" flexDirection="row" gap={1} mb={2}>
                  {tech.slots.map((slot: string, i: number) => (
                    <Box
                      key={i}
                      sx={{
                        bgcolor:
                          selectedSlot === slot
                            ? "primary.main"
                            : "background.default",
                        borderRadius: 2,
                        px: 2,
                        py: 0.5,
                        fontSize: 14,
                        boxShadow: 1,
                        width: "fit-content",
                      }}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </Box>
                  ))}
                </Box>
                <Typography variant="body2" mb={1}>
                  <b>Last customer reviews:</b>
                </Typography>
                <Box display="flex" flexDirection="column" gap={0.5} mb={2}>
                  {tech.lastReviews.map((review: string, i: number) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{
                        fontStyle: "italic",
                        color: "text.secondary",
                        pl: 1,
                      }}
                    >
                      "{review}"
                    </Typography>
                  ))}
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={acceptedPolicy}
                      onChange={(e) => setAcceptedPolicy(e.target.checked)}
                    />
                  }
                  label="Accept cancellation policy"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!selectedSlot || !acceptedPolicy}
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </Box>
            )}
          </Box>
        ))}
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
