 import { useState } from "react";

import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart3,
  Send,
  Download,
  Eye,
  EyeOff,
  Wallet,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import ComplianceModal from "../components/ComplianceModel";
import { useWallet, type Coin } from "../context/WalletContext";

const topCoins = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "109,250.50",
    change: "+8.42%",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "3,925.75",
    change: "+6.74%",
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: "875.40",
    change: "+5.91%",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: "215.68",
    change: "+5.64%",
  },
];

const COIN_INFO: Record<
  Coin,
  {
    name: string;
    price: number;
  }
> = {
  BTC: {
    name: "Bitcoin",
    price: 109250.5,
  },

  ETH: {
    name: "Ethereum",
    price: 3925.75,
  },

  BNB: {
    name: "BNB",
    price: 875.4,
  },

  SOL: {
    name: "Solana",
    price: 215.68,
  },

  USDT: {
    name: "Tether",
    price: 1,
  },
};

const coins: Coin[] = [
  "BTC",
  "ETH",
  "BNB",
  "USDT",
];

function Home() {
  const navigate = useNavigate();

  const { balances, portfolioValue } = useWallet();

  const [showBalance, setShowBalance] = useState(true);

  const [complianceType, setComplianceType] = useState<
    "send" | "withdraw" | null
  >(null);

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
    <main className="min-h-screen bg-[#0b0e11] text-white">

      
      <section className="border-b border-[#2b3139] bg-[#0b0e11] px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2b3139] bg-[#181a20] px-4 py-2 text-sm text-[#b7bdc6]">
              <span className="h-2 w-2 rounded-full bg-[#0ecb81]" />
              Crypto Trading Platform
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Buy, sell and trade
              <span className="text-[#f0b90b]"> crypto</span>
              <br />
              with confidence.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#848e9c] md:text-lg">
              Trade digital assets, monitor markets and manage your
              cryptocurrency portfolio from one powerful dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                type="button"
                onClick={() => navigate("/trade/BTCUSDT")}
                className="flex items-center gap-2 rounded-lg bg-[#f0b90b] px-6 py-3 font-semibold text-black transition hover:bg-[#f8c62e]"
              >
                Start Trading
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/markets")}
                className="rounded-lg border border-[#474d57] px-6 py-3 font-semibold transition hover:bg-[#181a20]"
              >
                View Markets
              </button>

            </div>
          </div>

        
          <div className="grid grid-cols-2 gap-4">

            {topCoins.map((coin) => (
              <button
                key={coin.symbol}
                type="button"
                onClick={() =>
                  navigate(`/trade/${coin.symbol}USDT`)
                }
                className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5 text-left transition hover:border-[#f0b90b]"
              >
                <div className="flex items-center justify-between">

                  <span className="font-semibold">
                    {coin.symbol}
                  </span>

                  <TrendingUp
                    size={18}
                    className="text-[#0ecb81]"
                  />

                </div>

                <p className="mt-5 text-xl font-bold">
                  ${coin.price}
                </p>

                <p className="mt-2 text-sm text-[#0ecb81]">
                  {coin.change}
                </p>
              </button>
            ))}

          </div>

        </div>
      </section>

      <section className="border-b border-[#2b3139] bg-[#0f1115] px-6 py-12 md:px-12 lg:px-20">

        <div className="mx-auto max-w-7xl">

          
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0b90b]/10">
                <Wallet
                  size={22}
                  className="text-[#f0b90b]"
                />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Wallet Overview
                </h2>

                <p className="text-sm text-[#848e9c]">
                  Manage your crypto assets
                </p>

              </div>

            </div>

          
            <button
              type="button"
              onClick={() =>
                setShowBalance((value) => !value)
              }
              className="flex items-center gap-2 rounded-lg border border-[#474d57] px-4 py-2 text-sm transition hover:bg-[#181a20]"
            >
              {showBalance ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}

              {showBalance
                ? "Hide Balance"
                : "Show Balance"}
            </button>

          </div>

          <div className="grid gap-5 lg:grid-cols-3">

        
            <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-6 lg:col-span-2">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-[#848e9c]">
                    Estimated Total Balance
                  </p>

                  <div className="mt-3 flex items-end gap-3">

                    <h3 className="text-4xl font-bold">
                      {showBalance
                        ? `$${formatMoney(portfolioValue)}`
                        : "••••••••••"}
                    </h3>

                    <span className="mb-1 text-sm text-[#848e9c]">
                      USD
                    </span>

                  </div>
                </div>

                

              </div>

              <div className="mt-6 h-px bg-[#2b3139]" />

              
              <div className="mt-5 grid gap-4 md:grid-cols-2">

                {coins.map((coin) => {

                  const balance = balances[coin];

                  const price =
                    COIN_INFO[coin].price;

                  const value =
                    balance * price;

                  return (
                    <div
                      key={coin}
                      className="rounded-lg border border-[#2b3139] bg-[#0f1115] p-4"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="font-semibold">
                            {coin}
                          </p>

                          <p className="text-xs text-[#848e9c]">
                            {COIN_INFO[coin].name}
                          </p>

                        </div>

                        <span className="rounded-full bg-[#0ecb81]/10 px-2 py-1 text-[10px] font-semibold text-[#0ecb81]">
                          ACTIVE
                        </span>

                      </div>

                      <p className="mt-4 text-sm font-semibold">

                        {showBalance
                          ? `${formatCoin(balance)} ${coin}`
                          : "••••••••"}

                      </p>

                      <p className="mt-1 text-xs text-[#848e9c]">

                        {showBalance
                          ? `$${formatMoney(value)}`
                          : "••••••••"}

                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

        
            <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-6">

              <h3 className="font-semibold">
                BTC Actions
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#848e9c]">
                Send or withdraw Bitcoin. Transfers may
                require additional compliance verification.
              </p>

              <div className="mt-6 grid gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setComplianceType("send")
                  }
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#f0b90b] px-5 py-3 font-semibold text-black transition hover:bg-[#f8c62e]"
                >
                  <Send size={18} />
                  Send BTC
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setComplianceType("withdraw")
                  }
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#474d57] px-5 py-3 font-semibold transition hover:bg-[#2b3139]"
                >
                  <Download size={18} />
                  Withdraw BTC
                </button>

              </div>

            </div>

          </div>

          
          <div className="mt-5 rounded-xl border border-[#2b3139] bg-[#181a20] p-5">

            <div className="flex gap-3">

              <ShieldCheck
                size={21}
                className="mt-0.5 shrink-0 text-[#0ecb81]"
              />

              <div>

                <p className="font-medium">
                  Transfer security
                </p>

                <p className="mt-1 text-sm leading-6 text-[#848e9c]">
                  BTC transfers require additional verification to
                  ensure the security of your funds. This may
                  include email confirmation, 2FA, and KYC
                  verification.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      
      <section className="border-b border-[#2b3139] px-6 py-16 md:px-12 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-widest text-[#f0b90b]">
              Why use the platform
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Everything you need to manage crypto
            </h2>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-6">

              <ShieldCheck
                size={28}
                className="text-[#f0b90b]"
              />

              <h3 className="mt-5 text-lg font-semibold">
                Secure Platform
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#848e9c]">
                Keep your trading and wallet interface
                organized with security-focused workflows.
              </p>

            </div>

            <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-6">

              <Zap
                size={28}
                className="text-[#f0b90b]"
              />

              <h3 className="mt-5 text-lg font-semibold">
                Fast Trading
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#848e9c]">
                Move quickly between markets, trading pairs
                and portfolio information.
              </p>

            </div>

            <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-6">

              <BarChart3
                size={28}
                className="text-[#f0b90b]"
              />

              <h3 className="mt-5 text-lg font-semibold">
                Market Analytics
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#848e9c]">
                Monitor prices, volume and market movements
                from your trading dashboard.
              </p>

            </div>

          </div>

        </div>

      </section>

  
      <section className="px-6 py-20 md:px-12 lg:px-20">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#2b3139] bg-[#181a20] p-8 text-center md:p-12">

          <h2 className="text-3xl font-bold">
            Ready to explore the markets?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#848e9c]">
            Explore cryptocurrency markets and open a
            trading interface for your preferred asset.
          </p>

          <button
            type="button"
            onClick={() => navigate("/markets")}
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#f0b90b] px-6 py-3 font-semibold text-black transition hover:bg-[#f8c62e]"
          >
            Explore Markets
            <ArrowRight size={18} />
          </button>

        </div>

      </section>

    
      {complianceType && (
        <ComplianceModal
          type={complianceType}
          onClose={() => setComplianceType(null)}
        />
      )}

    </main>
  );
}

export default Home;