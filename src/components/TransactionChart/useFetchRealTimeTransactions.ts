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
  xAxisData: Array<string>;
};

const getTimeFromMiliseconds = (ms: number): string => {
  const date = new Date(ms);

  return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`;
};

const mapResponseToChartData = (data: Array<Response>): ChartData =>
  data.reduce(
    (previous, current) => ({
      yAxisData: {
        quantities: [...previous.yAxisData.quantities, current.qty],
        prices: [...previous.yAxisData.prices, current.price],
      },
      xAxisData: [...previous.xAxisData, getTimeFromMiliseconds(current.time)],
    }),
    {
      yAxisData: {
        quantities: [],
        prices: [],
      },
      xAxisData: [],
    } as ChartData
  );

export const useFetchRealTimeTransactions = () => {
  const query = useQuery<Array<Response>, Error, ChartData>({
    queryKey: ["real-time-transactions"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/trades?symbol=BTCUSDT&limit=500"
      );

      return response.json();
    },
    select: mapResponseToChartData,
    refetchInterval: 2000,
    retry: 2,
  });

  return query;
};
