import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`sticky top-0 border-b border-gray-500 w-full z-50 transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      } ${scrolled ? "shadow-md" : ""}`}
    >
      <nav className="container mx-auto px-5 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          className="text-2xl font-bold text-green-600 tracking-tight"
          to="/"
        >
          Only
          <span className={`${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
            Cart
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 relative">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`px-3 py-2 rounded-md font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? "font-bold text-green-600 underline underline-offset-4"
                  : "hover:text-green-600"
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
              className={`px-3 py-2 rounded-md font-medium cursor-pointer transition-colors duration-300 ${
                location.pathname.startsWith("/products")
                  ? "font-bold text-green-600 underline underline-offset-4"
                  : "hover:text-green-600"
              }`}
            >
              Products
            </span>

            {showProductMenu && (
              <div
                className={`absolute top-full left-0 mt-2 w-56 rounded-md shadow-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <Link
                  to="/products"
                  className="px-4 py-3 text-sm flex items-center hover:text-green-600"
                >
                  <HiOutlineViewGrid className="mr-2" /> All Products
                </Link>

                {/* Add Product only for admin */}
                {user?.role === "admin" && (
                  <Link
                    to="/add-product"
                    className="px-4 py-3 text-sm flex items-center hover:text-green-600"
                  >
                    <HiOutlinePlusCircle className="mr-2" /> Add Product
                  </Link>
                )}

                <Link
                  to="/my-products"
                  className="px-4 py-3 text-sm flex items-center hover:text-green-600"
                >
                  <HiOutlineViewGrid className="mr-2" /> My Products
                </Link>
              </div>
            )}
          </div>

          {/* Cart */}
          {user?.role !== "admin" && (
            <Link
              to="/cart"
              className={`relative flex items-center gap-2 px-3 py-2 rounded-md font-medium ${
                location.pathname === "/cart"
                  ? "font-bold text-green-600 underline underline-offset-4"
                  : "hover:text-green-600"
              }`}
            >
              <span>Cart</span>
              <HiOutlineShoppingCart size={20} />
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
            className={`p-2 rounded-full border border-gray-400 transition-colors duration-300  ${
              isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
            }`}
            onClick={handleThemeChange}
          >
            {isDarkMode ? (
              <CiLight size={20} className="text-yellow-400" />
            ) : (
              <CiDark size={20} className="text-gray-400" />
            )}
          </button>

          {/* Desktop User Menu */}
          <div
            className="relative hidden md:flex items-center gap-2"
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <div className="flex items-center border border-gray-400 gap-2 cursor-pointer px-3 py-2 rounded-full hover:text-green-600">
              <FaUserCircle size={22} />
              <span className="font-medium truncate max-w-[120px]">
                {user
                  ? user?.email.slice(0, user?.email.indexOf("@")) || user?.name
                  : "Menu"}
              </span>
            </div>

            {showUserMenu && (
              <div
                className={`absolute top-full right-0 mt-2 w-56 rounded-md shadow-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                {user && (
                  <div className="px-4 py-3 border-b text-sm font-medium">
                    {user?.email}
                  </div>
                )}
                {user &&
                  userLinks.map((link, i) =>
                    link.action ? (
                      <button
                        key={i}
                        onClick={link.action}
                        className="w-full text-left px-4 py-3 text-sm flex items-center hover:text-green-600"
                      >
                        {link.icon} {link.name}
                      </button>
                    ) : (
                      <Link
                        key={i}
                        to={link.path}
                        className="px-4 py-3 text-sm flex items-center hover:text-green-600"
                      >
                        {link.icon} {link.name}
                      </Link>
                    )
                  )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <CiMenuBurger size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden flex flex-col gap-2 px-5 py-4 ${
            isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white"
          }`}
        >
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                location.pathname === link.path
                  ? "font-bold text-green-600 underline underline-offset-4"
                  : "hover:text-green-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Products */}
          <div className="flex flex-col">
            <span className="px-4 font-medium">Products</span>
            <Link
              to="/products"
              className="px-6 py-2 text-sm flex items-center hover:text-green-600"
              onClick={() => setIsOpen(false)}
            >
              <HiOutlineViewGrid className="mr-2" /> All Products
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/add-product"
                className="px-6 py-2 text-sm flex items-center hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                <HiOutlinePlusCircle className="mr-2" /> Add Product
              </Link>
            )}
            <Link
              to="/my-products"
              className="px-6 py-2 text-sm flex items-center hover:text-green-600"
              onClick={() => setIsOpen(false)}
            >
              <HiOutlineViewGrid className="mr-2" /> My Products
            </Link>
          </div>

          {/* Cart */}
          {user?.role !== "admin" && (
            <Link
              to="/cart"
              className={`relative flex items-center gap-2 px-3 py-2 rounded-md ${
                location.pathname === "/cart"
                  ? "font-bold text-green-600 underline underline-offset-4"
                  : "hover:text-green-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>Cart</span>
              <HiOutlineShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute left-20 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}

          {/* Mobile User */}
          <div className="flex flex-col mt-2 border-t pt-2">
            {user ? (
              <>
                <span className="px-4 py-2 text-sm font-medium">
                  {user?.email}
                </span>
                {userLinks.map((link, i) =>
                  link.action ? (
                    <button
                      key={i}
                      onClick={() => {
                        link.action();
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 text-sm flex items-center text-red-600 hover:text-green-600"
                    >
                      {link.icon} {link.name}
                    </button>
                  ) : (
                    <Link
                      key={i}
                      to={link.path}
                      className="px-4 py-2 text-sm flex items-center hover:text-green-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon} {link.name}
                    </Link>
                  )
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
