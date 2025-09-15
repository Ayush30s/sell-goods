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
  const [filter, setFilter] = useState("thisYear");

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
      x: { grid: { display: false } },
      y: { grid: { color: "#f3f4f6" } },
    },
  };

  const filters = [
    { label: "This Year", value: "thisYear" },
    { label: "Last Year", value: "lastYear" },
    { label: "Last Quarter", value: "lastQuarter" },
  ];

  return (
    <div className="bg-white p-6 rounded-sm shadow-lg border border-gray-100 w-full h-full flex flex-col">
      {/* Header with Filters */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Revenue Overview</h2>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-sm text-sm font-medium transition border
                ${
                  filter === f.value
                    ? "bg-green-600 text-white border-green-600 shadow"
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
        <div className="bg-green-50 p-3 rounded-sm text-center">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <p className="text-lg font-bold text-green-700">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-blue-50 p-3 rounded-sm text-center">
          <p className="text-xs text-gray-500">Avg / Month</p>
          <p className="text-lg font-bold text-blue-700">
            ${avgRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-sm text-center">
          <p className="text-xs text-gray-500">Best Month</p>
          <p className="text-lg font-bold text-yellow-700">
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
