import { useState } from "react";
import { useSelector } from "react-redux";
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
import { Star, TrendingUp, ShoppingBag } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Added sample dates for demo (simulate sales timestamp)
const rawProducts = [
  {
    name: "Smartphone",
    rating: 4.8,
    category: "Electronics",
    sales: 1200,
    date: "2025-09-05",
  },
  {
    name: "Laptop",
    rating: 4.7,
    category: "Electronics",
    sales: 850,
    date: "2025-08-15",
  },
  {
    name: "Shoes",
    rating: 4.6,
    category: "Fashion",
    sales: 2100,
    date: "2025-09-10",
  },
  {
    name: "Headphones",
    rating: 4.5,
    category: "Electronics",
    sales: 1800,
    date: "2025-09-12",
  },
  {
    name: "Watch",
    rating: 4.4,
    category: "Fashion",
    sales: 950,
    date: "2025-07-20",
  },
  {
    name: "Tablet",
    rating: 4.3,
    category: "Electronics",
    sales: 700,
    date: "2025-01-10",
  },
  {
    name: "Jacket",
    rating: 4.2,
    category: "Fashion",
    sales: 1300,
    date: "2025-09-02",
  },
];

const categories = ["All", "Electronics", "Fashion"];
const timeframes = ["Weekly", "Monthly", "Yearly"];

export default function TopRatedProducts() {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTimeframe, setSelectedTimeframe] = useState("Monthly");

  // ---- Timeframe Filter ----
  const filterByTimeframe = (products) => {
    const now = new Date();
    return products.filter((p) => {
      const productDate = new Date(p.date);
      if (selectedTimeframe === "Weekly") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return productDate >= weekAgo;
      }
      if (selectedTimeframe === "Monthly") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        return productDate >= monthAgo;
      }
      if (selectedTimeframe === "Yearly") {
        const yearAgo = new Date();
        yearAgo.setFullYear(now.getFullYear() - 1);
        return productDate >= yearAgo;
      }
      return true;
    });
  };

  // Apply filters
  const filteredByTime = filterByTimeframe(rawProducts);
  const filteredProducts =
    selectedCategory === "All"
      ? filteredByTime
      : filteredByTime.filter((p) => p.category === selectedCategory);

  // ---- Chart Color Helper ----
  const getColorByRating = (rating) => {
    const hue = (rating / 5) * 120;
    return `hsl(${hue}, 70%, 65%)`;
  };

  // Chart Data
  const chartData = {
    labels: filteredProducts.map((p) => p.name),
    datasets: [
      {
        label: "Rating",
        data: filteredProducts.map((p) => p.rating),
        backgroundColor: filteredProducts.map((p) =>
          getColorByRating(p.rating)
        ),
        borderRadius: 4,
        yAxisID: "y1",
      },
      {
        label: "Sales",
        data: filteredProducts.map((p) => p.sales),
        backgroundColor: "#A5B4FC",
        borderRadius: 4,
        yAxisID: "y2",
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
          font: { size: 13, weight: "500" },
        },
      },
      tooltip: {
        backgroundColor: isDarkMode
          ? "rgba(31,41,55,0.85)"
          : "rgba(255,255,255,0.95)",
        titleColor: isDarkMode ? "#f9fafb" : "#111827",
        bodyColor: isDarkMode ? "#e5e7eb" : "#374151",
        borderColor: isDarkMode ? "#4b5563" : "#e5e7eb",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Products",
          color: isDarkMode ? "#f3f4f6" : "#111827",
          font: { size: 13, weight: "600" },
        },
        ticks: {
          color: isDarkMode ? "#d1d5db" : "#4b5563",
          font: { size: 12 },
        },
        grid: { color: isDarkMode ? "#374151" : "#f3f4f6" },
      },
      y1: {
        type: "linear",
        position: "left",
        min: 0,
        max: 5,
        title: {
          display: true,
          text: "Ratings (0 - 5)",
          color: isDarkMode ? "#f3f4f6" : "#111827",
          font: { size: 13, weight: "600" },
        },
        ticks: {
          color: isDarkMode ? "#d1d5db" : "#4b5563",
          callback: (val) => val.toFixed(1),
        },
        grid: { drawOnChartArea: false },
      },
      y2: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Units Sold",
          color: isDarkMode ? "#f3f4f6" : "#111827",
          font: { size: 13, weight: "600" },
        },
        ticks: { color: isDarkMode ? "#d1d5db" : "#4b5563" },
        grid: { color: isDarkMode ? "#374151" : "#f3f4f6", borderDash: [4, 4] },
      },
    },
    animation: { duration: 1000, easing: "easeOutQuart" },
  };

  // ---- Insights ----
  const topRated =
    filteredProducts.length > 0
      ? filteredProducts.reduce((max, p) => (p.rating > max.rating ? p : max))
      : null;

  const bestSeller =
    filteredProducts.length > 0
      ? filteredProducts.reduce((max, p) => (p.sales > max.sales ? p : max))
      : null;

  const avgRating =
    filteredProducts.length > 0
      ? (
          filteredProducts.reduce((sum, p) => sum + p.rating, 0) /
          filteredProducts.length
        ).toFixed(2)
      : 0;

  return (
    <div className="p-6 bg-white shadow-lg rounded-sm w-full h-full space-y-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Top Rated Products</h2>

        <div className="flex gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-sm border border-gray-300 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Timeframe Filter */}
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 rounded-sm border border-gray-300 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-indigo-500"
          >
            {timeframes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Insights Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-50 p-4 rounded-sm flex items-center gap-3">
          <Star className="text-purple-600 w-6 h-6" />
          <div>
            <p className="text-xs text-gray-500">Top Rated</p>
            <p className="text-lg font-bold text-purple-700">
              {topRated ? `${topRated.name} (${topRated.rating})` : "N/A"}
            </p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-sm flex items-center gap-3">
          <ShoppingBag className="text-green-600 w-6 h-6" />
          <div>
            <p className="text-xs text-gray-500">Best Seller</p>
            <p className="text-lg font-bold text-green-700">
              {bestSeller ? `${bestSeller.name} (${bestSeller.sales})` : "N/A"}
            </p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-sm flex items-center gap-3">
          <TrendingUp className="text-blue-600 w-6 h-6" />
          <div>
            <p className="text-xs text-gray-500">Avg Rating</p>
            <p className="text-lg font-bold text-blue-700">{avgRating}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[420px]">
        {filteredProducts.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No products available in this category & timeframe
          </p>
        )}
      </div>
    </div>
  );
}
