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

type ChartData = {
  yAxisData: Array<unknown>;
  xAxisData: unknown;
};

export const useFetchRealTimeTransactions = () => {
  const query = useQuery<Array<Response>, Error, ChartData>({
    queryKey: ["real-time-transactions"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/trades?symbol=BTCUSDT&limit=500"
      );

      return response.json();
    },
    select: (data) => ({
      xAxisData: data.map((d) => new Date(d.time)),
      yAxisData: data.map((d) => d.price),
    }),
    refetchInterval: 10000,
  });
  return query;
};
