 import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { WalletProvider } from "./context/WalletContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Markets from "./pages/Markets";
import Trade from "./pages/Trade";
import Buy from "./pages/Buy";
import Earn from "./pages/Earn";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Support from "./pages/Support";

import Navbar from "./components/Navbar";

function AppRoutes() {
  const { user } = useAuth();

  // If the user is not logged in,
  // only show the Login page.
  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0b0e11] text-white">
      <Navbar />

      <main className="w-full overflow-x-hidden">
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* MARKETS */}
          <Route path="/markets" element={<Markets />} />

          {/* TRADE */}
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

          {/* BUY */}
          <Route path="/buy" element={<Buy />} />

          {/* EARN */}
          <Route path="/earn" element={<Earn />} />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* WALLET */}
          <Route
            path="/wallet"
            element={<Wallet />}
          />

          {/* SETTINGS */}
          <Route
            path="/settings"
            element={<Settings />}
          />

          {/* SUPPORT */}
          <Route
            path="/support"
            element={<Support />}
          />

          {/* UNKNOWN PAGE */}
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
      </main>
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
