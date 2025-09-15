import { useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample datasets for filters
const datasets = {
  thisYear: [
    1200, 1500, 1700, 1300, 2000, 2100, 2500, 2300, 2600, 2800, 3000, 3200,
  ],
  lastYear: [
    1000, 1200, 1400, 1100, 1600, 1700, 2000, 1800, 2100, 2200, 2400, 2600,
  ],
  last6Months: [2000, 2100, 2500, 2300, 2600, 2800],
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

export default function Sales() {
  const [filter, setFilter] = useState("thisYear");

  const selectedData = datasets[filter];
  const labels = filter === "last6Months" ? monthLabels.slice(6) : monthLabels;

  // Insights
  const totalSales = selectedData.reduce((a, b) => a + b, 0);
  const avgSales = (totalSales / selectedData.length).toFixed(0);
  const highestMonthIndex = selectedData.indexOf(Math.max(...selectedData));
  const highestMonth = labels[highestMonthIndex];
  const highestValue = Math.max(...selectedData);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Sales",
        data: selectedData,
        backgroundColor: "rgba(99,102,241,0.7)",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#f3f4f6" } },
    },
  };

  const filters = [
    { label: "This Year", value: "thisYear" },
    { label: "Last Year", value: "lastYear" },
    { label: "Last 6 Months", value: "last6Months" },
  ];

  return (
    <div className="bg-white p-6 rounded-sm shadow-lg border border-gray-100 w-full h-full flex flex-col">
      {/* Header with Filters */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Monthly Sales</h2>
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
          <p className="text-xs text-gray-500">Total Sales</p>
          <p className="text-lg font-bold text-purple-700">
            ${totalSales.toLocaleString()}
          </p>
        </div>
        <div className="bg-blue-50 p-3 rounded-sm text-center">
          <p className="text-xs text-gray-500">Average / Month</p>
          <p className="text-lg font-bold text-blue-700">${avgSales}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-sm text-center">
          <p className="text-xs text-gray-500">Best Month</p>
          <p className="text-lg font-bold text-green-700">
            {highestMonth} (${highestValue.toLocaleString()})
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
