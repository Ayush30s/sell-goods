import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const orders = [
  {
    id: "001",
    customer: "Alice",
    product: "Wireless Headphones",
    amount: "$120",
    status: "Delivered",
  },
  {
    id: "002",
    customer: "Bob",
    product: "Smartphone",
    amount: "$230",
    status: "Pending",
  },
  {
    id: "003",
    customer: "Charlie",
    product: "Laptop",
    amount: "$450",
    status: "Shipped",
  },
  {
    id: "004",
    customer: "David",
    product: "Gaming Mouse",
    amount: "$180",
    status: "Delivered",
  },
  {
    id: "005",
    customer: "Eva",
    product: "Keyboard",
    amount: "$90",
    status: "Pending",
  },
];

export default function Orders() {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const [filter, setFilter] = useState("All");
  const [chartHeight, setChartHeight] = useState(250);

  useEffect(() => {
    const handleResize = () => {
      const reservedSpace = window.innerWidth < 768 ? 250 : 220;
      setChartHeight(Math.max(200, window.innerHeight - reservedSpace));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Count orders by status
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgba(34,197,94,0.7)", // Delivered - green
          "rgba(250,204,21,0.7)", // Pending - yellow
          "rgba(59,130,246,0.7)", // Shipped - blue
        ],
        borderWidth: 2,
        borderColor: isDarkMode ? "#1f2937" : "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Order Status Distribution",
        color: isDarkMode ? "#f9fafb" : "#111827",
        font: { size: 16, weight: "bold" },
      },
    },
  };

  // Filtered orders based on status
  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const filters = ["All", "Delivered", "Pending", "Shipped"];

  // Insights
  const totalOrders = orders.length;
  const deliveredOrders = statusCounts["Delivered"] || 0;
  const pendingOrders = statusCounts["Pending"] || 0;
  const shippedOrders = statusCounts["Shipped"] || 0;
  const deliveredPercentage = ((deliveredOrders / totalOrders) * 100).toFixed(
    1
  );

  return (
    <div
      className={`flex flex-col h-auto overflow-auto p-4 md:p-6 rounded-sm shadow-lg border transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      {/* Insights Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div
          className={`${
            isDarkMode ? "bg-purple-900/30" : "bg-purple-50"
          } p-4 rounded-sm text-center`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Total Orders
          </p>
          <p className="text-lg font-bold text-purple-700 dark:text-purple-400">
            {totalOrders}
          </p>
        </div>
        <div
          className={`${
            isDarkMode ? "bg-green-900/30" : "bg-green-50"
          } p-4 rounded-sm text-center`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">Delivered</p>
          <p className="text-lg font-bold text-green-700 dark:text-green-400">
            {deliveredOrders}
          </p>
        </div>
        <div
          className={`${
            isDarkMode ? "bg-yellow-900/30" : "bg-yellow-50"
          } p-4 rounded-sm text-center`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">Pending</p>
          <p className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
            {pendingOrders}
          </p>
        </div>
        <div
          className={`${
            isDarkMode ? "bg-blue-900/30" : "bg-blue-50"
          } p-4 rounded-sm text-center`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-300">Shipped</p>
          <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
            {shippedOrders}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div
        className="w-full max-w-sm mx-auto mb-6"
        style={{ height: `${chartHeight}px` }}
      >
        <Doughnut data={chartData} options={chartOptions} />
      </div>

      {/* Header with Filters */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="text-lg md:text-xl font-semibold">Recent Orders</h2>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 md:px-4 md:py-1.5 rounded-md text-sm md:text-base  md:text-sm font-medium transition border 
          ${
            filter === f
              ? "bg-purple-600 text-white border-purple-600 shadow"
              : isDarkMode
              ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
          }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div
        className={`overflow-x-auto rounded-sm border shadow-sm ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <table className="min-w-max w-full text-left">
          <thead>
            <tr
              className={`uppercase text-xs tracking-wider ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-50 text-gray-600"
              }`}
            >
              <th className="py-3 px-4">Order ID</th>
              <th className="px-4">Customer</th>
              <th className="px-4">Product</th>
              <th className="px-4">Amount</th>
              <th className="px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <tr
                key={order.id}
                className={`transition ${
                  isDarkMode
                    ? idx % 2 === 0
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-700 hover:bg-gray-600"
                    : idx % 2 === 0
                    ? "bg-white hover:bg-purple-50"
                    : "bg-gray-50 hover:bg-purple-50"
                }`}
              >
                <td className="py-3 px-4 font-medium">{order.id}</td>
                <td className="px-4">{order.customer}</td>
                <td className="px-4">{order.product}</td>
                <td className="px-4 font-semibold">{order.amount}</td>
                <td className="px-4">
                  <span
                    className={`px-2 py-1 rounded-sm font-semibold 
                ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="text-gray-600 dark:text-gray-400 mt-3">
        ✅ <span className="font-bold">{deliveredPercentage}%</span> of all
        orders have been delivered successfully.
      </div>
    </div>
  );
}
