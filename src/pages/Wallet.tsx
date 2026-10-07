 import { useState } from "react";
import {
  Eye,
  EyeOff,
  Wallet as WalletIcon,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRightLeft,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useWallet, type Coin } from "../context/WalletContext";

const COIN_INFO: Record<
  Coin,
  {
    name: string;
    price: number;
    icon: string;
  }
> = {
  BTC: {
    name: "Bitcoin",
    price: 109250.5,
    icon: "₿",
  },
  ETH: {
    name: "Ethereum",
    price: 3925.75,
    icon: "Ξ",
  },
  BNB: {
    name: "BNB",
    price: 875.4,
    icon: "◆",
  },
  SOL: {
    name: "Solana",
    price: 215.68,
    icon: "◎",
  },
  USDT: {
    name: "Tether",
    price: 1,
    icon: "₮",
  },
};

const coins: Coin[] = ["BTC", "ETH", "BNB", "SOL", "USDT"];

export default function Wallet() {
  const navigate = useNavigate();

  const { balances, portfolioValue, totalEarned } = useWallet();

  const [showBalance, setShowBalance] = useState(true);

  const formatMoney = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatCoin = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 8,
    });

  return (
    <main className="min-h-screen bg-[#0b0e11] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0b90b]/10">
              <WalletIcon
                size={23}
                className="text-[#f0b90b]"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Wallet
              </h1>

              <p className="text-sm text-[#848e9c]">
                Manage your crypto assets
              </p>
            </div>
          </div>
        </div>

        {/* Balance */}
        <section className="rounded-2xl border border-[#2b3139] bg-[#181a20] p-5 sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-[#848e9c]">
                Estimated Total Balance
              </p>

              <div className="mt-3 flex flex-wrap items-end gap-3">
                <h2 className="text-3xl font-bold sm:text-5xl">
                  {showBalance
                    ? `$${formatMoney(portfolioValue)}`
                    : "••••••••"}
                </h2>

                <span className="mb-1 text-sm text-[#848e9c]">
                  USD
                </span>
              </div>

              <p className="mt-3 text-sm text-[#0ecb81]">
                Portfolio balance
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowBalance((value) => !value)
              }
              className="flex w-fit items-center gap-2 rounded-lg border border-[#474d57] px-4 py-2 text-sm transition hover:bg-[#2b2f36]"
            >
              {showBalance ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}

              {showBalance
                ? "Hide Balance"
                : "Show Balance"}
            </button>
          </div>

          <div className="my-6 h-px bg-[#2b3139]" />

          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#2b3139] bg-[#0f1115] p-4">
              <p className="text-xs text-[#848e9c]">
                Total Balance
              </p>

              <p className="mt-2 text-lg font-semibold">
                {showBalance
                  ? `$${formatMoney(portfolioValue)}`
                  : "••••••"}
              </p>
            </div>

            <div className="rounded-xl border border-[#2b3139] bg-[#0f1115] p-4">
              <p className="text-xs text-[#848e9c]">
                Earned
              </p>

              <p className="mt-2 text-lg font-semibold text-[#0ecb81]">
                {showBalance
                  ? `$${formatMoney(totalEarned)}`
                  : "••••••"}
              </p>
            </div>

            <div className="rounded-xl border border-[#2b3139] bg-[#0f1115] p-4">
              <p className="text-xs text-[#848e9c]">
                Assets
              </p>

              <p className="mt-2 text-lg font-semibold">
                {coins.filter(
                  (coin) => balances[coin] > 0
                ).length}
              </p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate("/buy")}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#f0b90b] px-5 py-3 font-semibold text-black transition hover:bg-[#f8c62e]"
          >
            <ArrowDownLeft size={18} />
            Deposit / Buy
          </button>

          <button
            type="button"
            onClick={() => navigate("/trade/BTCUSDT")}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#474d57] bg-[#181a20] px-5 py-3 font-semibold transition hover:bg-[#2b3139]"
          >
            <ArrowUpRight size={18} />
            Trade
          </button>

          <button
            type="button"
            onClick={() => navigate("/earn")}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#474d57] bg-[#181a20] px-5 py-3 font-semibold transition hover:bg-[#2b3139]"
          >
            <ArrowRightLeft size={18} />
            Earn
          </button>
        </section>

        {/* Assets */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Assets
              </h2>

              <p className="mt-1 text-sm text-[#848e9c]">
                Your available cryptocurrency balances
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#2b3139] bg-[#181a20]">
            {/* Desktop Header */}
            <div className="hidden grid-cols-4 border-b border-[#2b3139] px-5 py-4 text-xs font-medium text-[#848e9c] md:grid">
              <span>Asset</span>
              <span>Price</span>
              <span>Balance</span>
              <span className="text-right">
                Value
              </span>
            </div>

            {coins.map((coin) => {
              const info = COIN_INFO[coin];
              const balance = balances[coin];
              const value = balance * info.price;

              return (
                <div
                  key={coin}
                  className="border-b border-[#2b3139] px-5 py-5 last:border-b-0 transition hover:bg-[#1f2329]"
                >
                  <div className="grid gap-4 md:grid-cols-4 md:items-center">
                    {/* Asset */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f1115] text-lg font-bold text-[#f0b90b]">
                        {info.icon}
                      </div>

                      <div>
                        <p className="font-semibold">
                          {coin}
                        </p>

                        <p className="text-xs text-[#848e9c]">
                          {info.name}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <p className="text-xs text-[#848e9c] md:hidden">
                        Price
                      </p>

                      <p className="mt-1 font-medium md:mt-0">
                        ${formatMoney(info.price)}
                      </p>
                    </div>

                    {/* Balance */}
                    <div>
                      <p className="text-xs text-[#848e9c] md:hidden">
                        Balance
                      </p>

                      <p className="mt-1 font-medium md:mt-0">
                        {showBalance
                          ? `${formatCoin(balance)} ${coin}`
                          : "••••••••"}
                      </p>
                    </div>

                    {/* Value */}
                    <div className="md:text-right">
                      <p className="text-xs text-[#848e9c] md:hidden">
                        Value
                      </p>

                      <p className="mt-1 font-semibold md:mt-0">
                        {showBalance
                          ? `$${formatMoney(value)}`
                          : "••••••••"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Security */}
        <section className="mt-6 rounded-2xl border border-[#2b3139] bg-[#181a20] p-5 sm:p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0ecb81]/10">
              <ShieldCheck
                size={22}
                className="text-[#0ecb81]"
              />
            </div>

            <div>
              <h3 className="font-semibold">
                Wallet security
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#848e9c]">
                Protect your assets with account security,
                identity verification and two-factor
                authentication. Certain transfers may
                require additional verification.
              </p>
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="mt-6 grid gap-4 pb-10 md:grid-cols-2">
          <button
            type="button"
            onClick={() => navigate("/trade/BTCUSDT")}
            className="flex items-center justify-between rounded-xl border border-[#2b3139] bg-[#181a20] p-5 text-left transition hover:border-[#f0b90b]"
          >
            <div>
              <p className="font-semibold">
                Start Trading
              </p>

              <p className="mt-1 text-sm text-[#848e9c]">
                Buy and sell cryptocurrency
              </p>
            </div>

            <ChevronRight
              size={20}
              className="text-[#848e9c]"
            />
          </button>

          <button
            type="button"
            onClick={() => navigate("/earn")}
            className="flex items-center justify-between rounded-xl border border-[#2b3139] bg-[#181a20] p-5 text-left transition hover:border-[#f0b90b]"
          >
            <div>
              <p className="font-semibold">
                Earn Crypto
              </p>

              <p className="mt-1 text-sm text-[#848e9c]">
                Put your assets to work
              </p>
            </div>

            <ChevronRight
              size={20}
              className="text-[#848e9c]"
            />
          </button>
        </section>
      </div>
    </main>
  );
}