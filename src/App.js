import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";
import "./App.css";

const MainLayout = lazy(() => import("./MainLayout/Layout"));
const Login = lazy(() => import("./Modules/Authentication/Login"));
const PatientTabs = lazy(() => import("./Modules/PatientInfo/PatientTabs"));
const PersonalDetails = lazy(
  () => import("./Modules/PatientInfo/PersonalDetails"),
);
const HealthTrack = lazy(() => import("./Modules/PatientInfo/HealthTrack"));
const Medication = lazy(() => import("./Modules/PatientInfo/Medication"));
const BloodSugar = lazy(() => import("./Modules/PatientInfo/BloodSugar"));
const Dashboard = lazy(() => import("./Modules/Dashboard/Dashboard"));

const App = () => {
  return (
    <Suspense
      fallback={
        <p className='d-flex justify-content-center align-items-center text-light vh-100'>
          Loading
        </p>
      }
    >
      <Routes>
        <Route path='login' element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to='dashboard' />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='/patient-info/:id' element={<PatientTabs />}>
            <Route index element={<Navigate to='personal-details' />} />
            <Route path='personal-details' element={<PersonalDetails />} />
            <Route path='health-track' element={<HealthTrack />} />
            <Route path='medication' element={<Medication />} />
            <Route path='blood-sugar' element={<BloodSugar />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
