import { NavLink, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  PackageCheck,
  ShoppingBag,
  ShoppingCart,
  DollarSign,
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

export default function Sidebar() {
  const navigate = useNavigate();

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        data: revenueData,
        borderColor: "rgba(139, 92, 246, 1)", // purple-500
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
    <div className="w-72 bg-white shadow-xl h-full p-6 flex flex-col justify-between border-r border-gray-200">
      {/* Navigation */}
      <nav className="flex flex-col space-y-2 mb-6">
        {/* Sidebar Home Link */}
        <div className="flex items-center gap-3 border-2 py-1.5 px-2 rounded-full bg-green-200 transition font-medium text-sm border-green-500 text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-8 h-8 flex items-center justify-center p-2 border  border-green-500 rounded-full transition ${
                isActive
                  ? "bg-white text-green-700 shadow-sm"
                  : "bg-white text-gray-700 hover:bg-green-300"
              }`
            }
          >
            <ArrowLeft className="w-5 h-5 font-bold" />
          </NavLink>

          <span className="text-2xl font-bold">Dashboard</span>
        </div>

        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 rounded-sm transition font-medium ${
                  isActive
                    ? "border-2 border-purple-300 text-gray-700 shadow-sm"
                    : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Revenue Preview */}
      <div className="bg-gradient-to-br from-purple-50 to-white border rounded-sm shadow-sm p-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-700">Revenue</h3>
          <span className="text-xs text-green-600 font-medium">+12%</span>
        </div>
        <div className="h-20">
          <Line data={chartData} options={chartOptions} />
        </div>
        <p className="text-lg font-bold text-gray-900 mt-3">$22,000</p>
      </div>
    </div>
  );
}
