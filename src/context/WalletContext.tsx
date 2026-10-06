 import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Coin =
  | "BTC"
  | "ETH"
  | "BNB"
  | "SOL"
  | "USDT";

export interface Balances {
  BTC: number;
  ETH: number;
  BNB: number;
  SOL: number;
  USDT: number;
}

export interface EarnPosition {
  id: number;
  coin: Coin;
  product: string;
  amount: number;
  apy: number;
  startedAt: string;
  earned: number;
}

interface WalletContextType {
  balances: Balances;
  earnPositions: EarnPosition[];
  totalEarned: number;
  portfolioValue: number;

  subscribeToEarn: (
    coin: Coin,
    product: string,
    amount: number,
    apy: number
  ) => boolean;

  buyCrypto: (
    coin: Coin,
    usdAmount: number
  ) => boolean;
}

const PRICES: Record<Coin, number> = {
  BTC: 109250.5,
  ETH: 3925.75,
  BNB: 875.4,
  SOL: 215.68,
  USDT: 1,
};
 

const INITIAL_BALANCES: Balances = {
  BTC: 1050000 / PRICES.BTC,
  ETH: 500000 / PRICES.ETH,
  BNB: 250000 / PRICES.BNB,
  SOL: 0,
  USDT: 90000,
};

const WalletContext =
  createContext<WalletContextType | undefined>(
    undefined
  );

export function WalletProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [balances, setBalances] =
    useState<Balances>(INITIAL_BALANCES);

  const [earnPositions, setEarnPositions] =
    useState<EarnPosition[]>([]);

 

  const subscribeToEarn = (
    coin: Coin,
    product: string,
    amount: number,
    apy: number
  ) => {
    if (amount <= 0) {
      return false;
    }

    if (balances[coin] < amount) {
      return false;
    }

    setBalances((previous) => ({
      ...previous,
      [coin]:
        previous[coin] - amount,
    }));

    const position: EarnPosition = {
      id: Date.now(),
      coin,
      product,
      amount,
      apy,
      startedAt:
        new Date().toLocaleString(),
      earned: 0,
    };

    setEarnPositions((previous) => [
      ...previous,
      position,
    ]);

    return true;
  };

 
  const buyCrypto = (
    coin: Coin,
    usdAmount: number
  ) => {
    if (usdAmount <= 0) {
      return false;
    }
 
    const fee = usdAmount * 0.001;

    const totalCost =
      usdAmount + fee;

    
    if (balances.USDT < totalCost) {
      return false;
    }

 
    const cryptoAmount =
      usdAmount / PRICES[coin];

    
    setBalances((previous) => ({
      ...previous,

      USDT:
        previous.USDT - totalCost,

      [coin]:
        previous[coin] +
        cryptoAmount,
    }));

    return true;
  };
 

  const liquidValue =
    balances.BTC * PRICES.BTC +
    balances.ETH * PRICES.ETH +
    balances.BNB * PRICES.BNB +
    balances.SOL * PRICES.SOL +
    balances.USDT;

 
  const earnPrincipalValue =
    earnPositions.reduce(
      (total, position) =>
        total +
        position.amount *
          PRICES[position.coin],
      0
    );

  
  const earnRewardValue =
    earnPositions.reduce(
      (total, position) =>
        total +
        position.earned *
          PRICES[position.coin],
      0
    );

  const portfolioValue =
    liquidValue +
    earnPrincipalValue +
    earnRewardValue;
 

  const totalEarned =
    earnPositions.reduce(
      (total, position) =>
        total +
        position.earned *
          PRICES[position.coin],
      0
    );

  return (
    <WalletContext.Provider
      value={{
        balances,
        earnPositions,
        totalEarned,
        portfolioValue,
        subscribeToEarn,
        buyCrypto,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context =
    useContext(WalletContext);

  if (!context) {
    throw new Error(
      "useWallet must be used inside WalletProvider"
    );
  }

  return context;
}