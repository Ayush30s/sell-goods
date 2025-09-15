import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CiLight, CiDark, CiMenuBurger } from "react-icons/ci";
import {
  HiOutlineShoppingCart,
  HiOutlineViewGrid,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LogoutThunk } from "../store/thunk/auth-management";
import { chnageTheme } from "../store/actions/global";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const { user } = useSelector((store) => store.auth);
  const cartItems = useSelector((store) => store.cart.items || []);

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);

  const handleLogout = async () => {
    try {
      dispatch(LogoutThunk());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed, try again!");
      console.error(error);
    }
  };

  const handleThemeChange = () => dispatch(chnageTheme());

  // Navigation links
  const navLinks = [{ name: "Home", path: "/" }];
  if (user?.role === "admin")
    navLinks.push({ name: "Dashboard", path: "/admin-dashboard" });

  const userLinks = [
    {
      name: "Logout",
      action: handleLogout,
      icon: <FiLogOut className="mr-2 text-red-600" />,
    },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-white border-b transition-all duration-300">
      <nav className="container mx-auto px-5 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          className="text-2xl font-bold text-green-600 tracking-tight"
          to="/"
        >
          Only<span className="text-gray-800">Cart</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 relative">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? "text-green-600 underline underline-offset-4"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowProductMenu(true)}
            onMouseLeave={() => setShowProductMenu(false)}
          >
            <span
              className={`font-medium cursor-pointer transition-all duration-200 ${
                location.pathname.startsWith("/products")
                  ? "text-green-600 underline underline-offset-4"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Products
            </span>

            {showProductMenu && (
              <div className="absolute top-full left-0 mt-0 w-52 bg-white border rounded-sm shadow-lg z-50">
                <Link
                  to="/products"
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition"
                >
                  <HiOutlineViewGrid className="mr-2" /> All Products
                </Link>
                <Link
                  to="/add-product"
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition"
                >
                  <HiOutlinePlusCircle className="mr-2" /> Add Product
                </Link>
                <Link
                  to="/my-products"
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition"
                >
                  <HiOutlineViewGrid className="mr-2" /> My Products
                </Link>
              </div>
            )}
          </div>

          {/* Cart (only for non-admin users) */}
          {user?.role !== "admin" && (
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-green-300 px-3 py-2 rounded-full transition hover:bg-green-400"
            >
              <span className="text-gray-700 font-medium">Cart</span>
              <HiOutlineShoppingCart size={22} className="text-gray-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 relative">
          {/* Theme Toggle */}
          <button
            className="p-1 rounded-full bg-slate-100 transition hover:bg-slate-200"
            onClick={handleThemeChange}
          >
            {isDarkMode ? (
              <CiLight size={22} className="text-yellow-400" />
            ) : (
              <CiDark size={22} className="text-gray-700" />
            )}
          </button>

          {/* Desktop User Menu */}
          <div
            className="relative hidden md:flex items-center gap-2"
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-gray-700 bg-green-300 py-2 px-3 rounded-full font-medium truncate max-w-[120px]">
                {user ? (
                  <div className="flex flex-row gap-2">
                    <FaUserCircle size={28} className="text-gray-700" />
                    <span>
                      {user?.email.slice(0, user?.email.indexOf("@")) ||
                        user?.name}
                    </span>
                  </div>
                ) : (
                  "Menu"
                )}
              </span>
            </div>

            {showUserMenu && (
              <div className="absolute top-full right-0 mt-1 w-52 bg-white border rounded-sm shadow-lg flex flex-col z-50">
                {user && (
                  <div className="px-4 py-3 border-b text-gray-700 text-sm font-medium">
                    {user?.email}
                  </div>
                )}

                {user &&
                  userLinks.map((link, i) =>
                    link.action ? (
                      <button
                        key={i}
                        onClick={link.action}
                        className="px-4 py-3 text-sm text-red-600 hover:bg-red-100 flex items-center transition"
                      >
                        {link.icon} {link.name}
                      </button>
                    ) : (
                      <Link
                        key={i}
                        to={link.path}
                        className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition"
                      >
                        {link.icon} {link.name}
                      </Link>
                    )
                  )}

                {!user && (
                  <div className="flex flex-col mt-0 rounded-sm">
                    <Link
                      to="/login"
                      className="px-4 py-3 text-gray-800 hover:bg-gray-100 transition text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-3 text-gray-800 hover:bg-gray-100 transition text-center"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-600 hover:text-green-600 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <CiMenuBurger size={28} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col md:hidden rounded-b-xl p-4 gap-2 z-50">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={`px-4 py-2 rounded-xl transition font-medium ${
                  location.pathname === link.path
                    ? "text-green-600 bg-green-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col">
              <span className="px-4 font-medium text-gray-700">Products</span>
              <Link
                to="/products"
                className="px-6 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <HiOutlineViewGrid className="mr-2" /> All Products
              </Link>
              <Link
                to="/add-product"
                className="px-6 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <HiOutlinePlusCircle className="mr-2" /> Add Product
              </Link>
              <Link
                to="/my-products"
                className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition"
              >
                <HiOutlineViewGrid className="mr-2" /> My Products
              </Link>
            </div>

            {/* Cart (hidden for admin) */}
            {user?.role !== "admin" && (
              <Link
                to="/cart"
                className="relative flex items-center gap-2 bg-green-300 px-3 py-2 rounded-full transition hover:bg-green-400"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-gray-700 font-medium">Cart</span>
                <HiOutlineShoppingCart size={22} className="text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
