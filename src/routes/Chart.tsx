import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

function Chart ({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId, { refechIntercal: 10000 }], () => fetchCoinHistory(coinId));
  return <div>
    {isLoading ? (
      "Loading chart..."
    ) : (
      <ApexChart
        type="line"
        series={[
          {
            name: "Price",
            data: data?.map((price) => price.close)?? [],
          },
        ]}  
        options={{
          theme: {
            mode: "dark"
          
          },
          chart: {
            height: 500,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent"
          },
          stroke: {
            curve: "smooth",
            width: 3,
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { datetimeFormatter: {month: "mmm 'yy'"} },
            type: "datetime",
            categories: data?.map((price) => price.time_close),
          },
          fill: {
            type: "gradient",
            gradient: {
              gradientToColors: ["purple"],
              stops: [0, 100]
            }
          },
          colors: ["white"],
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(3)}`
            }
          }
        }}
      />
    )}
  </div>;
}

export default Chart;