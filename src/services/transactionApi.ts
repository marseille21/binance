export interface Transaction {
  id: string;
  orderId: string;

  type:
    | "BUY"
    | "SELL"
    | "DEPOSIT"
    | "WITHDRAWAL"
    | "TRANSFER";

  symbol: string;
  name: string;

  side?: string;
  pair?: string;

  price: number;
  quantity: number;
  total: number;

  asset: string;

  status:
    | "COMPLETED"
    | "PENDING"
    | "FAILED";

  time: number;
}

const API_URL = "http://localhost:5000/api";

export async function getTransactions(
  limit = 20
): Promise<Transaction[]> {
  const response = await fetch(
    `${API_URL}/transactions?limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load transactions"
    );
  }

  return response.json();
}

export async function createTransaction(
  transaction: Omit<
    Transaction,
    "id" | "orderId" | "time"
  >
): Promise<Transaction> {
  const response = await fetch(
    `${API_URL}/transactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message ||
        "Failed to create transaction"
    );
  }

  return response.json();
}