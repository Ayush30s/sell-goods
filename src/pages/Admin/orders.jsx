import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
  const [filter, setFilter] = useState("All");

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
        backgroundColor: ["#22c55e", "#facc15", "#3b82f6"], // green, yellow, blue
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { font: { size: 14 } },
      },
      title: {
        display: true,
        text: "Order Status Distribution",
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
    <div className="bg-white p-6 rounded-sm shadow-lg space-y-6 border border-gray-100">
      {/* Insights Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-purple-50 p-4 rounded-sm text-center">
          <p className="text-xs text-gray-500">Total Orders</p>
          <p className="text-lg font-bold text-purple-700">{totalOrders}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-sm text-center">
          <p className="text-xs text-gray-500">Delivered</p>
          <p className="text-lg font-bold text-green-700">{deliveredOrders}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-sm text-center">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-lg font-bold text-yellow-700">{pendingOrders}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-sm text-center">
          <p className="text-xs text-gray-500">Shipped</p>
          <p className="text-lg font-bold text-blue-700">{shippedOrders}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full max-w-sm mx-auto">
        <Doughnut data={chartData} options={chartOptions} />
      </div>

      {/* Header with Filters */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-sm font-medium transition border 
                ${
                  filter === f
                    ? "bg-purple-600 text-white border-purple-600 shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-sm border border-gray-200 shadow-sm">
        <table className="w-full text-left ">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
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
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-purple-50 transition`}
              >
                <td className="py-3 px-4 font-medium text-gray-700">
                  {order.id}
                </td>
                <td className="px-4 text-gray-600">{order.customer}</td>
                <td className="px-4 text-gray-600">{order.product}</td>
                <td className="px-4 font-semibold text-gray-800">
                  {order.amount}
                </td>
                <td className="px-4">
                  <span
                    className={`px-2 py-1 rounded-sm font-semibold 
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
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
      <div className=" text-gray-600 mt-2">
        ✅ <span className="font-bold">{deliveredPercentage}%</span> of all
        orders have been delivered successfully.
      </div>
    </div>
  );
}
