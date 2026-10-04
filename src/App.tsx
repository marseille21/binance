 import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { WalletProvider } from "./context/WalletContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Markets from "./pages/Markets";
import Trade from "./pages/Trade";
import Buy from "./pages/Buy";
import Earn from "./pages/Earn";

import Navbar from "./components/Navbar";

function AppRoutes() {
  const { user } = useAuth();

  // ==============================
  // NOT LOGGED IN
  // SHOW LOGIN ONLY
  // ==============================
  if (!user) {
    return (
      <Routes>
        <Route
          path="*"
          element={<Login />}
        />
      </Routes>
    );
  }

  // ==============================
  // LOGGED IN
  // SHOW THE APP
  // ==============================
  return (
    <div className="min-h-screen bg-[#0b0e11] text-white">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/markets"
          element={<Markets />}
        />

        <Route
          path="/trade"
          element={
            <Navigate
              to="/trade/BTCUSDT"
              replace
            />
          }
        />

        <Route
          path="/trade/:symbol"
          element={<Trade />}
        />

        <Route
          path="/buy"
          element={<Buy />}
        />

        <Route
          path="/earn"
          element={<Earn />}
        />

        <Route
          path="/profile"
          element={
            <div className="p-6">
              Profile
            </div>
          }
        />

        <Route
          path="/wallet"
          element={
            <div className="p-6">
              Wallet
            </div>
          }
        />

        <Route
          path="/settings"
          element={
            <div className="p-6">
              Settings
            </div>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <AppRoutes />
      </WalletProvider>
    </AuthProvider>
  );
}