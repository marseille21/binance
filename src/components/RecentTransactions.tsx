
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ChevronRight,
} from "lucide-react";

import btcLogo from "../assets/OIP (46).jpg";
import ethLogo from "../assets/OIP (43).jpg";
import solLogo from "../assets/OIP (44).jpg";
import bnbLogo from "../assets/OIP (45).jpg";
import chaseLogo from "../assets/t_500x300.jpg";
import bankOfAmericaLogo from "../assets/t_500x300 (1).jpg";
import wellsFargoLogo from "../assets/t_500x300 (2).jpg";

type Transaction = {
  id: number;
  name: string;
  symbol: string;
  type: "Bank" | "Crypto";
  action: "Received" | "Sent";
  amount: string;
  currency: string;
  time: string;
  status: "Completed" | "Pending";
  logo: string;
};

const transactions: Transaction[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    type: "Crypto",
    action: "Received",
    amount: "0.01842",
    currency: "BTC",
    time: "Today, 09:42 AM",
    status: "Completed",
    logo: btcLogo,
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    type: "Crypto",
    action: "Received",
    amount: "0.7500",
    currency: "ETH",
    time: "Today, 08:31 AM",
    status: "Completed",
    logo: ethLogo,
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    type: "Crypto",
    action: "Received",
    amount: "12.50",
    currency: "SOL",
    time: "Yesterday, 06:20 PM",
    status: "Completed",
    logo: solLogo,
  },
  {
    id: 4,
    name: "BNB",
    symbol: "BNB",
    type: "Crypto",
    action: "Received",
    amount: "1.250",
    currency: "BNB",
    time: "Yesterday, 02:14 PM",
    status: "Completed",
    logo: bnbLogo,
  },
  {
    id: 5,
    name: "Chase Bank",
    symbol: "JPM",
    type: "Bank",
    action: "Received",
    amount: "$2,500.00",
    currency: "USD",
    time: "Sep 30, 2026",
    status: "Completed",
    logo: chaseLogo,
  },
  {
    id: 6,
    name: "Bank of America",
    symbol: "BAC",
    type: "Bank",
    action: "Received",
    amount: "$1,850.00",
    currency: "USD",
    time: "Sep 29, 2026",
    status: "Completed",
    logo: bankOfAmericaLogo,
  },
  {
    id: 7,
    name: "Wells Fargo",
    symbol: "WFC",
    type: "Bank",
    action: "Received",
    amount: "$950.00",
    currency: "USD",
    time: "Sep 28, 2026",
    status: "Pending",
    logo: wellsFargoLogo,
  },
];

function RecentTransactions() {
  return (
    <section className="w-full rounded-2xl border border-[#2b3139] bg-[#181a20] text-white">

      <div className="flex items-center justify-between border-b border-[#2b3139] px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Transactions
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Your latest wallet activity
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-sm font-medium text-[#f0b90b] transition hover:text-[#ffd84d]"
        >
          View all
          <ChevronRight size={16} />
        </button>
      </div>

    
      <div className="divide-y divide-[#2b3139]">
        {transactions.map((transaction) => {
          const isReceived = transaction.action === "Received";

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between px-5 py-4 transition hover:bg-[#20242b]"
            >
              
              <div className="flex min-w-0 items-center gap-3">
            
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#2b3139] bg-[#0b0e11]">
                  <img
                    src={transaction.logo}
                    alt={`${transaction.name} logo`}
                    className="h-7 w-7 object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>

          
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-medium">
                      {transaction.name}
                    </h3>

                    <span className="rounded bg-[#2b3139] px-1.5 py-0.5 text-[10px] text-gray-400">
                      {transaction.symbol}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                    {isReceived ? (
                      <ArrowDownLeft
                        size={13}
                        className="text-[#0ecb81]"
                      />
                    ) : (
                      <ArrowUpRight
                        size={13}
                        className="text-[#f6465d]"
                      />
                    )}

                    <span>
                      {transaction.action} {transaction.type}
                    </span>

                    <span>•</span>

                    <span>{transaction.time}</span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="ml-4 shrink-0 text-right">
                <p
                  className={`text-sm font-semibold ${
                    isReceived
                      ? "text-[#0ecb81]"
                      : "text-[#f6465d]"
                  }`}
                >
                  {isReceived ? "+" : "-"}
                  {transaction.amount} {transaction.currency}
                </p>

                <div className="mt-1 flex items-center justify-end gap-1.5">
                  {transaction.status === "Completed" ? (
                    <>
                      <CheckCircle2
                        size={12}
                        className="text-[#0ecb81]"
                      />

                      <span className="text-[11px] text-[#0ecb81]">
                        Completed
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock3
                        size={12}
                        className="text-[#f0b90b]"
                      />

                      <span className="text-[11px] text-[#f0b90b]">
                        Pending
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentTransactions;