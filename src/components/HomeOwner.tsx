import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useHomeOwner } from "../context/HomeOwnerContext";

const brandsData = [
  {
    name: "SMA Solar",
    models: ["Sunny Boy", "Sunny Tripower"],
    maintenanceTasks: [
      {
        task: "Visual inspection (corrosion, cracks)",
        interval: 12,
        estTime: "30 min",
        severity: "Routine",
      },
      {
        task: "Firmware update (Sunny Portal)",
        interval: 12,
        estTime: "15 min",
        severity: "Routine",
      },
      {
        task: "Clean cooling fins/vents",
        interval: 12,
        estTime: "20 min",
        severity: "Routine",
      },
      {
        task: "Check DC connectors/grid connection",
        interval: 12,
        estTime: "20 min",
        severity: "Critical",
      },
      {
        task: "Verify string voltages/logs",
        interval: 12,
        estTime: "15 min",
        severity: "Critical",
      },
      {
        task: "Deeper service: torque connections",
        interval: 24,
        estTime: "30 min",
        severity: "Critical",
      },
      {
        task: "Detailed cooling system check",
        interval: 24,
        estTime: "45 min",
        severity: "Routine",
      },
      {
        task: "Capacitor replacement",
        interval: 120,
        estTime: "2 hr",
        severity: "Critical",
      },
      {
        task: "Evaluate inverter lifespan",
        interval: 120,
        estTime: "1 hr",
        severity: "Critical",
      },
    ],
  },
  {
    name: "Fronius",
    models: ["Primo", "Symo", "GEN24"],
    maintenanceTasks: [
      {
        task: "Visual inspection (terminals, housing)",
        interval: 12,
        estTime: "30 min",
        severity: "Routine",
      },
      {
        task: "Solar.web error analysis",
        interval: 12,
        estTime: "15 min",
        severity: "Critical",
      },
      {
        task: "Check AC/DC terminals for overheating",
        interval: 12,
        estTime: "20 min",
        severity: "Critical",
      },
      {
        task: "Fan/filter cleaning/replacement",
        interval: 24,
        estTime: "45 min",
        severity: "Routine",
      },
      {
        task: "Hybrid/PV Point test",
        interval: 24,
        estTime: "30 min",
        severity: "Critical",
      },
      {
        task: "Capacitor replacement",
        interval: 120,
        estTime: "2 hr",
        severity: "Critical",
      },
      {
        task: "Inverter evaluation",
        interval: 120,
        estTime: "1 hr",
        severity: "Critical",
      },
    ],
  },
  {
    name: "Enphase",
    models: ["IQ6", "IQ7", "IQ8"],
    maintenanceTasks: [
      {
        task: "Monitor Envoy connectivity",
        interval: 12,
        estTime: "15 min",
        severity: "Critical",
      },
      {
        task: "Firmware update (Enlighten)",
        interval: 12,
        estTime: "15 min",
        severity: "Routine",
      },
      {
        task: "Check cabling (waterproofing)",
        interval: 12,
        estTime: "30 min",
        severity: "Critical",
      },
      {
        task: "Full system check (cabling, orphaned modules via API)",
        interval: 24,
        estTime: "1 hr",
        severity: "Critical",
      },
      {
        task: "Evaluate microinverter replacement",
        interval: 120,
        estTime: "2 hr",
        severity: "Critical",
      },
    ],
  },
  {
    name: "KOSTAL",
    models: ["Plenticore Plus"],
    maintenanceTasks: [
      {
        task: "Remote log review (Modbus/REST API)",
        interval: 12,
        estTime: "15 min",
        severity: "Critical",
      },
      {
        task: "Visual inspection",
        interval: 12,
        estTime: "30 min",
        severity: "Routine",
      },
      {
        task: "Cooling system check",
        interval: 24,
        estTime: "45 min",
        severity: "Routine",
      },
      {
        task: "Hybrid/battery test",
        interval: 24,
        estTime: "30 min",
        severity: "Critical",
      },
      {
        task: "Re-tighten screws",
        interval: 24,
        estTime: "20 min",
        severity: "Critical",
      },
      {
        task: "Capacitor replacement",
        interval: 120,
        estTime: "2 hr",
        severity: "Critical",
      },
      {
        task: "Inverter evaluation",
        interval: 120,
        estTime: "1 hr",
        severity: "Critical",
      },
    ],
  },
  {
    name: "SolarEdge",
    models: ["HD-Wave + Optimizers"],
    maintenanceTasks: [
      {
        task: "Monitor optimizers (portal)",
        interval: 12,
        estTime: "15 min",
        severity: "Critical",
      },
      {
        task: "Firmware update (SetApp)",
        interval: 12,
        estTime: "15 min",
        severity: "Routine",
      },
      {
        task: "Anomaly detection",
        interval: 12,
        estTime: "20 min",
        severity: "Critical",
      },
      {
        task: "Thermal scan (optimizers)",
        interval: 24,
        estTime: "1 hr",
        severity: "Critical",
      },
      {
        task: "String impedance test",
        interval: 24,
        estTime: "30 min",
        severity: "Critical",
      },
      {
        task: "Capacitor replacement",
        interval: 120,
        estTime: "2 hr",
        severity: "Critical",
      },
      {
        task: "Inverter evaluation",
        interval: 120,
        estTime: "1 hr",
        severity: "Critical",
      },
    ],
  },
  {
    name: "Huawei",
    models: ["SUN2000 Series"],
    maintenanceTasks: [
      {
        task: "FusionSolar log review",
        interval: 12,
        estTime: "15 min",
        severity: "Critical",
      },
      {
        task: "Visual inspection",
        interval: 12,
        estTime: "30 min",
        severity: "Routine",
      },
      {
        task: "Arc-fault/SPD check",
        interval: 12,
        estTime: "20 min",
        severity: "Critical",
      },
      {
        task: "Fan filter cleaning/replacement",
        interval: 24,
        estTime: "45 min",
        severity: "Routine",
      },
      {
        task: "Capacitor replacement",
        interval: 120,
        estTime: "2 hr",
        severity: "Critical",
      },
      {
        task: "Inverter evaluation",
        interval: 120,
        estTime: "1 hr",
        severity: "Critical",
      },
    ],
  },
  {
    name: "Sungrow",
    models: ["SH/SG Hybrid"],
    maintenanceTasks: [
      {
        task: "iSolarCloud API review",
        interval: 12,
        estTime: "15 min",
        severity: "Critical",
      },
      {
        task: "Visual inspection",
        interval: 12,
        estTime: "30 min",
        severity: "Routine",
      },
      {
        task: "Grid-support test",
        interval: 12,
        estTime: "20 min",
        severity: "Critical",
      },
      {
        task: "Fan/cooling cleaning",
        interval: 24,
        estTime: "45 min",
        severity: "Routine",
      },
      {
        task: "Battery connection check (hybrid)",
        interval: 24,
        estTime: "30 min",
        severity: "Critical",
      },
      {
        task: "Capacitor replacement",
        interval: 120,
        estTime: "2 hr",
        severity: "Critical",
      },
      {
        task: "Inverter evaluation",
        interval: 120,
        estTime: "1 hr",
        severity: "Critical",
      },
    ],
  },
  {
    name: "KACO",
    models: ["blueplanet TL"],
    maintenanceTasks: [
      {
        task: "RS-485 log checks",
        interval: 6,
        estTime: "15 min",
        severity: "Critical",
      },
      {
        task: "Visual inspection",
        interval: 6,
        estTime: "30 min",
        severity: "Routine",
      },
      {
        task: "Fan replacement (if noisy)",
        interval: 24,
        estTime: "1 hr",
        severity: "Critical",
      },
      {
        task: "Capacitor inspection",
        interval: 24,
        estTime: "45 min",
        severity: "Critical",
      },
      {
        task: "Capacitor replacement",
        interval: 120,
        estTime: "2 hr",
        severity: "Critical",
      },
      {
        task: "Inverter evaluation",
        interval: 120,
        estTime: "1 hr",
        severity: "Critical",
      },
    ],
  },
];

