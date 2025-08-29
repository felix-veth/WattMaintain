import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EngineeringIcon from "@mui/icons-material/Engineering";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useHomeOwner } from "../context/HomeOwnerContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { form, setForm } = useHomeOwner();
  const [passport, setPassport] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  // Editable fields state
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: form.name || "",
    location: form.location || "",
    brand: form.brand || "",
    model: form.model || "",
    storageSystem: form.storageSystem || false,
    systemSize: form.systemSize || "",
    subscription: form.subscription || false,
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    setForm({
      ...form,
      ...editData,
    });
    setEditMode(false);
  };

  const handleClick = () => {
    navigate("/homeowner/technicians");
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPassport(file);
      setFileUrl(URL.createObjectURL(file));
    }
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
      {/* Decorative circle in top center (same as maintenance dashboard) */}
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
        zIndex={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={12}
      >
        <AccountCircleIcon sx={{ fontSize: 56 }} />
        <Typography variant="h5" fontWeight="bold" mb={2} color="primary.main">
          My Profile
        </Typography>
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 380,
            mx: "auto",
            p: 3,
            borderRadius: 4,
            mb: 2,
            background: "rgba(255,255,255,0.95)",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Personal Info
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setEditMode((prev) => !prev)}
              sx={{ ml: 2 }}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {editMode ? (
            <Box display="flex" flexDirection="column" gap={1}>
              <TextField
                label="Name"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                size="small"
                fullWidth
              />
              <TextField
                label="Location"
                name="location"
                value={editData.location}
                onChange={handleEditChange}
                size="small"
                fullWidth
              />
              <TextField
                label="PV Brand"
                name="brand"
                value={editData.brand}
                onChange={handleEditChange}
                size="small"
                fullWidth
              />
              <TextField
                label="PV Model"
                name="model"
                value={editData.model}
                onChange={handleEditChange}
                size="small"
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editData.storageSystem}
                    onChange={handleEditChange}
                    name="storageSystem"
                  />
                }
                label="Storage System"
              />
              <TextField
                label="System Size (kWp)"
                name="systemSize"
                type="number"
                value={editData.systemSize}
                onChange={handleEditChange}
                size="small"
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editData.subscription}
                    onChange={handleEditChange}
                    name="subscription"
                  />
                }
                label="Subscription"
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="body1" mb={1}>
                <b>Name:</b> {form.name}
              </Typography>
              <Typography variant="body1" mb={1}>
                <b>Location:</b> {form.location}
              </Typography>
              <Typography variant="body1" mb={1}>
                <b>PV Brand:</b> {form.brand}
              </Typography>
              <Typography variant="body1" mb={1}>
                <b>PV Model:</b> {form.model}
              </Typography>
              <Typography variant="body1" mb={1}>
                <b>Storage System:</b> {form.storageSystem ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1" mb={1}>
                <b>System Size:</b>{" "}
                {form.systemSize ? `${form.systemSize} kWp` : "—"}
              </Typography>
              <Typography variant="body1" mb={1}>
                <b>Subscription:</b> {form.subscription ? "Active" : "No"}
              </Typography>
            </>
          )}
        </Paper>
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 380,
            mx: "auto",
            p: 3,
            borderRadius: 4,
            background: "rgba(255,255,255,0.95)",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            PV Passport
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Button
            variant="contained"
            component="label"
            startIcon={<InsertDriveFileIcon />}
            sx={{ mb: 2 }}
            color="secondary"
          >
            Upload PV Passport
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
              onChange={handleUpload}
            />
          </Button>
          {passport && (
            <Typography variant="body2" color="success.main" mb={2}>
              Uploaded: {passport.name}
            </Typography>
          )}
          {fileUrl && (
            <Box mt={2}>
              {passport?.type === "application/pdf" ? (
                <iframe
                  src={fileUrl}
                  width="100%"
                  height="300px"
                  title="PV Passport"
                  style={{ border: "none", borderRadius: 8, boxShadow: 2 }}
                />
              ) : (
                <img
                  src={fileUrl}
                  alt="PV Passport"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 300,
                    borderRadius: 8,
                    boxShadow: 2,
                  }}
                />
              )}
            </Box>
          )}
        </Paper>
        {/* Feedback Button */}
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 3, mb: 2, fontWeight: "bold", boxShadow: 2 }}
          onClick={() => navigate("/feedback")}
        >
          Provide Feedback for the App
        </Button>
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
