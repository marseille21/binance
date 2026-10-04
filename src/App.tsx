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
          
          <Route path="/" element={<Home />} />

        
          <Route path="/markets" element={<Markets />} />

        
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

          
          <Route path="/buy" element={<Buy />} />

          
          <Route path="/earn" element={<Earn />} />

        
          <Route
            path="/profile"
            element={
              <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-6xl">
                  <h1 className="text-xl font-semibold sm:text-2xl">
                    Profile
                  </h1>
                </div>
              </div>
            }
          />

    
          <Route
            path="/wallet"
            element={
              <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-6xl">
                  <h1 className="text-xl font-semibold sm:text-2xl">
                    Wallet
                  </h1>
                </div>
              </div>
            }
          />
          <Route
            path="/settings"
            element={
              <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-6xl">
                  <h1 className="text-xl font-semibold sm:text-2xl">
                    Settings
                  </h1>
                </div>
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