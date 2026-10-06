  import { useMemo, useState } from "react";
import {
  ArrowDown,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";

import {
  useWallet,
  type Coin,
} from "../context/WalletContext";

interface CoinInfo {
  name: string;
  symbol: Coin;
  price: number;
}

const COINS: CoinInfo[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 109250.5,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3925.75,
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: 875.4,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 215.68,
  },
];

const FEE_RATE = 0.001;

function Buy() {
  const {
    balances,
    buyCrypto,
  } = useWallet();

  const [crypto, setCrypto] =
    useState<Coin>("BTC");

  const [amount, setAmount] =
    useState("");

  const [showReview, setShowReview] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  const selectedCoin =
    COINS.find(
      (coin) => coin.symbol === crypto
    ) ?? COINS[0];

  const usdAmount = Number(amount) || 0;

  const fee = usdAmount * FEE_RATE;

  const total = usdAmount + fee;

  const cryptoAmount =
    usdAmount > 0
      ? usdAmount / selectedCoin.price
      : 0;

  const usdtBalance =
    balances.USDT;

  const insufficientBalance =
    total > usdtBalance;

  const formatMoney = (
    value: number
  ) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatCrypto = (
    value: number
  ) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8,
    });

  const estimatedValue = useMemo(() => {
    if (!usdAmount) return "$0.00";

    return `$${formatMoney(usdAmount)}`;
  }, [usdAmount]);

  const handleReview = () => {
    setError("");
    setSuccess(false);

    if (!usdAmount || usdAmount <= 0) {
      setError(
        "Enter an amount to continue."
      );
      return;
    }

    if (insufficientBalance) {
      setError(
        "Insufficient USDT balance."
      );
      return;
    }

    setShowReview(true);
  };

  const handleConfirm = () => {
    setError("");

    const successful = buyCrypto(
      crypto,
      usdAmount
    );

    if (!successful) {
      setError(
        "Purchase could not be completed."
      );
      return;
    }

    setShowReview(false);
    setSuccess(true);
    setAmount("");
  };

  const quickAmounts = [
    50,
    100,
    500,
    1000,
  ];

  return (
    <main className="min-h-screen bg-[#0b0e11] px-4 py-8 text-white lg:px-10">

      <div className="mx-auto max-w-7xl">

      

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <div className="mb-3 flex items-center gap-2">

             

              <span className="text-xs text-[#848e9c]">
                Buy Crypto
              </span>

            </div>

            <h1 className="text-3xl font-bold lg:text-4xl">
              Buy Crypto
            </h1>

            <p className="mt-2 text-[#848e9c]">
              Purchase crypto using your
              available USDT balance.
            </p>

          </div>

      

          <div className="rounded-xl border border-[#2b3139] bg-[#181a20] px-5 py-4">

            <div className="flex items-center gap-2">

              <Wallet
                size={17}
                className="text-[#f0b90b]"
              />

              <span className="text-xs text-[#848e9c]">
                Available balance
              </span>

            </div>

            <p className="mt-1 text-xl font-semibold">
              $
              {formatMoney(usdtBalance)}
              <span className="ml-1 text-sm text-[#848e9c]">
                USDT
              </span>
            </p>

          </div>

        </div>

  

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#0ecb81]/30 bg-[#0ecb81]/10 p-4">

            <CheckCircle2
              size={22}
              className="text-[#0ecb81]"
            />

            <div>

              <p className="font-semibold text-[#0ecb81]">
                Purchase completed
              </p>

              <p className="text-sm text-[#848e9c]">
                Your wallet has been
                updated successfully.
              </p>

            </div>

          </div>
        )}
 

        {error && (
          <div className="mb-6 rounded-xl border border-[#f6465d]/30 bg-[#f6465d]/10 p-4 text-sm text-[#f6465d]">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_480px]">

         

          <section>

            <div className="mb-6">

              <h2 className="text-2xl font-bold">
                Buy crypto instantly
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#848e9c]">
                Choose an asset, enter the
                amount you want to spend,
                review the estimated crypto
                amount, and confirm your
                purchase.
              </p>

            </div>

            
            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5">

                <Zap
                  size={22}
                  className="text-[#f0b90b]"
                />

                <h3 className="mt-4 font-semibold">
                  Fast execution
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#848e9c]">
                  Review and execute your
                 order quickly.
                </p>

              </div>

              <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5">

                <ShieldCheck
                  size={22}
                  className="text-[#0ecb81]"
                />

                <h3 className="mt-4 font-semibold">
                  Secure flow
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#848e9c]">
                  Every order is reviewed
                  before confirmation.
                </p>

              </div>

              <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5">

                <Wallet
                  size={22}
                  className="text-[#848e9c]"
                />

                <h3 className="mt-4 font-semibold">
                  Wallet connected
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#848e9c]">
                  Purchases update your
                   wallet balance.
                </p>

              </div>

            </div>

          

            <div className="mt-8 rounded-xl border border-[#2b3139] bg-[#181a20]">

              <div className="border-b border-[#2b3139] px-5 py-4">

                <h3 className="font-semibold">
                  Current prices
                </h3>

              </div>

              <div>

                {COINS.map((coin) => (

                  <button
                    key={coin.symbol}
                    onClick={() =>
                      setCrypto(
                        coin.symbol
                      )
                    }
                    className={`flex w-full items-center justify-between border-b border-[#2b3139] px-5 py-4 text-left transition last:border-0 hover:bg-[#202329] ${
                      crypto === coin.symbol
                        ? "bg-[#202329]"
                        : ""
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b0e11] text-xs font-bold">
                        {coin.symbol.slice(
                          0,
                          1
                        )}
                      </div>

                      <div>

                        <p className="font-semibold">
                          {coin.name}
                        </p>

                        <p className="text-xs text-[#848e9c]">
                          {coin.symbol}
                        </p>

                      </div>

                    </div>

                    <p className="font-medium">
                      $
                      {formatMoney(
                        coin.price
                      )}
                    </p>

                  </button>

                ))}

              </div>

            </div>

          </section>

        

          <section>

            <div className="rounded-2xl border border-[#2b3139] bg-[#181a20] p-6">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-semibold">
                    Buy crypto
                  </h2>

                  <p className="mt-1 text-xs text-[#848e9c]">
                    Market purchase
                  </p>

                </div>

                <span className="rounded-lg bg-[#0b0e11] px-3 py-2 text-xs text-[#848e9c]">
                  USD
                </span>

              </div>

            

              <div className="mb-5">

                <div className="mb-2 flex justify-between">

                  <span className="text-sm text-[#848e9c]">
                    You pay
                  </span>

                  <span className="text-xs text-[#848e9c]">
                    Balance: $
                    {formatMoney(
                      usdtBalance
                    )}
                  </span>

                </div>

                <div className="flex items-center rounded-xl border border-[#2b3139] bg-[#0b0e11] p-4 focus-within:border-[#f0b90b]">

                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => {
                      setAmount(
                        e.target.value
                      );
                      setError("");
                      setSuccess(false);
                    }}
                    placeholder="0.00"
                    className="w-full bg-transparent text-3xl font-semibold outline-none placeholder:text-[#474d57]"
                  />

                  <span className="ml-3 font-semibold">
                    USDT
                  </span>

                </div>

              </div>

            

              <div className="mb-6 grid grid-cols-4 gap-2">

                {quickAmounts.map(
                  (value) => (

                    <button
                      key={value}
                      onClick={() =>
                        setAmount(
                          String(value)
                        )
                      }
                      className="rounded-lg border border-[#2b3139] py-2 text-xs text-[#848e9c] transition hover:border-[#f0b90b] hover:text-white"
                    >
                      ${value}
                    </button>

                  )
                )}

              </div>

      

              <div className="relative mb-5">

                <div className="absolute left-0 right-0 top-1/2 h-px bg-[#2b3139]" />

                <div className="relative mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#2b3139] bg-[#181a20]">

                  <ArrowDown
                    size={16}
                    className="text-[#848e9c]"
                  />

                </div>

              </div>

            

              <div className="mb-6">

                <div className="mb-2 flex justify-between">

                  <span className="text-sm text-[#848e9c]">
                    You receive
                  </span>

                  <span className="text-xs text-[#848e9c]">
                    Estimated
                  </span>

                </div>

                <div className="flex items-center rounded-xl border border-[#2b3139] bg-[#0b0e11] p-4">

                  <div className="flex-1">

                    <p className="text-2xl font-semibold">
                      {formatCrypto(
                        cryptoAmount
                      )}
                    </p>

                  </div>

                  <div className="relative">

                    <select
                      value={crypto}
                      onChange={(e) =>
                        setCrypto(
                          e.target.value as Coin
                        )
                      }
                      className="appearance-none rounded-lg bg-[#181a20] py-2 pl-3 pr-8 font-semibold outline-none"
                    >
                      {COINS.map(
                        (coin) => (
                          <option
                            key={
                              coin.symbol
                            }
                            value={
                              coin.symbol
                            }
                            className="bg-[#181a20]"
                          >
                            {
                              coin.symbol
                            }
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#848e9c]"
                    />

                  </div>

                </div>

              </div>

            

              <div className="mb-6 space-y-4 border-t border-[#2b3139] pt-5 text-sm">

                <div className="flex justify-between">

                  <span className="text-[#848e9c]">
                    Price
                  </span>

                  <span>
                    1 {crypto} = $
                    {formatMoney(
                      selectedCoin.price
                    )}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-[#848e9c]">
                    Purchase amount
                  </span>

                  <span>
                    {estimatedValue}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-[#848e9c]">
                    Trading fee
                  </span>

                  <span>
                    $
                    {formatMoney(fee)}
                  </span>

                </div>

                <div className="flex justify-between border-t border-[#2b3139] pt-4 font-semibold">

                  <span>
                    Total
                  </span>

                  <span>
                    $
                    {formatMoney(total)}
                    {" "}
                    USDT
                  </span>

                </div>

              </div>

             

              {insufficientBalance &&
                usdAmount > 0 && (

                  <div className="mb-4 rounded-lg border border-[#f6465d]/30 bg-[#f6465d]/10 p-3 text-xs text-[#f6465d]">
                    Your available balance is
                    not enough for this
                    purchase.
                  </div>

                )}

             

              <button
                onClick={handleReview}
                disabled={
                  !amount ||
                  usdAmount <= 0 ||
                  insufficientBalance
                }
                className="w-full rounded-xl bg-[#f0b90b] py-4 font-semibold text-black transition hover:bg-[#f8d12f] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Review Buy Order
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-[#848e9c]">
              
                 Real cryptocurrency is
                purchased or transferred.
              </p>

            </div>

          </section>

        </div>

      </div>

    

      {showReview && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-[#2b3139] bg-[#181a20] p-6 shadow-2xl">

            <div className="mb-6">

              <p className="text-xs text-[#f0b90b]">
                REVIEW ORDER
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Confirm purchase
              </h2>

              <p className="mt-2 text-sm text-[#848e9c]">
                Review the details before
                confirming.
              </p>

            </div>

            <div className="space-y-4 rounded-xl bg-[#0b0e11] p-5">

              <div className="flex justify-between">

                <span className="text-[#848e9c]">
                  Asset
                </span>

                <span className="font-semibold">
                  {selectedCoin.name}
                  {" "}
                  ({crypto})
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-[#848e9c]">
                  You pay
                </span>

                <span>
                  $
                  {formatMoney(usdAmount)}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-[#848e9c]">
                  Estimated receive
                </span>

                <span className="font-semibold">
                  {formatCrypto(
                    cryptoAmount
                  )}{" "}
                  {crypto}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-[#848e9c]">
                  Fee
                </span>

                <span>
                  $
                  {formatMoney(fee)}
                </span>

              </div>

              <div className="border-t border-[#2b3139] pt-4">

                <div className="flex justify-between font-semibold">

                  <span>
                    Total
                  </span>

                  <span>
                    $
                    {formatMoney(total)}
                    {" "}
                    USDT
                  </span>

                </div>

              </div>

            </div>

            <div className="mt-5 rounded-lg border border-[#f0b90b]/20 bg-[#f0b90b]/5 p-3 text-xs leading-5 text-[#848e9c]">
             Transaction only. No
              blockchain transaction will be
              created.
            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={() =>
                  setShowReview(false)
                }
                className="flex-1 rounded-xl border border-[#2b3139] py-3 font-semibold transition hover:bg-[#202329]"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="flex-1 rounded-xl bg-[#f0b90b] py-3 font-semibold text-black transition hover:bg-[#f8d12f]"
              >
                Confirm Buy
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Buy;