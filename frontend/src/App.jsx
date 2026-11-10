import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CitizenDashboard from './pages/CitizenDashboard.jsx';
import ReportIncident from './pages/ReportIncident.jsx';
import EOCDashboard from './pages/EOCDashboard.jsx';
import RescueDashboard from './pages/RescueDashboard.jsx';
import HospitalDashboard from './pages/HospitalDashboard.jsx';
import ShelterDashboard from './pages/ShelterDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { FRONTEND_DEMO_MODE } from './utils/demoAuth.js';

export default function App() {
  const { user } = useAuth();

  return (
    <>
      {FRONTEND_DEMO_MODE && user && (
        <div className="bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-950">
          Frontend demo session only — live data and changes require the backend.
        </div>
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={FRONTEND_DEMO_MODE ? <Navigate to="/login" replace /> : <Register />}
        />

        <Route
          path="/citizen"
          element={
            <ProtectedRoute allowedRoles={['citizen', 'volunteer', 'ngo']}>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen/report"
          element={
            FRONTEND_DEMO_MODE ? (
              <Navigate to="/citizen" replace />
            ) : (
              <ProtectedRoute allowedRoles={['citizen', 'volunteer', 'ngo']}>
                <ReportIncident />
              </ProtectedRoute>
            )
          }
        />

        <Route
          path="/eoc"
          element={
            <ProtectedRoute allowedRoles={['eoc', 'admin']}>
              <EOCDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rescue"
          element={
            <ProtectedRoute allowedRoles={['rescue_team']}>
              <RescueDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospital"
          element={
            <ProtectedRoute allowedRoles={['hospital']}>
              <HospitalDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shelter"
          element={
            <ProtectedRoute allowedRoles={['shelter']}>
              <ShelterDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}
