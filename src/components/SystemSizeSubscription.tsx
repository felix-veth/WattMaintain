import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeOwner } from "../context/HomeOwnerContext";

const SIZE_THRESHOLD = 10; // kWp, adjust as needed

export default function SystemSizeSubscription() {
  const { form, setForm } = useHomeOwner();
  const navigate = useNavigate();
  const [systemSize, setSystemSize] = useState(form.systemSize || "");
  const [subscription, setSubscription] = useState(form.subscription || false);
  const [showPayment, setShowPayment] = useState(false);

  const isEligible = Number(systemSize) > SIZE_THRESHOLD;

  const handleContinue = () => {
    setForm({
      ...form,
      systemSize,
      subscription,
    });
    if (isEligible && subscription) {
      setShowPayment(true);
    } else {
      navigate("/homeowner/maintenanceDashboard");
    }
  };

  const handlePayment = () => {
    // Simulate payment and technician booking
    // You can add real payment logic here
    navigate("/homeowner/maintenanceDashboard");
  };

  return (
    <Box
      position="relative"
      height="95dvh"
      width="95dvw"
      bgcolor="background.default"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
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
        overflow: "hidden",
      }}
    >
      {/* Decorative circle */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          left: -180,
          width: 400,
          height: 400,
          bgcolor: "primary.main",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          mt: 10,
          mb: 2,
          fontWeight: "bold",
          color: "secondary.main",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        Tell us more about your system
      </Typography>

      {isEligible && (
        <Box
          bgcolor="background.paper"
          borderRadius={2}
          boxShadow={2}
          p={2}
          mb={2}
          mt={1}
          zIndex={2}
        >
          <Typography
            variant="subtitle1"
            color="primary.main"
            fontWeight="bold"
            mb={1}
          >
            What you get with the subscription
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            With our maintenance subscription, a certified technician will
            install advanced sensors next to your solar system. These sensors
            enable real-time monitoring of your energy production, system
            health, and efficiency.
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            You will receive:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <Typography variant="body2" color="text.secondary">
                Real-time performance and health data in your dashboard
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Automated alerts for maintenance needs and faults
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Priority access to certified technicians
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Annual on-site inspection included
              </Typography>
            </li>
          </ul>
        </Box>
      )}

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        maxWidth={350}
        zIndex={2}
        mt={1}
      >
        <TextField
          label="System Size (kWp)"
          type="number"
          value={systemSize}
          onChange={(e) => setSystemSize(e.target.value)}
          size="small"
          required
          color="secondary"
        />
        {isEligible && (
          <FormControlLabel
            control={
              <Checkbox
                checked={subscription}
                onChange={(e) => setSubscription(e.target.checked)}
                color="secondary"
              />
            }
            label="I want a maintenance subscription"
          />
        )}
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 4, py: 1.5, fontWeight: "bold", boxShadow: 3 }}
          onClick={handleContinue}
        >
          Continue
        </Button>
        {showPayment && (
          <Box
            mt={3}
            p={2}
            bgcolor="background.paper"
            borderRadius={2}
            boxShadow={2}
            zIndex={2}
          >
            <Typography
              variant="h6"
              color="primary.main"
              fontWeight="bold"
              mb={1}
            >
              Subscription Payment
            </Typography>
            <Typography variant="body2" mb={2}>
              A technician will come and place sensors next to your system to
              measure it in real time.
            </Typography>
            <Button variant="contained" color="success" onClick={handlePayment}>
              Pay & Book Technician
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
