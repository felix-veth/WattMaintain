import { Box, Typography, Button } from "@mui/material";
import { useHomeOwner } from "../context/HomeOwnerContext";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EngineeringIcon from "@mui/icons-material/Engineering";

// ...existing imports...

export default function Notifications() {
  const { form } = useHomeOwner();
  const navigate = useNavigate();
  const notifications = form.notifications || [];

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
      <Box
        width="100%"
        p={3}
        textAlign="center"
        flex={1}
        mt={14}
        sx={{ overflowY: "auto" }}
        zIndex={2}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Notifications
        </Typography>
        {notifications.length === 0 ? (
          <Typography>No notifications.</Typography>
        ) : (
          notifications.map((n) => (
            <Box
              key={n.id}
              sx={{
                mb: 1,
                px: 1,
                py: 0.5,
                bgcolor: "background.paper",
                borderRadius: 3,
                boxShadow: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                border: "1px solid #e0e0e0",
                width: "100%",
                height: "auto",
                position: "relative",
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: 12,
                },
                textAlign: "left",
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: 14,
                  color: "secondary.main",
                  letterSpacing: 0.1,
                }}
              >
                {n.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "text.primary",
                }}
              >
                {n.message}
              </Typography>
              {(n.severity || n.estTime) && (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  width="100%"
                  gap={2}
                  mt={0.5}
                >
                  {n.severity && (
                    <Typography
                      sx={{
                        fontSize: 12,
                        color:
                          n.severity === "Critical"
                            ? "error.main"
                            : "success.main",
                        lineHeight: 1.2,
                      }}
                    >
                      Severity: {n.severity}
                    </Typography>
                  )}
                  {n.estTime && (
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "text.primary",
                        lineHeight: 1.2,
                      }}
                    >
                      Estimated time: {n.estTime}
                    </Typography>
                  )}
                </Box>
              )}
              {/* Simulate iOS notification handle */}
            </Box>
          ))
        )}
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