export default function HomeOwner() {
  const { form, setForm } = useHomeOwner();

  const [hasPV, setHasPV] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(form.brand || "");
  const [selectedModel, setSelectedModel] = useState(form.model || "");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "brand") {
      setSelectedBrand(e.target.value);
      setSelectedModel(""); // Reset model when brand changes
      setForm({ ...form, brand: e.target.value, model: "" });
    }
    if (e.target.name === "model") {
      setSelectedModel(e.target.value);
      setForm({ ...form, model: e.target.value });
    }
    // ...other fields...
  };

  const handleContinue = () => {
    // Optionally save form data here
    navigate("/homeowner/maintenanceSetup");
  };

  const modelsForBrand =
    brandsData.find((b) => b.name === selectedBrand)?.models || [];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="background.default"
      p={2}
      height="95dvh"
      width="95dvw"
      sx={{
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        boxShadow: 8,
        mx: "auto",
        mt: 3,
        maxWidth: 600,
      }}
    >
      {/* Header with green circle and text */}
      <Box
        position="relative"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={4}
        mt={12}
      >
        <Box
          sx={{
            position: "absolute",
            width: 160,
            height: 160,
            bgcolor: "primary.main",
            borderRadius: "50%",
            zIndex: 1,
            opacity: 1,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            position: "relative",
            zIndex: 2,
            fontWeight: "bold",
            color: "secondary.main",
            textAlign: "center",
          }}
        >
          Welcome to WattMaintain
        </Typography>
      </Box>

      <Typography variant="h6" mb={2} mt={4}>
        Create an account
      </Typography>

      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={1}
        width="100%"
        maxWidth={350}
      >
        <TextField
          label="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          size="small"
          InputLabelProps={{ required: false }}
        />
        <TextField
          label="email@domain.de"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          size="small"
          InputLabelProps={{ required: false }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={hasPV}
              onChange={(e) => setHasPV(e.target.checked)}
              color="primary"
            />
          }
          label="I already have a PV system"
          sx={{ mb: 1 }}
        />

        {hasPV && (
          <>
            <Typography variant="subtitle1">
              When did you buy your PV panels?
            </Typography>
            <TextField
              name="purchaseDate"
              type="month"
              value={form.purchaseDate}
              onChange={handleChange}
              size="small"
              required
              InputLabelProps={{ required: false, shrink: true }}
              sx={{ mt: 0 }}
            />
            <Typography variant="subtitle1">
              What is the brand of your PV?
            </Typography>
            <TextField
              select
              label="PV Brand"
              name="brand"
              value={selectedBrand}
              onChange={handleChange}
              required
              size="small"
              InputLabelProps={{ required: false }}
              sx={{ mt: 0 }}
            >
              {brandsData.map((brand) => (
                <MenuItem key={brand.name} value={brand.name}>
                  {brand.name}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="subtitle1">
              Which model do you have?
            </Typography>
            <TextField
              select
              label="PV Model"
              name="model"
              value={selectedModel}
              onChange={handleChange}
              required
              size="small"
              InputLabelProps={{ required: false }}
              sx={{ mt: 0 }}
              disabled={!selectedBrand}
            >
              {modelsForBrand.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="subtitle1">Where are you located?</Typography>
            <TextField
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              size="small"
              InputLabelProps={{ required: false }}
              sx={{ mt: 0 }}
              InputProps={{
                startAdornment: (
                  <LocationOnIcon sx={{ color: "primary.main", mr: 1 }} />
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.storageSystem}
                  color="primary"
                  onChange={(e) =>
                    setForm({ ...form, storageSystem: e.target.checked })
                  }
                />
              }
              label="I also have a storage system"
            />
          </>
        )}

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2, py: 1.5, fontWeight: "bold", boxShadow: 3 }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
