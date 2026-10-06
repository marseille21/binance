 import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
} from "lightweight-charts";

interface PriceChartProps {
  symbol?: string;
}

const CHART_DATA: CandlestickData<Time>[] = [
  {
    time: "2026-09-28",
    open: 106800,
    high: 108000,
    low: 106200,
    close: 107500,
  },
  {
    time: "2026-09-29",
    open: 107500,
    high: 109200,
    low: 107000,
    close: 108600,
  },
  {
    time: "2026-09-30",
    open: 108600,
    high: 110000,
    low: 108100,
    close: 109250,
  },
  {
    time: "2026-10-01",
    open: 109250,
    high: 110200,
    low: 108700,
    close: 109800,
  },
  {
    time: "2026-10-02",
    open: 109800,
    high: 111200,
    low: 109000,
    close: 110600,
  },
  {
    time: "2026-10-03",
    open: 110600,
    high: 111500,
    low: 109800,
    close: 110100,
  },
  {
    time: "2026-10-04",
    open: 110100,
    high: 111000,
    low: 108900,
    close: 109250,
  },
  {
    time: "2026-10-05",
    open: 109250,
    high: 110500,
    low: 108800,
    close: 109900,
  },
];

function PriceChart({ symbol = "BTCUSDT" }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  const chartRef = useRef<IChartApi | null>(null);

  const candleSeriesRef =
    useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: "#181a20",
        },
        textColor: "#848e9c",
      },

      grid: {
        vertLines: {
          color: "#2b3139",
        },
        horzLines: {
          color: "#2b3139",
        },
      },

      width: chartContainerRef.current.clientWidth,

      height: 450,

      rightPriceScale: {
        borderColor: "#2b3139",
      },

      timeScale: {
        borderColor: "#2b3139",
        timeVisible: true,
      },

      crosshair: {
        vertLine: {
          color: "#848e9c",
        },

        horzLine: {
          color: "#848e9c",
        },
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#0ecb81",
      downColor: "#f6465d",

      borderUpColor: "#0ecb81",
      borderDownColor: "#f6465d",

      wickUpColor: "#0ecb81",
      wickDownColor: "#f6465d",
    });

    candleSeries.setData(CHART_DATA);

    chart.timeScale().fitContent();

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    const handleResize = () => {
      if (!chartContainerRef.current) return;

      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();

      chartRef.current = null;
      candleSeriesRef.current = null;
    };
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center gap-3 px-3">
        <span className="text-xs text-white">
          {symbol.replace("USDT", "")}/USDT
        </span>

        <span className="text-xs text-[#848e9c]">
          1D
        </span>

        <span className="text-xs text-[#848e9c]">
          Candles
        </span>
      </div>

      <div
        ref={chartContainerRef}
        className="h-\[450px\] w-full"
      />
    </div>
  );
}

export default PriceChart;