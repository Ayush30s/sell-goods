import { NavLink } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  PackageCheck,
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  X,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const sidebarItems = [
  {
    label: "Top Rated Products",
    path: "top-rated-products",
    icon: PackageCheck,
  },
  {
    label: "Most Sold Products",
    path: "most-sold-products",
    icon: ShoppingBag,
  },
  { label: "Daily Growth", path: "daily-growth", icon: TrendingUp },
  { label: "Sales", path: "sales", icon: BarChart3 },
  { label: "Orders", path: "orders", icon: ShoppingCart },
  { label: "Revenue", path: "revenue", icon: DollarSign },
];

const revenueData = [10000, 15000, 20000, 18000, 22000];

export default function Sidebar({ closeSidebar }) {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        data: revenueData,
        borderColor: "rgba(139, 92, 246, 1)",
        backgroundColor: "rgba(139, 92, 246, 0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div
      className={`h-full overflow-auto flex flex-col justify-between border-r p-6 shadow-xl transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Close Button for Mobile */}
      <button
        onClick={closeSidebar}
        className={`md:hidden self-end mb-4 p-2 rounded transition ${
          isDarkMode
            ? "hover:bg-gray-700 text-gray-300"
            : "hover:bg-gray-200 text-gray-700"
        }`}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 mb-6">
        {/* Dashboard Button */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-3 rounded-full font-medium transition ${
              isActive
                ? isDarkMode
                  ? "bg-green-800 text-white border border-purple-500"
                  : "bg-green-200 text-purple-800 border border-purple-500"
                : isDarkMode
                ? "hover:bg-gray-800 text-gray-200 border border-gray-600"
                : "hover:bg-green-50 text-gray-800 border border-purple-500"
            }`
          }
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-bold">Dashboard</span>
        </NavLink>

        {/* Other Sidebar Items */}
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 rounded-md transition font-medium ${
                  isActive
                    ? isDarkMode
                      ? "bg-gray-800 border-l-4 border-purple-400 shadow-sm text-purple-300"
                      : "bg-gray-100 border-l-4 border-purple-400 shadow-sm text-purple-700"
                    : isDarkMode
                    ? "hover:bg-gray-800 text-gray-300"
                    : "hover:bg-gray-50 text-gray-700"
                }`
              }
              onClick={closeSidebar}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Revenue Preview */}
      <div
        className={`p-3 rounded-md shadow-sm border transition-colors ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold">Revenue</h3>
          <span className="text-xs text-green-500 font-medium">+12%</span>
        </div>
        <div className="h-20">
          <Line data={chartData} options={chartOptions} />
        </div>
        <p className="text-lg font-bold mt-3">$22,000</p>
      </div>
    </div>
  );
}
