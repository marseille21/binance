 const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

let transactions = [
  {
    id: "TXN-10004",
    orderId: "ORD-50004",
    type: "DEPOSIT",
    symbol: "BANK",
    name: "Bank Transfer",
    side: "DEPOSIT",
    price: 1,
    quantity: 1000,
    total: 1000,
    asset: "USD",
    status: "COMPLETED",
    time: Date.now() - 30 * 60 * 1000,
  },
  {
    id: "TXN-10003",
    orderId: "ORD-50003",
    type: "BUY",
    symbol: "BTC",
    name: "Bitcoin",
    side: "BUY",
    pair: "BTC/USDT",
    price: 109250.5,
    quantity: 0.002,
    total: 218.5,
    asset: "BTC",
    status: "COMPLETED",
    time: Date.now() - 15 * 60 * 1000,
  },
  {
    id: "TXN-10002",
    orderId: "ORD-50002",
    type: "SELL",
    symbol: "ETH",
    name: "Ethereum",
    side: "SELL",
    pair: "ETH/USDT",
    price: 3945.2,
    quantity: 0.15,
    total: 591.78,
    asset: "ETH",
    status: "COMPLETED",
    time: Date.now() - 8 * 60 * 1000,
  },
  {
    id: "TXN-10001",
    orderId: "ORD-50001",
    type: "BUY",
    symbol: "SOL",
    name: "Solana",
    side: "BUY",
    pair: "SOL/USDT",
    price: 225.4,
    quantity: 2.5,
    total: 563.5,
    asset: "SOL",
    status: "COMPLETED",
    time: Date.now() - 3 * 60 * 1000,
  },
];

app.get("/api/transactions", (req, res) => {
  const limit = Number(req.query.limit || 20);

  const result = [...transactions]
    .sort((a, b) => b.time - a.time)
    .slice(0, limit);

  res.json(result);
});

app.post("/api/transactions", (req, res) => {
  const {
    type,
    symbol,
    name,
    side,
    pair,
    price,
    quantity,
    total,
    asset,
  } = req.body;

  if (
    !type ||
    !symbol ||
    !price ||
    !quantity ||
    !total
  ) {
    return res.status(400).json({
      message: "Missing transaction information",
    });
  }

  const transaction = {
    id: `TXN-${Date.now()}`,
    orderId: `ORD-${Date.now()}`,
    type,
    symbol,
    name,
    side,
    pair,
    price: Number(price),
    quantity: Number(quantity),
    total: Number(total),
    asset,
    status: "COMPLETED",
    time: Date.now(),
  };

  transactions.unshift(transaction);

  res.status(201).json(transaction);
});

app.listen(PORT, () => {
  console.log(
    ` financial API running on http://localhost:${PORT}`
  );
});