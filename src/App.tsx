import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.ts";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.tsx";
import HomeOwner from "./components/HomeOwner.tsx";
import { HomeOwnerProvider } from "./context/HomeOwnerContext.tsx";
import MaintenanceSetup from "./components/MaintenanceSetup.tsx";
import MaintenanceDashboard from "./components/MaintenanceDashboard.tsx";
import TechnicianList from "./components/TechnicianList.tsx";
import BookingPage from "./components/BookingPage.tsx";
import Notifications from "./components/Notifications.tsx";
import HomeOwnerProfile from "./components/HomeOwnerProfile.tsx";
import CalendarPage from "./components/MaintenanceCalendar.tsx";
import SystemSizeSubscription from "./components/SystemSizeSubscription.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomeOwnerProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homeowner" element={<HomeOwner />} />
          <Route path="/technician" element={<LandingPage />} />
          <Route
            path="/homeowner/maintenanceSetup"
            element={<MaintenanceSetup />}
          />
          <Route
            path="/homeowner/maintenanceDashboard"
            element={<MaintenanceDashboard />}
          />
          <Route path="/homeowner/technicians" element={<TechnicianList />} />
          <Route path="/homeowner/booking" element={<BookingPage />} />
          <Route path="/homeowner/notifications" element={<Notifications />} />
          <Route path="/homeowner/profile" element={<HomeOwnerProfile />} />
          <Route path="/homeowner/calendar" element={<CalendarPage />} />
          <Route
            path="/homeowner/systemSizeSubscription"
            element={<SystemSizeSubscription />}
          />
        </Routes>
      </HomeOwnerProvider>
    </ThemeProvider>
  );
}

export default App;
