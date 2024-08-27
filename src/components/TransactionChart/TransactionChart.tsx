import ReactECharts from "echarts-for-react";
import {
  ChartData,
  useFetchRealTimeTransactions,
} from "./useFetchRealTimeTransactions";

const getChartOptions = (
  xAxisData: ChartData["xAxisData"],
  yAxisData: ChartData["yAxisData"]
) => ({
  xAxis: {
    type: "category",
    data: xAxisData,
  },
  yAxis: [
    {
      type: "value",
      name: "Quantity",
      alignTicks: true,
      axisLabel: {
        formatter: (value: string) => Number(value).toFixed(3),
      },
    },
    {
      type: "value",
      name: "Price",
      min: (value: { min: number; max: number }) => value.min - 100,
      axisLabel: {
        formatter: (value: string) => `${value} $`,
      },
    },
  ],
  series: [
    {
      name: "Quantity",
      data: yAxisData.quantities,
      type: "bar",
    },
    {
      data: yAxisData.prices,
      name: "Price",
      yAxisIndex: 1,
      type: "line",
      smooth: true,
    },
  ],
  tooltip: {
    trigger: "axis",
  },
});

export const TransactionChart = () => {
  const { data, isLoading, isSuccess, isError } =
    useFetchRealTimeTransactions();

  if (isError) {
    return <>Error occured, please try again</>;
  }

  if (isLoading) {
    <ReactECharts showLoading={isLoading} option={{}} />;
  }

  if (isSuccess) {
    return (
      <ReactECharts option={getChartOptions(data.xAxisData, data.yAxisData)} />
    );
  }
  return null;
};
