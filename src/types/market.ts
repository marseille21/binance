export interface MarketPair {
  symbol: string;
  base: string;
  quote: string;
  name: string;
  price: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}