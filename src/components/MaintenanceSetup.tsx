import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeOwner } from "../context/HomeOwnerContext";
import { addMonths } from "date-fns";

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

export type MaintenanceTask = {
  task: string;
  interval: number;
  estTime: string;
  severity: string;
  tools?: string;
  nextDate?: string; // calculated next maintenance date
};

export type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  severity?: string;
  estTime?: string;
};

export type HomeOwnerForm = {
  name: string;
  email: string;
  purchaseDate: string;
  brand: string;
  model: string;
  location: string;
  storageSystem: boolean;
  checkupInterval: string;
  cleaningInterval: string;
  reminder: boolean;
  nextMaintenanceDate: string;
};

export default function MaintenanceSetup() {
  const { form, setForm } = useHomeOwner();
  const navigate = useNavigate();
  const [reminder, setReminder] = useState(form.reminder ?? true); // default to true or use form.reminder

  // Calculate months since purchase
  const purchaseDate = form.purchaseDate ? new Date(form.purchaseDate) : null;
  const today = new Date();
  let monthsSincePurchase = 0;
  if (purchaseDate) {
    monthsSincePurchase =
      (today.getFullYear() - purchaseDate.getFullYear()) * 12 +
      (today.getMonth() - purchaseDate.getMonth());
    if (monthsSincePurchase < 0) monthsSincePurchase = 0;
  }

  // Find selected brand and model
  const selectedBrand = brandsData.find((b) => b.name === form.brand);
  const selectedModel = form.model;
  const maintenanceTasks = selectedBrand?.maintenanceTasks || [];

  const criticalTasks = maintenanceTasks.filter(
    (task) => task.severity === "Critical" && task.interval <= 24
  );
  let limitedTasks: typeof maintenanceTasks = [];
  if (criticalTasks.length >= 5) {
    limitedTasks = criticalTasks.slice(0, 5);
  } else {
    // Fill up with any remaining tasks (including non-critical and critical with interval > 24)
    const otherTasks = maintenanceTasks.filter(
      (task) => !(task.severity === "Critical" && task.interval <= 24)
    );
    limitedTasks = [
      ...criticalTasks,
      ...otherTasks.slice(0, 5 - criticalTasks.length),
    ];
  }

  // Adjust intervals by months since purchase
  const adjustedIntervals = limitedTasks.map((task) => {
    const adjusted = Math.max(task.interval - monthsSincePurchase, 0);
    return adjusted;
  });

  // State for intervals per task
  const [taskIntervals, setTaskIntervals] = useState(adjustedIntervals);

  // Handle interval change for a specific task
  const handleIntervalChange = (idx: number, value: string) => {
    const newIntervals = [...taskIntervals];
    newIntervals[idx] = value;
    setTaskIntervals(newIntervals);
  };

  const handleContinue = () => {
    // Calculate next maintenance dates for each task
    const tasksWithDates = limitedTasks.map((task, idx) => {
      const interval = Number(taskIntervals[idx]);
      const nextDate = addMonths(today, interval).toISOString().slice(0, 10);
      return { ...task, interval, nextDate };
    });

    // ...notifications/calendarEvents logic unchanged...
    let notifications: Notification[] = [];
    let calendarEvents: Notification[] = [];
    if (reminder) {
      notifications = tasksWithDates.map((task, idx) => ({
        id: idx + 1,
        title: `Maintenance Reminder: ${task.task}`,
        message: `Scheduled for ${task.nextDate}`,
        date: task.nextDate,
        severity: task.severity,
        estTime: task.estTime,
      }));
      calendarEvents = [...notifications];
    }

    setForm({
      ...form,
      maintenanceTasks: tasksWithDates,
      reminder,
      notifications,
      calendarEvents,
    });
    navigate("/homeowner/systemSizeSubscription");
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
      {/* Sun-like circle in top left */}
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
          mt: 6,
          mb: 2,
          fontWeight: "bold",
          color: "secondary.main",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        According to your system, <br />
        Your provider recommends
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        width="100%"
        maxWidth={350}
        zIndex={2}
        mt={1}
      >
        {limitedTasks.length === 0 ? (
          <Typography color="error">
            No maintenance tasks found for your selection.
          </Typography>
        ) : (
          limitedTasks.map((task, idx) => (
            <Box
              key={task.task}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 2,
                p: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {task.task}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                  label="Interval (months)"
                  type="number"
                  value={taskIntervals[idx]}
                  onChange={(e) => handleIntervalChange(idx, e.target.value)}
                  size="small"
                  sx={{ width: 120 }}
                />
                <Typography
                  variant="body2"
                  color={
                    task.severity === "Critical" ? "error.main" : "success.main"
                  }
                >
                  {task.severity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.estTime}
                </Typography>
                {task.tools && (
                  <Typography variant="body2" color="info.main">
                    Tools: {task.tools}
                  </Typography>
                )}
              </Stack>
            </Box>
          ))
        )}
        <Typography variant="h6" mt={2}>
          Would you like to set a reminder?
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant={reminder ? "contained" : "outlined"}
            color={reminder ? "secondary" : "success"}
            onClick={() => setReminder(true)}
            sx={{
              fontWeight: "bold",
              minWidth: 100,
              boxShadow: reminder ? 3 : 0,
            }}
          >
            Yes
          </Button>
          <Button
            variant={!reminder ? "contained" : "outlined"}
            color={!reminder ? "secondary" : "success"}
            onClick={() => setReminder(false)}
            sx={{
              fontWeight: "bold",
              minWidth: 100,
              boxShadow: !reminder ? 3 : 0,
            }}
          >
            No
          </Button>
        </Stack>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 6, py: 1.5, fontWeight: "bold", boxShadow: 3 }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
