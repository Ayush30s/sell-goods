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
import { categoriesResgiter } from "../../utils/Rawdata";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock product data with categories
const allProducts = [
  { name: "Smartphones", units: 120, category: "Electronics & Gadgets" },
  { name: "Laptops", units: 90, category: "Electronics & Gadgets" },
  { name: "Headphones", units: 75, category: "Electronics & Gadgets" },
  { name: "Shoes", units: 60, category: "Fashion & Apparel" },
  { name: "Watches", units: 50, category: "Jewelry & Watches" },
  { name: "Books", units: 40, category: "Books, Music & Media" },
];

export default function MostSoldProducts() {
  const [filter, setFilter] = useState("All");

  // Filter products
  const products =
    filter === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === filter);

  // Chart data
  const chartData = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Units Sold",
        data: products.map((p) => p.units),
        backgroundColor: "#A78BFA",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: "#f3f4f6" } },
      x: { grid: { display: false } },
    },
  };

  // Insights
  const totalUnits = products.reduce((sum, p) => sum + p.units, 0);
  const topProduct =
    products.length > 0
      ? products.reduce((max, p) => (p.units > max.units ? p : max))
      : { name: "N/A", units: 0 };
  const avgUnits =
    products.length > 0 ? (totalUnits / products.length).toFixed(1) : 0;
  const topPercentage =
    totalUnits > 0 ? ((topProduct.units / totalUnits) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 bg-white shadow-lg rounded-sm w-full h-full space-y-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Most Sold Products</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-sm border border-gray-300 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-purple-500"
        >
          {categoriesResgiter.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Insights Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-purple-50 p-4 rounded-sm text-center">
          <p className="text-xs text-gray-500">Top Product</p>
          <p className="text-lg font-bold text-purple-700">{topProduct.name}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-sm text-center">
          <p className="text-xs text-gray-500">Total Units</p>
          <p className="text-lg font-bold text-green-700">{totalUnits}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-sm text-center">
          <p className="text-xs text-gray-500">Avg / Product</p>
          <p className="text-lg font-bold text-blue-700">{avgUnits}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[320px]">
        {products.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No products available in this category
          </p>
        )}
      </div>

      {/* Summary Footer */}
      {products.length > 0 && (
        <div className="text-sm text-gray-600 mt-2">
          📊 <span className="font-semibold">{topProduct.name}</span> accounts
          for <span className="font-bold">{topPercentage}%</span> of total sales
          in <span className="font-semibold">{filter}</span>.
        </div>
      )}
    </div>
  );
}
