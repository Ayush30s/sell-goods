import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample datasets
const datasets = {
  thisYear: [
    10000, 15000, 20000, 18000, 22000, 25000, 30000, 28000, 35000, 40000, 42000,
    45000,
  ],
  lastYear: [
    8000, 12000, 15000, 14000, 18000, 20000, 25000, 23000, 28000, 30000, 33000,
    35000,
  ],
  lastQuarter: [28000, 35000, 40000, 42000],
};

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Revenue() {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const [filter, setFilter] = useState("thisYear");
  const [chartHeight, setChartHeight] = useState(300);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const small = window.innerWidth < 640;
      setIsSmallDevice(small);

      // Chart height adapts by breakpoints
      if (window.innerWidth < 480) {
        setChartHeight(220);
      } else if (window.innerWidth < 768) {
        setChartHeight(260);
      } else {
        setChartHeight(360);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectedData = datasets[filter];
  const labels = filter === "lastQuarter" ? monthLabels.slice(-4) : monthLabels;

  // Insights
  const totalRevenue = selectedData.reduce((a, b) => a + b, 0);
  const avgRevenue = (totalRevenue / selectedData.length).toFixed(0);
  const highestIndex = selectedData.indexOf(Math.max(...selectedData));
  const highestMonth = labels[highestIndex];
  const highestValue = Math.max(...selectedData);

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue ($)",
        data: selectedData,
        backgroundColor: "rgba(16,185,129,0.7)", // green
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          display: !isSmallDevice,
          font: { size: isSmallDevice ? 8 : 12 },
        },
      },
      y: {
        grid: { color: isDarkMode ? "#374151" : "#f3f4f6" },
        ticks: {
          display: !isSmallDevice,
          font: { size: isSmallDevice ? 8 : 12 },
        },
      },
    },
  };

  const filters = [
    { label: "This Year", value: "thisYear" },
    { label: "Last Year", value: "lastYear" },
    { label: "Last Quarter", value: "lastQuarter" },
  ];

  return (
    <div
      className={`flex flex-col h-full overflow-auto p-4 md:p-6 rounded-sm shadow-lg border transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      {/* Header with Filters */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <h2 className="text-lg md:text-xl font-semibold">Revenue Overview</h2>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition border
                ${
                  filter === f.value
                    ? "bg-green-600 text-white border-green-600 shadow"
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
          className={`${
            isDarkMode ? "bg-green-900/30" : "bg-green-50"
          } p-3 rounded-sm text-center`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Total Revenue
          </p>
          <p className="text-lg font-bold text-green-700 dark:text-green-400">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
        <div
          className={`${
            isDarkMode ? "bg-blue-900/30" : "bg-blue-50"
          } p-3 rounded-sm text-center`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Avg / Month
          </p>
          <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
            ${avgRevenue.toLocaleString()}
          </p>
        </div>
        <div
          className={`${
            isDarkMode ? "bg-yellow-900/30" : "bg-yellow-50"
          } p-3 rounded-sm text-center`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">Best Month</p>
          <p className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
            {highestMonth} (${highestValue.toLocaleString()})
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1" style={{ height: `${chartHeight}px` }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
