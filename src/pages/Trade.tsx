 import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Star,
} from "lucide-react";

import PriceChart from "../components/PriceChart";
import TransactionHistory from "../components/RecentTransactions";

export type Transaction = {
  id: string | number;
  type: "Buy" | "Sell";
  coin: string;
  amount: string;
  price: string;
  total: string;
  date: string;
  status: "Completed" | "Pending" | "Cancelled";
  source?: string;
};

type OrderSide = "Buy" | "Sell";
type OrderType = "Limit" | "Market";

interface MarketInfo {
  base: string;
  quote: string;
  price: number;
  change: number;
  high: number;
  low: number;
  volume: string;
}

const MARKET_DATA: Record<string, MarketInfo> = {
  BTCUSDT: {
    base: "BTC",
    quote: "USDT",
    price: 109250.5,
    change: 2.45,
    high: 111200,
    low: 106800,
    volume: "2.84B",
  },

  ETHUSDT: {
    base: "ETH",
    quote: "USDT",
    price: 3925.75,
    change: 3.82,
    high: 4010,
    low: 3750,
    volume: "1.82B",
  },

  BNBUSDT: {
    base: "BNB",
    quote: "USDT",
    price: 875.4,
    change: 5.91,
    high: 895,
    low: 860,
    volume: "832.4M",
  },

  SOLUSDT: {
    base: "SOL",
    quote: "USDT",
    price: 215.68,
    change: 5.64,
    high: 220,
    low: 201,
    volume: "1.54B",
  },
};

const COIN_NAMES: Record<string, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  BNB: "BNB",
  SOL: "Solana",
};

