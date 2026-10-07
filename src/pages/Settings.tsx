
import { useState } from "react";
import {
  Bell,
  ChevronRight,
  Globe,
  Lock,
  Moon,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
};

function SettingItem({
  icon,
  title,
  description,
  onClick,
}: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 border-b border-[#2b2f36] px-4 py-5 text-left transition hover:bg-[#1a1d21] sm:px-6"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2b2f36] text-gray-300">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
      </div>

      <ChevronRight
        size={18}
        className="shrink-0 text-gray-500"
      />
    </button>
  );
}

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main className="min-h-screen w-full bg-[#0b0e11] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account, security and trading preferences.
          </p>
        </div>

        {/* Account */}
        <section className="mb-6 overflow-hidden rounded-xl border border-[#2b2f36] bg-[#15181d]">
          <div className="border-b border-[#2b2f36] px-4 py-4 sm:px-6">
            <h2 className="font-medium">Account</h2>
            <p className="mt-1 text-xs text-gray-500">
              Manage your personal account information.
            </p>
          </div>

          <SettingItem
            icon={<User size={19} />}
            title="Profile"
            description="Manage your username, email and profile information."
          />

          <SettingItem
            icon={<Globe size={19} />}
            title="Language"
            description="English"
          />
        </section>

        {/* Security */}
        <section className="mb-6 overflow-hidden rounded-xl border border-[#2b2f36] bg-[#15181d]">
          <div className="border-b border-[#2b2f36] px-4 py-4 sm:px-6">
            <h2 className="font-medium">Security</h2>
            <p className="mt-1 text-xs text-gray-500">
              Protect your account and trading activity.
            </p>
          </div>

          <SettingItem
            icon={<Lock size={19} />}
            title="Password"
            description="Change your account password."
          />

          <SettingItem
            icon={<ShieldCheck size={19} />}
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account."
          />

          <SettingItem
            icon={<Smartphone size={19} />}
            title="Device Management"
            description="Review devices currently signed in to your account."
          />
        </section>

        {/* Preferences */}
        <section className="mb-6 overflow-hidden rounded-xl border border-[#2b2f36] bg-[#15181d]">
          <div className="border-b border-[#2b2f36] px-4 py-4 sm:px-6">
            <h2 className="font-medium">Preferences</h2>
            <p className="mt-1 text-xs text-gray-500">
              Customize how your trading app behaves.
            </p>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between border-b border-[#2b2f36] px-4 py-5 sm:px-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b2f36] text-gray-300">
                <Bell size={19} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Notifications
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Receive trading and account notifications.
                </p>
              </div>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative h-6 w-11 rounded-full transition ${
                notifications
                  ? "bg-[#0ecb81]"
                  : "bg-[#3a3f46]"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  notifications
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Dark mode */}
          <div className="flex items-center justify-between px-4 py-5 sm:px-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b2f36] text-gray-300">
                <Moon size={19} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Dark Mode
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Use the dark interface throughout the app.
                </p>
              </div>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative h-6 w-11 rounded-full transition ${
                darkMode
                  ? "bg-[#0ecb81]"
                  : "bg-[#3a3f46]"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  darkMode
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* Trading preferences */}
        <section className="overflow-hidden rounded-xl border border-[#2b2f36] bg-[#15181d]">
          <div className="border-b border-[#2b2f36] px-4 py-4 sm:px-6">
            <h2 className="font-medium">Trading Preferences</h2>
            <p className="mt-1 text-xs text-gray-500">
              Configure your trading experience.
            </p>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
            <div className="rounded-lg border border-[#2b2f36] bg-[#0f1115] p-4">
              <p className="text-xs text-gray-500">
                Default Trading Pair
              </p>

              <p className="mt-2 font-medium">
                BTC / USDT
              </p>
            </div>

            <div className="rounded-lg border border-[#2b2f36] bg-[#0f1115] p-4">
              <p className="text-xs text-gray-500">
                Default Order Type
              </p>

              <p className="mt-2 font-medium">
                Market
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
