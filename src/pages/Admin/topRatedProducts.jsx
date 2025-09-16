import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useSelector } from "react-redux";
import { Star, ShoppingBag, TrendingUp } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

export default function TopRatedProducts() {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTimeframe, setSelectedTimeframe] = useState("Monthly");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [chartHeight, setChartHeight] = useState(300);

  // ✅ Detect screen size dynamically + compute chart height
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);

      const reservedSpace = window.innerWidth < 850 ? 180 : 240;
      const availableHeight = Math.max(200, window.innerHeight - reservedSpace);
      setChartHeight(availableHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 850;
  const isSmallMobile = screenWidth < 480;

  // ✅ Raw Products Data
  const rawProducts = [
    {
      name: "Smartphone",
      rating: 4.8,
      sales: 2100,
      category: "Electronics",
      date: "2025-09-05",
    },
    {
      name: "Shoes",
      rating: 4.5,
      sales: 1800,
      category: "Fashion",
      date: "2025-09-02",
    },
    {
      name: "Laptop",
      rating: 4.6,
      sales: 1300,
      category: "Electronics",
      date: "2025-08-10",
    },
    {
      name: "Headphones",
      rating: 4.4,
      sales: 950,
      category: "Electronics",
      date: "2025-09-10",
    },
    {
      name: "Watch",
      rating: 4.2,
      sales: 870,
      category: "Fashion",
      date: "2025-07-28",
    },
    {
      name: "Tablet",
      rating: 4.1,
      sales: 700,
      category: "Electronics",
      date: "2025-01-20",
    },
    {
      name: "Camera",
      rating: 4.3,
      sales: 640,
      category: "Electronics",
      date: "2025-08-15",
    },
    {
      name: "Backpack",
      rating: 4.0,
      sales: 550,
      category: "Fashion",
      date: "2025-07-05",
    },
  ];

  // ✅ Timeframe Filtering
  const filterByTimeframe = (products) => {
    const now = new Date();
    return products.filter((p) => {
      const date = new Date(p.date);
      if (selectedTimeframe === "Weekly") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return date >= weekAgo;
      }
      if (selectedTimeframe === "Monthly") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        return date >= monthAgo;
      }
      if (selectedTimeframe === "Yearly") {
        const yearAgo = new Date();
        yearAgo.setFullYear(now.getFullYear() - 1);
        return date >= yearAgo;
      }
      return true;
    });
  };

  // ✅ Apply Filters
  const timeFiltered = filterByTimeframe(rawProducts);
  const filteredProducts =
    selectedCategory === "All"
      ? timeFiltered
      : timeFiltered.filter((p) => p.category === selectedCategory);

  // ✅ Limit products by device width
  let displayedProducts = filteredProducts;
  if (isSmallMobile) {
    displayedProducts = filteredProducts.slice(0, 4); // <480px → 4 products
  } else if (isMobile) {
    displayedProducts = filteredProducts.slice(0, 7); // <850px → 7 products
  }

  // ✅ Insights
  const topRated =
    displayedProducts.length > 0
      ? displayedProducts.reduce((max, p) => (p.rating > max.rating ? p : max))
      : null;
  const bestSeller =
    displayedProducts.length > 0
      ? displayedProducts.reduce((max, p) => (p.sales > max.sales ? p : max))
      : null;
  const avgRating =
    displayedProducts.length > 0
      ? (
          displayedProducts.reduce((sum, p) => sum + p.rating, 0) /
          displayedProducts.length
        ).toFixed(2)
      : 0;

  // ✅ Chart Data
  const chartData = {
    labels: displayedProducts.map((p) => p.name),
    datasets: [
      {
        label: "Rating",
        data: displayedProducts.map((p) => p.rating),
        backgroundColor: "rgba(34,197,94,0.7)", // green
        borderRadius: 4,
        yAxisID: "y",
        maxBarThickness: isMobile ? 30 : 40,
      },
      {
        label: "Sales",
        data: displayedProducts.map((p) => p.sales),
        backgroundColor: "rgba(139,92,246,0.7)", // purple
        borderRadius: 4,
        yAxisID: "y1",
        maxBarThickness: isMobile ? 30 : 40,
      },
    ],
  };

  // ✅ Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
          boxWidth: 14,
        },
      },
      title: {
        display: true,
        text: "Product Ratings vs Sales",
        color: isDarkMode ? "#f3f4f6" : "#111827",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      x: {
        title: {
          display: !isMobile,
          text: "Products",
          color: isDarkMode ? "#f3f4f6" : "#111827",
          font: { size: 14, weight: "bold" },
        },
        grid: { display: true, color: isDarkMode ? "#374151" : "#e5e7eb" },
        ticks: {
          display: !isSmallMobile, // hide x labels on very small screens
          color: isDarkMode ? "#e5e7eb" : "#374151",
        },
      },
      y: {
        title: {
          display: !isMobile,
          text: "Values",
          color: isDarkMode ? "#f3f4f6" : "#111827",
          font: { size: 14, weight: "bold" },
        },
        grid: { display: true, color: isDarkMode ? "#374151" : "#e5e7eb" },
        ticks: {
          display: !isSmallMobile,
          color: isDarkMode ? "#e5e7eb" : "#374151",
        },
      },
      y1: { display: false },
    },
  };

  return (
    <div
      className={`flex flex-col h-full overflow-y-auto p-3 md:p-6 rounded-sm shadow-lg border transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      {/* Header + Filters */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <h2 className="text-base md:text-xl font-semibold">
          Top Rated Products
        </h2>

        <div className="flex gap-2">
          <select
            className={`rounded-lg px-2 py-1 md:px-3 md:py-2 text-sm outline-none border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            }`}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
          </select>

          <select
            className={`rounded-lg px-2 py-1 md:px-3 md:py-2 text-sm outline-none border ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            }`}
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* Top Rated */}
        <div
          className={`p-2 md:p-3 rounded-sm shadow-md flex items-center justify-between ${
            isDarkMode ? "bg-purple-900/30" : "bg-purple-100"
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                Top Rated
              </p>
              <Star className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
            </div>
            <h3 className="text-sm md:text-lg font-bold">
              {topRated ? `${topRated.name} (${topRated.rating})` : "N/A"}
            </h3>
          </div>
        </div>

        {/* Best Seller */}
        <div
          className={`p-2 md:p-3 rounded-sm shadow-md flex items-center justify-between ${
            isDarkMode ? "bg-green-900/30" : "bg-green-100"
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                Best Seller
              </p>
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
            </div>
            <div className="flex flex-row justify-between gap-2 items-center align-middle">
              <h3 className="text-sm md:text-lg font-bold">
                {bestSeller ? bestSeller.name : "N/A"}
              </h3>
              <p className="text-xs md:text-sm font-medium">
                {bestSeller ? `(${bestSeller.sales} Sales)` : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Avg Rating */}
        <div
          className={`p-2 md:p-3 rounded-sm shadow-md flex items-center justify-between ${
            isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                Avg Rating
              </p>
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            </div>
            <h3 className="text-sm md:text-lg font-bold">{avgRating}</h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className=" h-full">
        {/* Show number of products if mobile */}
        {(isMobile || isSmallMobile) && (
          <p className="text-xs md:text-sm text-gray-500 mb-2">
            Currently showing {displayedProducts.length} products
          </p>
        )}

        <div className="flex-1 h-full">
          {displayedProducts.length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No products match the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
