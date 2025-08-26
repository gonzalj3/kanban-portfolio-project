import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StylesThemeProvider } from "@mui/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/auth/auth.provider";

import { theme } from "./themes/theme";

import Board from "./pages/Board";
import Calendar from "./pages/Calendar";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LogOut from "./helpers/LogOut";
import NavigationBar from "./components/NavigationBar";
import BoardBar from "./components/BoardBar";

import "./App.css";
import { DashboardProvider } from "./context/dashboard/dashboard.provider";
import Test from "./pages/Test";

function AppContent() {
  const location = useLocation();
  const showNavigation = ["/", "/calendar"].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardProvider>
                {showNavigation && <NavigationBar />}
                {showNavigation && <BoardBar />}
                <Board />
              </DashboardProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <DashboardProvider>
                {showNavigation && <NavigationBar />}
                {showNavigation && <BoardBar />}
                <Calendar />
              </DashboardProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={<LogOut />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StylesThemeProvider theme={theme}>
          <AuthProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </AuthProvider>
        </StylesThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
