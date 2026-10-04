   import { useMemo, useState } from "react";

import { useWallet, type Coin } from "../context/WalletContext";

interface Product {
  name: string;
  description: string;
  apy: number;
  duration: string;
  coin: Coin;
}

const PRODUCTS: Product[] = [
  {
    name: "Simple Earn",
    description:
      "Earn rewards on your crypto with flexible and locked products.",
    apy: 8.2,
    duration: "Flexible",
    coin: "USDT",
  },
  {
    name: "ETH Staking",
    description:
      "Stake ETH and earn staking rewards over time.",
    apy: 4.5,
    duration: "Flexible",
    coin: "ETH",
  },
  {
    name: "BNB Vault",
    description:
      "Put your BNB to work and earn additional rewards.",
    apy: 6.8,
    duration: "30 Days",
    coin: "BNB",
  },
  {
    name: "SOL Staking",
    description:
      "Earn rewards by participating in Solana staking.",
    apy: 7.1,
    duration: "Flexible",
    coin: "SOL",
  },
];

const COIN_PRICES: Record<Coin, number> = {
  BTC: 109250.5,
  ETH: 3925.75,
  BNB: 875.4,
  SOL: 215.68,
  USDT: 1,
};

function Earn() {
  const {
    balances,
    earnPositions,
    totalEarned,
    subscribeToEarn,
  } = useWallet();

  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [amount, setAmount] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const filteredProducts = PRODUCTS.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.coin
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const numericAmount = Number(amount);

  const estimatedReward = useMemo(() => {
    if (!selectedProduct || numericAmount <= 0) {
      return 0;
    }

    return (
      numericAmount *
      (selectedProduct.apy / 100)
    );
  }, [amount, selectedProduct, numericAmount]);

  const availableAmount = selectedProduct
    ? balances[selectedProduct.coin]
    : 0;

  const handleEarn = () => {
    if (!selectedProduct) {
      return;
    }

    setError("");
    setMessage("");

    if (!amount || numericAmount <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    if (numericAmount > availableAmount) {
      setError(
        `Insufficient ${selectedProduct.coin} balance.`
      );
      return;
    }

    const success = subscribeToEarn(
      selectedProduct.coin,
      selectedProduct.name,
      numericAmount,
      selectedProduct.apy
    );

    if (!success) {
      setError(
        `Unable to subscribe. Check your ${selectedProduct.coin} balance.`
      );
      return;
    }

    setMessage(
      `${selectedProduct.coin} successfully subscribed to ${selectedProduct.name}.`
    );

    setSelectedProduct(null);
    setAmount("");
  };

  const formatMoney = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <main className="min-h-screen bg-[#0b0e11] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Earn
          </h1>

          <p className="mt-2 text-[#848e9c]">
            Put your crypto to work with flexible and
            fixed-term earning products.
          </p>
        </div>
 
 
        <section className="mb-10 overflow-hidden rounded-2xl border border-[#2b3139] bg-[#181a20] p-8">
          <div className="max-w-2xl">

            <p className="mb-3 text-sm font-semibold text-[#f0b90b]">
              CRYPTO EARN
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Make your crypto work for you
            </h2>

            <p className="mt-4 text-[#848e9c]">
              Explore flexible and fixed-term earning
              products and choose how you want to put
              your crypto to work.
            </p>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("earn-products")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className="mt-6 rounded-lg bg-[#f0b90b] px-6 py-3 font-semibold text-black transition hover:bg-[#f8d12f]"
            >
              Start Earning
            </button>

          </div>
        </section>

      
        <div className="mb-10 grid gap-4 sm:grid-cols-3">

       
          <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5">

            <p className="text-sm text-[#848e9c]">
              Total Earned
            </p>

            <p className="mt-2 text-2xl font-bold">
              ${formatMoney(totalEarned)}
            </p>

            <p className="mt-1 text-xs text-[#848e9c]">
              Demo rewards
            </p>

          </div>

          
          <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5">

            <p className="text-sm text-[#848e9c]">
              Active Products
            </p>

            <p className="mt-2 text-2xl font-bold">
              {earnPositions.length}
            </p>

            <p className="mt-1 text-xs text-[#848e9c]">
              Currently subscribed
            </p>

          </div>

       
          <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5">

            <p className="text-sm text-[#848e9c]">
              Available Products
            </p>

            <p className="mt-2 text-2xl font-bold">
              {PRODUCTS.length}
            </p>

            <p className="mt-1 text-xs text-[#848e9c]">
              Demo products
            </p>

          </div>

        </div>
 
        {earnPositions.length > 0 && (
          <section className="mb-10">

            <div className="mb-5">
              <h2 className="text-2xl font-bold">
                My Earn Products
              </h2>

              <p className="mt-1 text-sm text-[#848e9c]">
                Your currently subscribed demo products.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#2b3139] bg-[#181a20]">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px] text-left text-sm">

                  <thead>
                    <tr className="border-b border-[#2b3139] text-[#848e9c]">

                      <th className="px-5 py-4">
                        Product
                      </th>

                      <th className="px-5 py-4">
                        Asset
                      </th>

                      <th className="px-5 py-4">
                        Amount
                      </th>

                      <th className="px-5 py-4">
                        APY
                      </th>

                      <th className="px-5 py-4">
                        Duration
                      </th>

                      <th className="px-5 py-4">
                        Started
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {earnPositions.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-[#2b3139] last:border-0 hover:bg-[#1f2329]"
                      >

                        <td className="px-5 py-4 font-medium text-white">
                          {item.product}
                        </td>

                        <td className="px-5 py-4 font-semibold text-[#f0b90b]">
                          {item.coin}
                        </td>

                        <td className="px-5 py-4 text-white">
                          {item.amount.toLocaleString(
                            "en-US",
                            {
                              maximumFractionDigits: 8,
                            }
                          )}{" "}
                          {item.coin}
                        </td>

                        <td className="px-5 py-4 text-[#0ecb81]">
                          {item.apy.toFixed(2)}%
                        </td>

                        <td className="px-5 py-4 text-[#b7bdc6]">
                          {PRODUCTS.find(
                            (product) =>
                              product.name === item.product
                          )?.duration ?? "Flexible"}
                        </td>

                        <td className="px-5 py-4 text-[#848e9c]">
                          {item.startedAt}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </section>
        )}
 
        <section id="earn-products">

          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <h2 className="text-2xl font-bold">
                Earn Products
              </h2>

              <p className="mt-1 text-sm text-[#848e9c]">
                Explore available earning products.
              </p>

            </div>

            <input
              type="text"
              placeholder="Search coins..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-lg border border-[#2b3139] bg-[#181a20] px-4 py-3 text-sm outline-none placeholder:text-[#848e9c] focus:border-[#f0b90b] md:w-64"
            />

          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {filteredProducts.map((product) => (
              <div
                key={product.name}
                className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5 transition hover:-translate-y-1 hover:border-[#f0b90b]"
              >

                <div className="mb-6 flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0b90b] font-bold text-black">
                    {product.coin.charAt(0)}
                  </div>

                  <span className="rounded-full bg-[#0b0e11] px-3 py-1 text-xs text-[#848e9c]">
                    {product.duration}
                  </span>

                </div>

                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#848e9c]">
                  {product.description}
                </p>

                <div className="mt-6">

                  <p className="text-xs text-[#848e9c]">
                    Est. APY
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#0ecb81]">
                    {product.apy.toFixed(2)}%
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(product);
                    setAmount("");
                    setError("");
                  }}
                  className="mt-6 w-full rounded-lg bg-[#f0b90b] py-3 font-semibold text-black transition hover:bg-[#f8d12f]"
                >
                  Earn {product.coin}
                </button>

              </div>
            ))}

          </div>

          {filteredProducts.length === 0 && (
            <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-10 text-center">
              <p className="text-[#848e9c]">
                No earning products found.
              </p>
            </div>
          )}

        </section>

     
        {message && (
          <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#0ecb81]/30 bg-[#181a20] px-5 py-4 shadow-2xl">

            <p className="text-sm text-[#0ecb81]">
              {message}
            </p>

            <button
              type="button"
              onClick={() => setMessage("")}
              className="mt-2 text-xs text-[#848e9c] hover:text-white"
            >
              Close
            </button>

          </div>
        )}

      </div>
 
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-[#2b3139] bg-[#181a20] p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <p className="text-xs text-[#848e9c]">
                  SUBSCRIBE
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {selectedProduct.name}
                </h2>

              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setAmount("");
                  setError("");
                }}
                className="text-2xl text-[#848e9c] hover:text-white"
              >
                ×
              </button>

            </div>

            
            <div className="mb-5 rounded-xl bg-[#0b0e11] p-4">

              <div className="flex items-center justify-between">

                <span className="text-sm text-[#848e9c]">
                  Asset
                </span>

                <span className="font-semibold text-white">
                  {selectedProduct.coin}
                </span>

              </div>

              <div className="mt-3 flex items-center justify-between">

                <span className="text-sm text-[#848e9c]">
                  Available
                </span>

                <span className="font-semibold text-white">
                  {availableAmount.toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 8,
                    }
                  )}{" "}
                  {selectedProduct.coin}
                </span>

              </div>

              <div className="mt-3 flex items-center justify-between">

                <span className="text-sm text-[#848e9c]">
                  Est. APY
                </span>

                <span className="font-semibold text-[#0ecb81]">
                  {selectedProduct.apy.toFixed(2)}%
                </span>

              </div>

              <div className="mt-3 flex items-center justify-between">

                <span className="text-sm text-[#848e9c]">
                  Duration
                </span>

                <span className="text-white">
                  {selectedProduct.duration}
                </span>

              </div>

            </div>
 
            <label className="mb-2 block text-sm text-[#b7bdc6]">
              Amount
            </label>

            <div className="flex rounded-lg border border-[#2b3139] bg-[#0b0e11] focus-within:border-[#f0b90b]">

              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="0.00"
                className="w-full bg-transparent px-4 py-3 text-white outline-none"
              />

              <span className="flex items-center px-4 text-sm font-semibold text-[#f0b90b]">
                {selectedProduct.coin}
              </span>

            </div>
 
            <button
              type="button"
              onClick={() =>
                setAmount(
                  availableAmount.toString()
                )
              }
              className="mt-2 text-xs text-[#f0b90b] hover:underline"
            >
              Use Max
            </button>

            {/* ERROR */}
            {error && (
              <p className="mt-3 rounded-lg border border-[#f6465d]/30 bg-[#f6465d]/10 p-3 text-sm text-[#f6465d]">
                {error}
              </p>
            )}
 
            <div className="mt-5 rounded-xl border border-[#2b3139] bg-[#0b0e11] p-4">

              <div className="flex justify-between">

                <span className="text-sm text-[#848e9c]">
                  Estimated annual reward
                </span>

                <span className="font-semibold text-[#0ecb81]">
                  {estimatedReward.toFixed(8)}{" "}
                  {selectedProduct.coin}
                </span>

              </div>

            </div>

         
            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setAmount("");
                  setError("");
                }}
                className="flex-1 rounded-lg border border-[#2b3139] py-3 font-semibold text-white hover:bg-[#2b3139]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleEarn}
                disabled={
                  !amount ||
                  numericAmount <= 0 ||
                  numericAmount > availableAmount
                }
                className="flex-1 rounded-lg bg-[#f0b90b] py-3 font-semibold text-black transition hover:bg-[#f8d12f] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default Earn;