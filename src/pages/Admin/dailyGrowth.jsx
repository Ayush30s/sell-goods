import { useState } from "react";
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
  const [filter, setFilter] = useState("week");

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
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        padding: 10,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#f3f4f6" } },
    },
  };

  const filters = [
    { label: "This Week", value: "week" },
    { label: "Last Week", value: "lastWeek" },
    { label: "This Month", value: "month" },
  ];

  return (
    <div className="bg-white p-6 rounded-sm shadow-lg border border-gray-100 w-full h-full flex flex-col">
      {/* Header with Filters */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-bold text-gray-800">Daily Growth</h2>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-sm text-sm font-medium transition border
                ${
                  filter === f.value
                    ? "bg-purple-600 text-white border-purple-600 shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Insights Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-purple-50 p-3 rounded-sm text-center">
          <p className="text-xs text-gray-500">Total Growth</p>
          <p className="text-lg font-bold text-purple-700">{total}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-sm text-center">
          <p className="text-xs text-gray-500">Average Daily</p>
          <p className="text-lg font-bold text-blue-700">{avg}</p>
        </div>
        {compareWithLastWeek && (
          <div
            className={`p-3 rounded-sm text-center ${
              compareWithLastWeek >= 0 ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <p className="text-xs text-gray-500">vs Last Week</p>
            <p
              className={`text-lg font-bold ${
                compareWithLastWeek >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {compareWithLastWeek >= 0 ? "+" : ""}
              {compareWithLastWeek}%
            </p>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="flex-1 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
