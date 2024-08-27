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

export type ChartData = {
  yAxisData: {
    quantities: Array<string>;
    prices: Array<string>;
  };
  xAxisData: Array<unknown>;
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
    select: (data) =>
      data.reduce(
        (previous, current) => ({
          yAxisData: {
            quantities: [...previous.yAxisData.quantities, current.qty],
            prices: [...previous.yAxisData.prices, current.price],
          },
          xAxisData: [...previous.xAxisData, current.time],
        }),
        {
          yAxisData: {
            quantities: [],
            prices: [],
          },
          xAxisData: [],
        } as ChartData
      ),

    refetchInterval: 10000,
  });
  return query;
};
