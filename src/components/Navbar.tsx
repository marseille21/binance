
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  Wallet,
  LogOut,
  Bell,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import profileImage from "../image/Profile.jpeg";

const NAV_LINKS = [
  { label: "Buy Crypto", to: "/buy" },
  { label: "Markets", to: "/markets" },
  { label: "Trade", to: "/trade/BTCUSDT" },
  { label: "Derivatives", to: "/trade/BTCUSDT" },
  { label: "Earn", to: "/earn" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#2b2f36] bg-[#0b0e11] text-white">

      
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">

       
        <div className="flex items-center gap-4 lg:gap-6">
 
          <button
            type="button"
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setProfileOpen(false);
              setNotificationsOpen(false);
            }}
            className="rounded-md p-2 transition hover:bg-[#181a20] lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

      
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="text-xl font-bold text-[#f0b90b]"
          >
            Binance
          </Link>

         
          <nav className="hidden items-center gap-5 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-gray-200 transition hover:text-[#f0b90b]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
 
        <div className="flex items-center gap-1 sm:gap-2">

        
          <button
            type="button"
            className="rounded-full p-2 transition hover:bg-[#181a20]"
          >
            <Search size={20} />
          </button>

    
          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="relative rounded-full p-2 transition hover:bg-[#181a20]"
            >
              <Bell size={20} />

    
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#f6465d]" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-12 w-[280px] overflow-hidden rounded-xl border border-[#2b2f36] bg-[#181a20] shadow-2xl sm:w-80">

                <div className="flex items-center justify-between border-b border-[#2b2f36] px-4 py-3">
                  <h3 className="font-semibold">
                    Notifications
                  </h3>

                  <span className="text-xs text-gray-500">
                    1 new
                  </span>
                </div>

                <div className="p-3">
                  <div className="rounded-lg bg-[#0b0e11] p-3">

                    <p className="text-sm font-medium">
                      Welcome to Binance
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Your trading account is ready.
                    </p>

                    <p className="mt-2 text-[11px] text-gray-500">
                      Just now
                    </p>

                  </div>
                </div>
              </div>
            )}
          </div>

        
          <div className="relative">

      
            <button
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 rounded-full p-1 transition hover:bg-[#181a20]"
            >


              <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-[#f0b90b] bg-[#2b2f36]">

                <img
                  src={user?.profileImage || profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />

              </div>

            
              <ChevronDown
                size={16}
                className={`hidden transition-transform sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            
            {profileOpen && (
              <div className="absolute right-0 top-12 w-64 overflow-hidden rounded-xl border border-[#2b2f36] bg-[#181a20] shadow-2xl">

            
                <div className="border-b border-[#2b2f36] p-4">

                  <div className="flex items-center gap-3">

          
                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[#f0b90b] bg-[#2b2f36]">

                      <img
                        src={user?.profileImage || profileImage}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />

                    </div>

      
                    <div className="min-w-0">

                      <p className="truncate font-semibold">
                        {user?.username || "LilyKevin182"}
                      </p>

                      <p className="truncate text-xs text-gray-400">
                        {user?.email || "kj5057409@gmail.com"}
                      </p>

                    </div>

                  </div>
                </div>

            
                <div className="p-2">

    
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-[#2b2f36]"
                  >
                    <User size={18} />
                    Profile
                  </button>

                
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/wallet");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-[#2b2f36]"
                  >
                    <Wallet size={18} />
                    Wallet
                  </button>

      
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/settings");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-[#2b2f36]"
                  >
                    <Settings size={18} />
                    Settings
                  </button>

          
                  <div className="my-2 border-t border-[#2b2f36]" />

            
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#f6465d] transition hover:bg-[#2b2f36]"
                  >
                    <LogOut size={18} />
                    Log out
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#2b2f36] bg-[#0b0e11] lg:hidden">

          <nav className="flex flex-col p-3">

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm transition hover:bg-[#181a20] hover:text-[#f0b90b]"
              >
                {link.label}
              </Link>
            ))}

          </nav>
        </div>
      )}

    </header>
  );
}
 
