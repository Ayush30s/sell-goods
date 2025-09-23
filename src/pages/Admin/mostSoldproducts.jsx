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
import { categoriesResgiter } from "../../utils/Rawdata";
import { Star, TrendingUp, ShoppingBag } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const allProducts = [
  { name: "Smartphones", units: 120, category: "Electronics & Gadgets" },
  { name: "Laptops", units: 90, category: "Electronics & Gadgets" },
  { name: "Headphones", units: 75, category: "Electronics & Gadgets" },
  { name: "Shoes", units: 60, category: "Fashion & Apparel" },
  { name: "Watches", units: 50, category: "Jewelry & Watches" },
  { name: "Books", units: 40, category: "Books, Music & Media" },
];

export default function MostSoldProducts() {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const [filter, setFilter] = useState("All");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [chartHeight, setChartHeight] = useState(300);

  // ✅ Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallDevice = windowWidth < 768;

  // ✅ Recalculate chart height when screen size changes
  useEffect(() => {
    const reservedSpace = isSmallDevice ? 220 : 180;
    const availableHeight = Math.max(240, window.innerHeight - reservedSpace);
    setChartHeight(availableHeight);
  }, [isSmallDevice, windowWidth]);

  // Filter products by category
  const displayedProducts =
    filter === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === filter);

  const chartData = {
    labels: displayedProducts.map((p) => p.name),
    datasets: [
      {
        label: "Units Sold",
        data: displayedProducts.map((p) => p.units),
        backgroundColor: isDarkMode
          ? "rgba(167, 139, 250, 0.8)"
          : "rgba(139, 92, 246, 0.8)",
        borderRadius: 4,
        maxBarThickness: isSmallDevice ? 28 : 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x", // vertical bars
    plugins: { legend: { display: false } },
    scales: {
      y: {
        title: {
          display: true,
          text: "Units",
          color: isDarkMode ? "#f3f4f6" : "#111827",
          font: { size: isSmallDevice ? 10 : 14, weight: "bold" },
        },
        grid: { color: isDarkMode ? "#374151" : "#f3f4f6" },
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
          font: { size: isSmallDevice ? 8 : 12 },
        },
      },
      x: {
        title: {
          display: true,
          text: "Products",
          color: isDarkMode ? "#f3f4f6" : "#111827",
          font: { size: isSmallDevice ? 10 : 14, weight: "bold" },
        },
        grid: { display: false },
        ticks: {
          display: !isSmallDevice, // ✅ hide x labels on small devices
          color: isDarkMode ? "#e5e7eb" : "#374151",
          font: { size: 10 },
        },
      },
    },
  };

  // Insights
  const totalUnits = displayedProducts.reduce((sum, p) => sum + p.units, 0);
  const topProduct =
    displayedProducts.length > 0
      ? displayedProducts.reduce((max, p) => (p.units > max.units ? p : max))
      : { name: "N/A", units: 0 };
  const avgUnits =
    displayedProducts.length > 0
      ? (totalUnits / displayedProducts.length).toFixed(1)
      : 0;
  const topPercentage =
    totalUnits > 0 ? ((topProduct.units / totalUnits) * 100).toFixed(1) : 0;

  return (
    <div
      className={`flex flex-col overflow-y-auto p-3 md:p-6 rounded-sm shadow-lg border transition-colors duration-300
        ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
    >
      {/* Header + Filter */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <h2 className="text-base md:text-xl font-semibold">
          Most Sold Products
        </h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`rounded-lg px-2 py-1 md:px-3 md:py-2 text-sm outline-none border
            ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            }`}
        >
          {categoriesResgiter.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {/* Top Product */}
        <div
          className={`p-4 rounded-sm shadow-md flex items-center justify-between ${
            isDarkMode ? "bg-purple-900/30" : "bg-purple-100"
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                Top Product
              </p>
              <Star className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
            </div>
            <h3 className="text-sm md:text-lg font-bold">
              {topProduct.name} ({topProduct.units})
            </h3>
          </div>
        </div>

        {/* Total Units */}
        <div
          className={`p-4 rounded-sm shadow-md flex items-center justify-between ${
            isDarkMode ? "bg-green-900/30" : "bg-green-100"
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                Total Units
              </p>
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
            </div>
            <h3 className="text-sm md:text-lg font-bold">{totalUnits}</h3>
          </div>
        </div>

        {/* Avg / Product */}
        <div
          className={`p-4 rounded-sm shadow-md flex items-center justify-between ${
            isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                Avg / Product
              </p>
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            </div>
            <h3 className="text-sm md:text-lg font-bold">{avgUnits}</h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div>
        <p className="text-xs md:text-sm text-gray-500 mb-4">
          Units Sold per Product – {displayedProducts.length} products shown
        </p>

        <div
          style={{
            width: "100%",
            height: `${chartHeight}px`,
          }}
        >
          {displayedProducts.length > 0 ? (
            <Bar data={chartData} options={options} />
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No products available in this category
            </p>
          )}
        </div>
      </div>

      {/* Footer Summary */}
      {displayedProducts.length > 0 && (
        <div className="text-xs md:text-sm opacity-80 mt-3">
          📊 <span className="font-semibold">{topProduct.name}</span> accounts
          for <span className="font-bold">{topPercentage}%</span> of total sales
          in <span className="font-semibold">{filter}</span>.
        </div>
      )}
    </div>
  );
}
