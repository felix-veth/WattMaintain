import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  CircularProgress,
  Fade,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function BookingPage() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [showAnim, setShowAnim] = useState(false);
  const location = useLocation();
  const bookedDate =
    location.state && location.state.slot ? location.state.slot : null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleConfirm = () => {
    setShowAnim(true);
    setTimeout(() => {
      setConfirmed(true);
      // Simulate sending email notification here
      setTimeout(() => {
        setShowAnim(false);
        navigate("/homeowner/maintenancedashboard");
      }, 1800);
    }, 1200);
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
        borderRadius: 4,
        boxShadow: 8,
        mx: "auto",
        mt: 3,
        maxWidth: 600,
        overflow: "hidden",
      }}
    >
      {/* Absolutely positioned circle in top right */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: -80,
          width: 280,
          height: 280,
          bgcolor: "primary.main",
          borderRadius: "50%",
          zIndex: 1,
          opacity: 0.9,
        }}
      />
      {/* Main Content */}
      <Typography variant="h5" fontWeight="bold" mt={20} width="90%" zIndex={2}>
        What do you need help with?
      </Typography>
      <EngineeringIcon sx={{ fontSize: 100, mt: 8 }} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        zIndex={2}
        width="100%"
        ml={5}
        mt={2}
        mb={2}
        position="relative"
      >
        <Box display="flex" flexDirection="column" width="100%">
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="left"
            mt={2}
          >
            Describe your issue in detail
          </Typography>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3, width: "90%" }}
          />
          <Button
            variant="contained"
            component="label"
            color="secondary"
            startIcon={<AddPhotoAlternateIcon />}
            sx={{ mb: 2, width: "90%" }}
          >
            Upload Pictures
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageUpload}
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4, width: "90%" }}
            onClick={handleConfirm}
            disabled={showAnim}
          >
            Confirm Booking
          </Button>
        </Box>
        <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
          {images.map((img, idx) => (
            <Avatar
              key={idx}
              src={URL.createObjectURL(img)}
              sx={{ width: 56, height: 56 }}
              variant="rounded"
            />
          ))}
        </Box>

        {/* Animation overlay */}
        <Fade in={showAnim} timeout={400}>
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              display: showAnim ? "flex" : "none",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 4,
              px: 4,
              py: 3,
            }}
          >
            {!confirmed ? (
              <>
                <CircularProgress color="primary" size={60} sx={{ mb: 2 }} />
                <Typography fontWeight="bold" color="primary.main">
                  Booking...
                </Typography>
              </>
            ) : (
              <>
                <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography fontWeight="bold" color="primary.main" mb={1}>
                  Booking Confirmed!
                </Typography>
                {bookedDate && (
                  <Typography color="text.primary" fontWeight="bold" mb={1}>
                    Booked Date: {bookedDate}
                  </Typography>
                )}
                <Typography color="text.secondary">
                  You will receive an email notification.
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Box>
      {/* Footer Navigation */}
      <Box
        width="100%"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        bgcolor="background.paper"
        py={1.5}
        sx={{
          borderTop: "1px solid #eee",
          boxShadow: 3,
        }}
      >
        <Button onClick={() => navigate("/homeowner/maintenancedashboard")}>
          <HomeIcon fontSize="large" color="secondary" />
        </Button>
        <Button>
          <ChatBubbleOutlineIcon fontSize="large" color="secondary" />
        </Button>
        <Button>
          <CalendarMonthIcon fontSize="large" color="secondary" />
        </Button>
        <Button>
          <NotificationsNoneIcon fontSize="large" color="secondary" />
        </Button>
        <Button>
          <EngineeringIcon fontSize="large" color="secondary" />
        </Button>
      </Box>
    </Box>
  );
}
