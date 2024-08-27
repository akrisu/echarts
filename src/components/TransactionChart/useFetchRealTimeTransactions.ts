import { useQuery } from "@tanstack/react-query";

type Response = {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
};

export const useFetchRealTimeTransactions = () => {
  const query = useQuery<Array<Response>>({
    queryKey: ["real-time-transactions"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/trades?symbol=BTCUSDT&limit=50"
      );

      return response.json();
    },
  });
  return query;
};