function Trade() {
  const { symbol } = useParams();

  const pair = symbol?.toUpperCase() || "BTCUSDT";

  const market =
    MARKET_DATA[pair] ?? MARKET_DATA.BTCUSDT;

  const [side, setSide] =
    useState<OrderSide>("Buy");

  const [orderType, setOrderType] =
    useState<OrderType>("Limit");

  const [price, setPrice] = useState(
    market.price.toString()
  );

  const [amount, setAmount] =
    useState("");

  const [error, setError] =
    useState("");

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

 
  const availableUSDT = 90000;
  const availableCoin = 8.5;

 
  const orderTotal = useMemo(() => {
    const numericPrice =
      Number(price);

    const numericAmount =
      Number(amount);

    if (
      !Number.isFinite(numericPrice) ||
      !Number.isFinite(numericAmount)
    ) {
      return 0;
    }

    return (
      numericPrice *
      numericAmount
    );
  }, [price, amount]);
 
  const formattedTotal =
    orderTotal.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  
  const currentOrderPrice =
    orderType === "Market"
      ? market.price
      : Number(price);

   
  const handleOrder = () => {
    setError("");

    const numericAmount =
      Number(amount);

    const numericPrice =
      currentOrderPrice;
 
    if (
      !Number.isFinite(
        numericAmount
      ) ||
      numericAmount <= 0
    ) {
      setError(
        `Enter a valid ${market.base} amount.`
      );

      return;
    }
 
    if (
      !Number.isFinite(
        numericPrice
      ) ||
      numericPrice <= 0
    ) {
      setError(
        "Enter a valid price."
      );

      return;
    }

    const total =
      numericAmount *
      numericPrice;

    
    if (
      side === "Buy" &&
      total > availableUSDT
    ) {
      setError(
        "Insufficient USDT balance."
      );

      return;
    }

   
    if (
      side === "Sell" &&
      numericAmount >
        availableCoin
    ) {
      setError(
        `Insufficient ${market.base} balance.`
      );

      return;
    }

  
    const newTransaction: Transaction = {
      id: Date.now(),

      type: side,

      coin: market.base,

      amount: `${numericAmount.toFixed(
        8
      )} ${market.base}`,

      price: `${numericPrice.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )} ${market.quote}`,

      total: `${total.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )} ${market.quote}`,

      date: new Date().toLocaleString(),

      status: "Completed",

      source: "Spot Trading",
    };

   
    setTransactions(
      (previous) => [
        newTransaction,
        ...previous,
      ]
    );
 
    setAmount("");
  };

  return (
    <main className="min-h-screen bg-[#0b0e11] text-white">
 

      <section className="border-b border-[#2b3139] bg-[#0b0e11]">

        <div className="flex flex-wrap items-center gap-5 px-4 py-4 md:px-6">

      

          <div className="flex items-center gap-3">

            <button
              type="button"
              className="text-[#848e9c] transition hover:text-[#f0b90b]"
            >
              <Star size={18} />
            </button>

            <div>

              <div className="flex items-center gap-2">

                <h1 className="text-lg font-bold md:text-xl">
                  {market.base}/{market.quote}
                </h1>

                <ChevronDown
                  size={16}
                  className="text-[#848e9c]"
                />

              </div>

              <p className="text-xs text-[#848e9c]">
                Spot Trading
              </p>

            </div>

          </div>
 

          <div>

            <p className="text-lg font-semibold md:text-xl">

              {market.price.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}

            </p>

            <p className="text-xs text-[#848e9c]">
              ≈ $
              {market.price.toLocaleString()}
            </p>

          </div>

          

          <div>

            <p
              className={
                market.change >= 0
                  ? "text-sm text-[#0ecb81]"
                  : "text-sm text-[#f6465d]"
              }
            >
              {market.change >= 0
                ? "+"
                : ""}
              {market.change.toFixed(2)}%
            </p>

            <p className="text-xs text-[#848e9c]">
              24h Change
            </p>

          </div>

       

          <div className="hidden sm:block">

            <p className="text-sm font-medium">
              {market.high.toLocaleString()}
            </p>

            <p className="text-xs text-[#848e9c]">
              24h High
            </p>

          </div>

          {/* LOW */}

          <div className="hidden md:block">

            <p className="text-sm font-medium">
              {market.low.toLocaleString()}
            </p>

            <p className="text-xs text-[#848e9c]">
              24h Low
            </p>

          </div>

          {/* VOLUME */}

          <div className="hidden lg:block">

            <p className="text-sm font-medium">
              {market.volume}
            </p>

            <p className="text-xs text-[#848e9c]">
              24h Volume
            </p>

          </div>

        </div>

      </section>

 

      <section className="grid min-h-[650px] lg:grid-cols-[minmax(0,1fr)_340px]">
 

        <div className="min-w-0 border-r border-[#2b3139]">

        

          <div className="border-b border-[#2b3139] bg-[#181a20]">

       

            <div className="flex items-center gap-5 overflow-x-auto border-b border-[#2b3139] px-4 py-3 text-xs text-[#848e9c]">

              <button
                type="button"
                className="whitespace-nowrap text-white"
              >
                Chart
              </button>

              <button
                type="button"
                className="whitespace-nowrap hover:text-white"
              >
                Info
              </button>

              <span className="h-4 w-px shrink-0 bg-[#2b3139]" />

              <button
                type="button"
                className="whitespace-nowrap"
              >
                1m
              </button>

              <button
                type="button"
                className="whitespace-nowrap"
              >
                5m
              </button>

              <button
                type="button"
                className="whitespace-nowrap text-[#f0b90b]"
              >
                15m
              </button>

              <button
                type="button"
                className="whitespace-nowrap"
              >
                1H
              </button>

              <button
                type="button"
                className="whitespace-nowrap"
              >
                4H
              </button>

              <button
                type="button"
                className="whitespace-nowrap"
              >
                1D
              </button>

            </div>
 

            <div className="p-3">

              <PriceChart />

            </div>

          </div>
 
          <div className="bg-[#181a20]">

            

            <div className="flex border-b border-[#2b3139]">

              <button
                type="button"
                onClick={() => {
                  setSide("Buy");
                  setError("");
                }}
                className={`flex-1 border-b-2 px-4 py-4 text-sm font-semibold md:px-5 ${
                  side === "Buy"
                    ? "border-[#0ecb81] text-[#0ecb81]"
                    : "border-transparent text-[#848e9c]"
                }`}
              >
                Buy {market.base}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSide("Sell");
                  setError("");
                }}
                className={`flex-1 border-b-2 px-4 py-4 text-sm font-semibold md:px-5 ${
                  side === "Sell"
                    ? "border-[#f6465d] text-[#f6465d]"
                    : "border-transparent text-[#848e9c]"
                }`}
              >
                Sell {market.base}
              </button>

            </div>

            <div className="p-4 md:p-5">
 
              <div className="mb-5 flex items-center gap-6 text-sm">

                <button
                  type="button"
                  onClick={() =>
                    setOrderType(
                      "Limit"
                    )
                  }
                  className={
                    orderType === "Limit"
                      ? "font-semibold text-white"
                      : "text-[#848e9c]"
                  }
                >
                  Limit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setOrderType(
                      "Market"
                    )
                  }
                  className={
                    orderType === "Market"
                      ? "font-semibold text-white"
                      : "text-[#848e9c]"
                  }
                >
                  Market
                </button>

              </div>
 

              <div className="mb-4 flex items-center justify-between text-xs">

                <span className="text-[#848e9c]">
                  Available
                </span>

                <span>

                  {side === "Buy"
                    ? `${availableUSDT.toLocaleString()} USDT`
                    : `${availableCoin.toFixed(
                        8
                      )} ${market.base}`}

                </span>

              </div>

             

              {orderType === "Limit" && (
                <div className="mb-3">

                  <label className="mb-2 block text-xs text-[#848e9c]">
                    Price
                  </label>

                  <div className="flex rounded-lg border border-[#2b3139] bg-[#0f1115] focus-within:border-[#f0b90b]">

                    <input
                      type="number"
                      min="0"
                      value={price}
                      onChange={(e) =>
                        setPrice(
                          e.target.value
                        )
                      }
                      className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                    />

                    <span className="flex items-center px-3 text-xs text-[#848e9c]">
                      USDT
                    </span>

                  </div>

                </div>
              )}
 

              {orderType === "Market" && (
                <div className="mb-3">

                  <label className="mb-2 block text-xs text-[#848e9c]">
                    Market Price
                  </label>

                  <div className="rounded-lg border border-[#2b3139] bg-[#0f1115] px-3 py-3 text-sm">

                    {market.price.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}{" "}
                    USDT

                  </div>

                </div>
              )}

   

              <div className="mb-3">

                <label className="mb-2 block text-xs text-[#848e9c]">
                  Amount
                </label>

                <div className="flex rounded-lg border border-[#2b3139] bg-[#0f1115] focus-within:border-[#f0b90b]">

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={(e) => {
                      setAmount(
                        e.target.value
                      );
                      setError("");
                    }}
                    placeholder="0.00000000"
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                  />

                  <span className="flex items-center px-3 text-xs text-[#848e9c]">
                    {market.base}
                  </span>

                </div>

              </div>

              {/* TOTAL */}

              <div className="mb-4">

                <label className="mb-2 block text-xs text-[#848e9c]">
                  Total
                </label>

                <div className="flex rounded-lg border border-[#2b3139] bg-[#0f1115]">

                  <input
                    readOnly
                    value={formattedTotal}
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none"
                  />

                  <span className="flex items-center px-3 text-xs text-[#848e9c]">
                    USDT
                  </span>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <div className="mb-4 rounded-lg border border-[#f6465d]/30 bg-[#f6465d]/10 px-3 py-3 text-xs text-[#f6465d]">
                  {error}
                </div>
              )}
 

              <div className="mb-4 grid grid-cols-4 gap-2">

                {[25, 50, 75, 100].map(
                  (percentage) => (
                    <button
                      key={percentage}
                      type="button"
                      onClick={() => {
                        if (
                          side === "Buy"
                        ) {
                          const maxAmount =
                            availableUSDT /
                            currentOrderPrice;

                          setAmount(
                            (
                              (maxAmount *
                                percentage) /
                              100
                            ).toFixed(6)
                          );
                        } else {
                          setAmount(
                            (
                              (availableCoin *
                                percentage) /
                              100
                            ).toFixed(6)
                          );
                        }
                      }}
                      className="rounded border border-[#2b3139] py-1.5 text-xs text-[#848e9c] transition hover:border-[#f0b90b] hover:text-white"
                    >
                      {percentage}%
                    </button>
                  )
                )}

              </div>

              {/* SUBMIT */}

              <button
                type="button"
                onClick={handleOrder}
                disabled={!amount}
                className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  side === "Buy"
                    ? "bg-[#0ecb81] hover:bg-[#0bb875]"
                    : "bg-[#f6465d] hover:bg-[#df3e52]"
                }`}
              >
                {side === "Buy"
                  ? `Buy ${market.base}`
                  : `Sell ${market.base}`}
              </button>

            </div>

          </div>

        </div>
 

        <aside className="bg-[#181a20]">

          <div className="border-b border-[#2b3139] px-4 py-4">

            <h2 className="text-sm font-semibold">
              Order Book
            </h2>

            <div className="mt-4 grid grid-cols-3 text-right text-xs text-[#848e9c]">

              <span>Price</span>
              <span>Amount</span>
              <span>Total</span>

            </div>

          </div>

          <div className="p-4">

            {/* SELL ORDERS */}

            <div className="space-y-2">

              {[
                [
                  "109,300.50",
                  "0.842",
                  "92,030",
                ],
                [
                  "109,280.20",
                  "1.254",
                  "137,035",
                ],
                [
                  "109,270.10",
                  "0.653",
                  "71,364",
                ],
                [
                  "109,260.80",
                  "2.105",
                  "229,990",
                ],
                [
                  "109,255.30",
                  "0.421",
                  "45,996",
                ],
              ].map(
                ([
                  priceValue,
                  amountValue,
                  totalValue,
                ]) => (
                  <div
                    key={priceValue}
                    className="grid grid-cols-3 text-right text-xs"
                  >
                    <span className="text-[#f6465d]">
                      {priceValue}
                    </span>

                    <span className="text-[#b7bdc6]">
                      {amountValue}
                    </span>

                    <span className="text-[#848e9c]">
                      {totalValue}
                    </span>
                  </div>
                )
              )}

            </div>

      

            <div className="my-5 border-y border-[#2b3139] py-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-lg font-semibold text-[#0ecb81]">
                    {market.price.toLocaleString()}
                  </p>

                  <p className="text-xs text-[#848e9c]">
                    Last Price
                  </p>

                </div>

                <ArrowDown
                  size={20}
                  className="text-[#0ecb81]"
                />

              </div>

            </div>
 

            <div className="space-y-2">

              {[
                [
                  "109,245.10",
                  "1.024",
                  "111,868",
                ],
                [
                  "109,230.60",
                  "2.314",
                  "252,569",
                ],
                [
                  "109,215.20",
                  "0.875",
                  "95,563",
                ],
                [
                  "109,200.40",
                  "1.632",
                  "178,015",
                ],
                [
                  "109,185.90",
                  "0.542",
                  "59,178",
                ],
              ].map(
                ([
                  priceValue,
                  amountValue,
                  totalValue,
                ]) => (
                  <div
                    key={priceValue}
                    className="grid grid-cols-3 text-right text-xs"
                  >
                    <span className="text-[#0ecb81]">
                      {priceValue}
                    </span>

                    <span className="text-[#b7bdc6]">
                      {amountValue}
                    </span>

                    <span className="text-[#848e9c]">
                      {totalValue}
                    </span>
                  </div>
                )
              )}

            </div>

        

            <div className="mt-6 rounded-lg border border-[#2b3139] bg-[#0f1115] p-4">

              <div className="flex items-center gap-2">

                <ArrowUp
                  size={16}
                  className="text-[#0ecb81]"
                />

                <span className="text-xs text-[#848e9c]">
                  Market activity
                </span>

              </div>

              <p className="mt-2 text-sm font-semibold">
                Strong buying interest
              </p>

              <p className="mt-1 text-xs leading-5 text-[#848e9c]">
                Order-book figures shown here
                are simulated frontend data.
              </p>

            </div>

          </div>

        </aside>

      </section>

    

      <TransactionHistory
        transactions={transactions}
      />

    </main>
  );
}

export default Trade;