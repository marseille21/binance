 import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { MARKET_PAIRS } from "../data/Markets";
import { useWallet } from "../context/WalletContext";

const SECTIONS = [
  "Favorites",
  "Hot Coins",
  "New Listings",
  "Top Gainers",
  "Top Losers",
] as const;

type Section = (typeof SECTIONS)[number];

interface Market {
  symbol: string;
  base: string;
  quote: string;
  name: string;
  price: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap?: number;
}

function Markets() {
  const navigate = useNavigate();
  const { portfolioValue } = useWallet();

  const [section, setSection] =
    useState<Section>("Hot Coins");

  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState<string[]>([
    "BTCUSDT",
    "ETHUSDT",
  ]);

  const [markets, setMarkets] = useState<Market[]>(
    MARKET_PAIRS.map((market) => ({
      ...market,
      marketCap: market.price * market.volume24h,
    }))
  );

  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 700);

    const interval = setInterval(() => {
      setMarkets((currentMarkets) =>
        currentMarkets.map((market) => {
          const movement =
            (Math.random() - 0.5) * 0.002;

          const newPrice =
            market.price * (1 + movement);

          const newChange =
            market.changePercent24h +
            (Math.random() - 0.5) * 0.15;

          return {
            ...market,
            price: newPrice,
            changePercent24h: newChange,
            marketCap:
              newPrice * market.volume24h,
          };
        })
      );
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, []);
 

  const toggleFavorite = (symbol: string) => {
    setFavorites((current) =>
      current.includes(symbol)
        ? current.filter(
            (item) => item !== symbol
          )
        : [...current, symbol]
    );
  };

  

  const filteredMarkets = useMemo(() => {
    let result = [...markets];

    if (section === "Favorites") {
      result = result.filter((market) =>
        favorites.includes(market.symbol)
      );
    }

    if (section === "Top Gainers") {
      result.sort(
        (a, b) =>
          b.changePercent24h -
          a.changePercent24h
      );
    }

    if (section === "Top Losers") {
      result.sort(
        (a, b) =>
          a.changePercent24h -
          b.changePercent24h
      );
    }

    if (section === "New Listings") {
      result = result.slice(-5);
    }

    if (search.trim()) {
      const query = search
        .trim()
        .toLowerCase();

      result = result.filter(
        (market) =>
          market.symbol
            .toLowerCase()
            .includes(query) ||
          market.base
            .toLowerCase()
            .includes(query) ||
          market.name
            .toLowerCase()
            .includes(query)
      );
    }

    return result;
  }, [
    markets,
    section,
    search,
    favorites,
  ]); 

  const totalVolume = useMemo(() => {
    return markets.reduce(
      (total, market) =>
        total +
        market.volume24h * market.price,
      0
    );
  }, [markets]);

  const gainers = markets.filter(
    (market) =>
      market.changePercent24h > 0
  ).length;

  const losers = markets.filter(
    (market) =>
      market.changePercent24h < 0
  ).length;

  

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    if (price >= 1) {
      return price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      });
    }

    return price.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    });
  };

  const formatCompact = (value: number) => {
    if (value >= 1_000_000_000) {
      return `$${(
        value / 1_000_000_000
      ).toFixed(2)}B`;
    }

    if (value >= 1_000_000) {
      return `$${(
        value / 1_000_000
      ).toFixed(2)}M`;
    }

    if (value >= 1_000) {
      return `$${(
        value / 1_000
      ).toFixed(2)}K`;
    }

    return `$${value.toFixed(2)}`;
  };

  const formatPortfolio = (value: number) => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
 

  return (
    <main className="min-h-screen bg-[#0b0e11] px-4 py-6 text-white sm:px-6 lg:px-10 lg:py-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Markets
        </h1>

        <p className="mt-2 text-sm text-[#848e9c] sm:text-base">
          Explore cryptocurrency markets
          and price movements
        </p>
      </div>

      
      <div className="mb-8 rounded-xl border border-[#2b3139] bg-[#181a20] p-5 sm:p-6">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <p className="text-sm text-[#848e9c]">
              Total Portfolio Value
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              $
              {formatPortfolio(
                portfolioValue
              )}
            </h2>

            <p className="mt-2 text-xs text-[#848e9c]">
              Total value across your crypto
              wallet
            </p>
          </div>

          <div className="rounded-lg border border-[#2b3139] bg-[#0b0e11] px-5 py-4">
            <p className="text-xs text-[#848e9c]">
              Account
            </p>

            <p className="mt-1 font-semibold">
              Demo Trading Account
            </p>

            <p className="mt-1 text-xs text-[#f0b90b]">
              Frontend Demo
            </p>
          </div>

        </div>
      </div>

      {/* MARKET SUMMARY */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


        <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5">
          <p className="text-sm text-[#848e9c]">
            Markets
          </p>

          <p className="mt-2 text-2xl font-bold">
            {markets.length}
          </p>

          <p className="mt-1 text-xs text-[#848e9c]">
            Trading pairs
          </p>
        </div>

  
        <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5">
          <p className="text-sm text-[#848e9c]">
            24h Volume
          </p>

          <p className="mt-2 text-2xl font-bold">
            {formatCompact(totalVolume)}
          </p>

          <p className="mt-1 text-xs text-[#848e9c]">
            Across all markets
          </p>
        </div>

        
        <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5">
          <div className="flex items-center gap-2">
            <TrendingUp
              size={17}
              className="text-[#0ecb81]"
            />

            <p className="text-sm text-[#848e9c]">
              Gainers
            </p>
          </div>

          <p className="mt-2 text-2xl font-bold text-[#0ecb81]">
            {gainers}
          </p>
        </div>


        <div className="rounded-xl border border-[#2b3139] bg-[#181a20] p-5">
          <div className="flex items-center gap-2">
            <TrendingDown
              size={17}
              className="text-[#f6465d]"
            />

            <p className="text-sm text-[#848e9c]">
              Losers
            </p>
          </div>

          <p className="mt-2 text-2xl font-bold text-[#f6465d]">
            {losers}
          </p>
        </div>

      </div>

      
      <div className="mb-6 flex flex-col gap-2 rounded-lg border border-[#2b3139] bg-[#181a20] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#0ecb81]" />

          <span className="text-sm text-[#848e9c]">
            Market data updating
          </span>
        </div>

        <span className="text-xs text-[#f0b90b]">
          DEMO MARKET DATA
        </span>
      </div>

      {/* SEARCH */}
      <div className="mb-6 flex w-full max-w-md items-center gap-3 rounded-lg border border-[#2b3139] bg-[#181a20] px-4 py-3">

        <Search
          size={20}
          className="shrink-0 text-[#848e9c]"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search coin or pair"
          className="w-full bg-transparent text-sm outline-none placeholder:text-[#848e9c]"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-[#848e9c] transition hover:text-white"
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
      </div>

      {/* SECTIONS */}
      <div className="mb-6 overflow-x-auto border-b border-[#2b3139]">

        <div className="flex min-w-max gap-6">

          {SECTIONS.map((item) => (
            <button
              key={item}
              onClick={() =>
                setSection(item)
              }
              className={`whitespace-nowrap pb-4 text-sm font-medium transition ${
                section === item
                  ? "border-b-2 border-[#f0b90b] text-[#f0b90b]"
                  : "text-[#848e9c] hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}

        </div>
      </div>

      
      <div className="space-y-3 md:hidden">

        {loading && (
          <div className="rounded-xl border border-[#2b3139] bg-[#181a20] px-5 py-12 text-center text-[#848e9c]">
            Loading markets...
          </div>
        )}

        {!loading &&
          filteredMarkets.length === 0 && (
            <div className="rounded-xl border border-[#2b3139] bg-[#181a20] px-5 py-12 text-center">
              <p className="font-semibold">
                No markets found
              </p>

              <p className="mt-2 text-sm text-[#848e9c]">
                Try another coin or trading pair.
              </p>
            </div>
          )}

        {!loading &&
          filteredMarkets.map((market) => {
            const positive =
              market.changePercent24h >= 0;

            const favorite =
              favorites.includes(
                market.symbol
              );

            return (
              <div
                key={market.symbol}
                onClick={() =>
                  navigate(
                    `/trade/${market.symbol}`
                  )
                }
                className="rounded-xl border border-[#2b3139] bg-[#181a20] p-4 active:bg-[#20242b]"
              >
                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        toggleFavorite(
                          market.symbol
                        );
                      }}
                      className="text-[#848e9c]"
                    >
                      <Star
                        size={18}
                        fill={
                          favorite
                            ? "#f0b90b"
                            : "none"
                        }
                        className={
                          favorite
                            ? "text-[#f0b90b]"
                            : ""
                        }
                      />
                    </button>

                    <div>
                      <p className="font-semibold">
                        {market.base}
                        <span className="text-[#848e9c]">
                          /{market.quote}
                        </span>
                      </p>

                      <p className="text-xs text-[#848e9c]">
                        {market.name}
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold">
                      $
                      {formatPrice(
                        market.price
                      )}
                    </p>

                    <p
                      className={
                        positive
                          ? "text-sm text-[#0ecb81]"
                          : "text-sm text-[#f6465d]"
                      }
                    >
                      {positive ? "+" : ""}
                      {market.changePercent24h.toFixed(
                        2
                      )}
                      %
                    </p>

                  </div>

                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#2b3139] pt-4 text-xs">

                  <div>
                    <p className="text-[#848e9c]">
                      24h High
                    </p>

                    <p className="mt-1">
                      $
                      {formatPrice(
                        market.high24h
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#848e9c]">
                      24h Low
                    </p>

                    <p className="mt-1">
                      $
                      {formatPrice(
                        market.low24h
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#848e9c]">
                      Volume
                    </p>

                    <p className="mt-1">
                      {formatCompact(
                        market.volume24h *
                          market.price
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#848e9c]">
                      Market Cap
                    </p>

                    <p className="mt-1">
                      {formatCompact(
                        market.marketCap ??
                          market.price *
                            market.volume24h
                      )}
                    </p>
                  </div>

                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate(
                      `/trade/${market.symbol}`
                    );
                  }}
                  className="mt-4 w-full rounded-md bg-[#f0b90b] py-2.5 text-sm font-semibold text-black transition hover:bg-[#d9a500]"
                >
                  Trade
                </button>
              </div>
            );
          })}

      </div>

  
      <div className="hidden overflow-x-auto rounded-xl border border-[#2b3139] md:block">

        <table className="w-full min-w-[1100px]">

          <thead className="bg-[#181a20]">

            <tr className="text-left text-sm text-[#848e9c]">

              <th className="px-6 py-4">
                Pair
              </th>

              <th className="px-6 py-4">
                Last Price
              </th>

              <th className="px-6 py-4">
                24h Change
              </th>

              <th className="px-6 py-4">
                24h High
              </th>

              <th className="px-6 py-4">
                24h Low
              </th>

              <th className="px-6 py-4">
                24h Volume
              </th>

              <th className="px-6 py-4">
                Market Cap
              </th>

              <th className="px-6 py-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-16 text-center text-[#848e9c]"
                >
                  Loading markets...
                </td>
              </tr>
            )}

            {!loading &&
              filteredMarkets.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-16 text-center"
                  >
                    <p className="text-lg font-semibold">
                      No markets found
                    </p>

                    <p className="mt-2 text-sm text-[#848e9c]">
                      Try another coin or trading pair.
                    </p>
                  </td>
                </tr>
              )}

            {!loading &&
              filteredMarkets.map((market) => {

                const positive =
                  market.changePercent24h >= 0;

                const favorite =
                  favorites.includes(
                    market.symbol
                  );

                return (
                  <tr
                    key={market.symbol}
                    onClick={() =>
                      navigate(
                        `/trade/${market.symbol}`
                      )
                    }
                    className="cursor-pointer border-t border-[#2b3139] transition hover:bg-[#181a20]"
                  >

                    {/* PAIR */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            toggleFavorite(
                              market.symbol
                            );
                          }}
                          className="text-[#848e9c] transition hover:text-[#f0b90b]"
                        >
                          <Star
                            size={18}
                            fill={
                              favorite
                                ? "#f0b90b"
                                : "none"
                            }
                            className={
                              favorite
                                ? "text-[#f0b90b]"
                                : ""
                            }
                          />
                        </button>

                        <div>
                          <div className="font-semibold">
                            {market.base}

                            <span className="text-[#848e9c]">
                              /{market.quote}
                            </span>
                          </div>

                          <div className="text-xs text-[#848e9c]">
                            {market.name}
                          </div>
                        </div>

                      </div>

                    </td>

                
                    <td className="px-6 py-5 font-medium">
                      $
                      {formatPrice(
                        market.price
                      )}
                    </td>

                    
                    <td
                      className={`px-6 py-5 font-medium ${
                        positive
                          ? "text-[#0ecb81]"
                          : "text-[#f6465d]"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {market.changePercent24h.toFixed(
                        2
                      )}
                      %
                    </td>

          
                    <td className="px-6 py-5">
                      $
                      {formatPrice(
                        market.high24h
                      )}
                    </td>

              
                    <td className="px-6 py-5">
                      $
                      {formatPrice(
                        market.low24h
                      )}
                    </td>

            
                    <td className="px-6 py-5">
                      {market.volume24h.toLocaleString(
                        "en-US"
                      )}

                      <span className="ml-1 text-[#848e9c]">
                        {market.base}
                      </span>
                    </td>

              
                    <td className="px-6 py-5">
                      {formatCompact(
                        market.marketCap ??
                          market.price *
                            market.volume24h
                      )}
                    </td>

                    
                    <td className="px-6 py-5">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          navigate(
                            `/trade/${market.symbol}`
                          );
                        }}
                        className="rounded-md bg-[#f0b90b] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#d9a500]"
                      >
                        Trade
                      </button>

                    </td>

                  </tr>
                );
              })}

          </tbody>

        </table>

      </div>
      <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-[#848e9c] sm:flex-row">

        <span>
          {filteredMarkets.length} markets
          displayed
        </span>

        <span>
          Prices shown in USDT
        </span>

      </div>

    </main>
  );
}

export default Markets;