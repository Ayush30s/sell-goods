import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data sets for filters
const datasets = {
  week: [120, 200, 150, 300, 250, 400, 350],
  lastWeek: [100, 180, 130, 280, 220, 360, 300],
  month: [500, 600, 750, 800, 900, 950, 1000],
};

export default function DailyGrowth() {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;
  const [filter, setFilter] = useState("week");
  const [isLandscape, setIsLandscape] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [chartHeight, setChartHeight] = useState(300);

  // ✅ Handle responsive chart height & orientation
  useEffect(() => {
    const handleResize = () => {
      const landscape = window.matchMedia("(orientation: landscape)").matches;
      setIsLandscape(landscape);
      const smallDevice = window.innerWidth < 768;
      setIsSmallDevice(smallDevice);

      // Reserve space for filters & insights
      const reservedSpace = smallDevice ? 220 : 200;
      setChartHeight(Math.max(180, window.innerHeight - reservedSpace));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectedData = datasets[filter];
  const total = selectedData.reduce((a, b) => a + b, 0);
  const avg = (total / selectedData.length).toFixed(1);

  // Compare with lastWeek if filter = week
  const compareWithLastWeek =
    filter === "week"
      ? (
          ((total - datasets["lastWeek"].reduce((a, b) => a + b, 0)) /
            datasets["lastWeek"].reduce((a, b) => a + b, 0)) *
          100
        ).toFixed(1)
      : null;

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Growth",
        data: selectedData,
        borderColor: "#6366F1",
        backgroundColor: "rgba(99,102,241,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#6366F1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDarkMode
          ? "rgba(31,41,55,0.9)"
          : "rgba(255,255,255,0.95)",
        titleColor: isDarkMode ? "#f9fafb" : "#111827",
        bodyColor: isDarkMode ? "#e5e7eb" : "#374151",
        borderColor: isDarkMode ? "#4b5563" : "#e5e7eb",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: !(isSmallDevice && isLandscape) },
        ticks: { display: !(isSmallDevice && isLandscape) },
      },
      y: {
        grid: {
          color: isDarkMode ? "#374151" : "#f3f4f6",
          display: !(isSmallDevice && isLandscape),
        },
        ticks: { display: !(isSmallDevice && isLandscape) },
      },
    },
  };

  const filters = [
    { label: "This Week", value: "week" },
    { label: "Last Week", value: "lastWeek" },
    { label: "This Month", value: "month" },
  ];

  return (
    <div
      className={`flex flex-col h-full overflow-hidden p-4 md:p-6 rounded-sm shadow-lg border transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      {/* Header with Filters */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="text-lg md:text-xl font-semibold">Daily Growth</h2>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition border ${
                filter === f.value
                  ? "bg-purple-600 text-white border-purple-600 shadow"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Insights Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div
          className={`p-3 rounded-md text-center ${
            isDarkMode ? "bg-purple-900/30" : "bg-purple-100"
          }`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Total Growth
          </p>
          <p className="text-lg font-bold text-purple-700 dark:text-purple-400">
            {total}
          </p>
        </div>

        <div
          className={`p-3 rounded-md text-center ${
            isDarkMode ? "bg-blue-900/30" : "bg-blue-50"
          }`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Average Daily
          </p>
          <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
            {avg}
          </p>
        </div>

        {compareWithLastWeek && (
          <div
            className={`p-3 rounded-md text-center ${
              compareWithLastWeek >= 0
                ? isDarkMode
                  ? "bg-green-900/30"
                  : "bg-green-50"
                : isDarkMode
                ? "bg-red-900/30"
                : "bg-red-50"
            }`}
          >
            <p className="text-xs text-gray-500 dark:text-gray-300">
              vs Last Week
            </p>
            <p
              className={`text-lg font-bold ${
                compareWithLastWeek >= 0
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              {compareWithLastWeek >= 0 ? "+" : ""}
              {compareWithLastWeek}%
            </p>
          </div>
        )}
      </div>

      {/* Chart */}
      <div
        className="flex-1 w-full"
        style={{ height: `${chartHeight}px` }}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
