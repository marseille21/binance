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
import chaseLogo from "../assets/t_500x300 (3).jpg";
import AmericaLogo from "../assets/t_500x300 (4).jpg";

import type { Transaction } from "../pages/Trade";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  const demoTransactions: Transaction[] = [
    
    
    {
      id: "sol-1",
      type: "Buy",
      coin: "SOL",
      amount: "420.00 SOL",
      price: "$215.68",
      total: "$140,585.60",
      date: "oct 6, 2026 •  1:36 AM",
      status: "Completed",
      source: "Binance Spot",
    },
      {
     
      id: "bank-1",
      type: "Buy",
      coin: "USD",
      amount: "$458,000.00",
      price: "$1.00",
      total: "$458,000.00",
      date: "October 5, 2026 • 10:47 PM",
      status: "Completed",
      source: "Bank of America",
    },

     {
      id: "sol-1",
      type: "Buy",
      coin: "SOL",
      amount: "420.00 SOL",
      price: "$215.68",
      total: "$90,585.60",
      date: "Oct 5, 2026 • 2:36 PM",
      status: "Completed",
      source: "Binance Spot",
    },

    {
      id: "btc-1",
      type: "Buy",
      coin: "BTC",
      amount: "2.4500 BTC",
      price: "$109,250.50",
      total: "$267,663.73",
      date: "Oct 3, 2026 • 10:42 AM",
      status: "Completed",
      source: "Binance Spot",
    },

    {
      id: "bnb-1",
      type: "Sell",
      coin: "BNB",
      amount: "185.00 BNB",
      price: "$875.40",
      total: "$161,949.00",
      date: "Oct 3, 2026 • 9:18 AM",
      status: "Completed",
      source: "Binance Spot",
    },

    {
      id: "sol-1",
      type: "Buy",
      coin: "SOL",
      amount: "420.00 SOL",
      price: "$215.68",
      total: "$90,585.60",
      date: "September 30, 2026 • 4:36 PM",
      status: "Completed",
      source: "Binance Spot",
    },

    {
      id: "btc-2",
      type: "Sell",
      coin: "BTC",
      amount: "1.7500 BTC",
      price: "$109,250.50",
      total: "$191,188.38",
      date: "September 30, 2026 • 4:14 PM",
      status: "Completed",
      source: "Binance Spot",
    },
    {
      id: "bank-2",
      type: "Buy",
      coin: "USD",
      amount: "$300,000.00",
      price: "$1.00",
      total: "$300,000.00",
      date: "September 25, 2026 • 11:05 AM",
      status: "Completed",
      source: "Chase Bank",
    },

    {
      id: "bnb-2",
      type: "Buy",
      coin: "BNB",
      amount: "96.00 BNB",
      price: "$875.40",
      total: "$84,038.40",
      date: "September 25, 2026 • 3:21 PM",
      status: "Completed",
      source: "Binance Spot",
    },

    {
      id: "bank-2",
      type: "Buy",
      coin: "USD",
      amount: "$125,000.00",
      price: "$1.00",
      total: "$125,000.00",
      date: "September 25, 2026 • 11:05 AM",
      status: "Completed",
      source: "Chase Bank",
    },

    {
      id: "bank-3",
      type: "Buy",
      coin: "USD",
      amount: "$75,000.00",
      price: "$1.00",
      total: "$75,000.00",
      date: "September 23, 2026 • 2:47 PM",
      status: "Completed",
      source: "Bank of America",
    },

    {
      id: "sol-2",
      type: "Sell",
      coin: "SOL",
      amount: "310.00 SOL",
      price: "$215.68",
      total: "$66,860.80",
      date: "September 15, 2026 • 9:32 AM",
      status: "Pending",
      source: "Binance Spot",
    },
  ];

  const allTransactions = [
    ...transactions,
    ...demoTransactions,
  ];

  const cryptoLogoMap: Record<string, string> = {
    BTC: btcLogo,
    ETH: ethLogo,
    SOL: solLogo,
    BNB: bnbLogo,
  };

  const bankLogoMap: Record<string, string> = {
    "Chase Bank": chaseLogo,
    "Bank of America": AmericaLogo,
  };

  return (
    <section className="w-full border-t border-[#2b3139] bg-[#0b0e11] text-white">
      
      <div className="flex items-center justify-between border-b border-[#2b3139] px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Transactions
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Your latest trading and wallet activity
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
        {allTransactions.map((transaction) => {
          const isBuy = transaction.type === "Buy";

          const isBank =
            transaction.source === "Chase Bank" ||
            transaction.source === "Bank of America";
 
          const logo = isBank
            ? bankLogoMap[transaction.source ?? ""]
            : cryptoLogoMap[transaction.coin];

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-3 px-4 py-4 transition hover:bg-[#181a20] sm:px-5"
            >
              
              <div className="flex min-w-0 items-center gap-3">
          
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#2b3139] bg-[#181a20] sm:h-11 sm:w-11">
                  {logo ? (
                    <img
                      src={logo}
                      alt={
                        isBank
                          ? `${transaction.source} logo`
                          : `${transaction.coin} logo`
                      }
                      className="h-7 w-7 object-contain"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-[#f0b90b]">
                      {isBank
                        ? transaction.source
                            ?.split(" ")
                            .map((word) => word[0])
                            .join("")
                        : transaction.coin.slice(0, 3)}
                    </span>
                  )}
                </div>

                
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-medium">
                      {isBank
                        ? transaction.source
                        : transaction.coin}
                    </h3>

                    <span className="hidden rounded bg-[#2b3139] px-1.5 py-0.5 text-[10px] text-gray-400 sm:inline">
                      {isBank ? "BANK" : transaction.type}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                    {isBuy ? (
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

                    <span>{transaction.type}</span>

                    <span>•</span>

                    <span className="truncate">
                      {transaction.date}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-[11px] text-[#5e6673]">
                    {transaction.source}
                  </p>
                </div>
              </div>

            
              <div className="shrink-0 text-right">
                <p
                  className={`text-sm font-semibold ${
                    isBuy
                      ? "text-[#0ecb81]"
                      : "text-[#f6465d]"
                  }`}
                >
                  {isBuy ? "+" : "-"}
                  {transaction.amount}
                </p>

                <p className="mt-1 text-xs text-[#848e9c]">
                  {transaction.total}
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
                  ) : transaction.status === "Pending" ? (
                    <>
                      <Clock3
                        size={12}
                        className="text-[#f0b90b]"
                      />

                      <span className="text-[11px] text-[#f0b90b]">
                        Pending
                      </span>
                    </>
                  ) : (
                    <span className="text-[11px] text-[#f6465d]">
                      Cancelled
                    </span>
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