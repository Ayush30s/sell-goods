import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Home from "./pages/Home/Home.jsx";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AllProducts from "./pages/Product/AllProducts.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Login from "./pages/auth/Login.jsx";
import RegisterCustomerPage from "./pages/auth/RegisterCustomer.jsx";
import ProductDetails from "./pages/Product/ProductDetails.jsx";
import { Toaster } from "react-hot-toast";
import AddProductForm from "./pages/Product/PostProduct.jsx";
import RegsiterAdminPage from "./pages/auth/ResitgerAdmin.jsx";
import AdminDashboard from "./pages/Admin/dashboard.jsx";
import TopRatedProducts from "./pages/Admin/topRatedProducts.jsx";
import DailyGrowth from "./pages/Admin/dailyGrowth.jsx";
import Sales from "./pages/Admin/sales.jsx";
import Orders from "./pages/Admin/orders.jsx";
import Revenue from "./pages/Admin/revenue.jsx";
import MostSoldProducts from "./pages/Admin/mostSoldproducts.jsx";
import ProtectedRoute from "./guards/roleProtectedRoute.jsx";
import Register from "./pages/auth/RegisterPage.jsx";

// Router
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/register-customer",
        element: (
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <RegisterCustomerPage />
          </Suspense>
        ),
      },
      {
        path: "/register-admin",
        element: (
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <RegsiterAdminPage />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute allowedRoles={["customer", "admin", ""]}>
            <Suspense
              fallback={<div className="text-center mt-10">Loading...</div>}
            >
              <AllProducts />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <ProtectedRoute allowedRoles={["customer", "admin"]}>
            <Suspense
              fallback={<div className="text-center mt-10">Loading...</div>}
            >
              <ProductDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-product",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Suspense
              fallback={<div className="text-center mt-10">Loading...</div>}
            >
              <AddProductForm />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <Suspense
              fallback={<div className="text-center mt-10">Loading...</div>}
            >
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Suspense
          fallback={<div className="text-center mt-10">Loading...</div>}
        >
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <TopRatedProducts />
          </Suspense>
        ),
      },
      { path: "top-rated-products", element: <TopRatedProducts /> },
      { path: "most-sold-products", element: <MostSoldProducts /> },
      { path: "daily-growth", element: <DailyGrowth /> },
      { path: "sales", element: <Sales /> },
      { path: "orders", element: <Orders /> },
      { path: "revenue", element: <Revenue /> },
    ],
  },
]);

// Render
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Suspense
      fallback={<div className="text-center mt-10">Loading App...</div>}
    >
      <RouterProvider router={appRouter} />
    </Suspense>
    <Toaster position="top-center" reverseOrder={false} />
  </Provider>
);
