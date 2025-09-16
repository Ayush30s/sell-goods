import { useSelector } from "react-redux";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  return (
    <footer
      className={`pt-12 mt-20 text-sm transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-gray-300 border-t border-gray-700"
          : "bg-gray-50 text-gray-700 border-t border-gray-200"
      }`}
    >
      <div className="container mx-auto px-5 grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-32">
        {/* Brand & Description */}
        <div>
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            go
            <span className={isDarkMode ? "text-gray-400" : "text-gray-400"}>
              Cart.
            </span>
          </h2>
          <p className="mt-4 max-w-xs">
            Welcome to gocart, your ultimate destination for the latest and
            smartest gadgets. From smartphones and smartwatches to essential
            accessories, we bring you the best in innovation — all in one place.
          </p>
          <div className="flex gap-3 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <Icon
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  />
                </a>
              )
            )}
          </div>
        </div>

        {/* Products */}
        <div>
          <h3
            className={`text-sm font-semibold mb-4 ${
              isDarkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            PRODUCTS
          </h3>
          <ul className="space-y-2">
            {["Earphones", "Headphones", "Smartphones", "Laptops"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`hover:underline ${
                      isDarkMode ? "text-gray-300 hover:text-white" : ""
                    }`}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3
            className={`text-sm font-semibold mb-4 ${
              isDarkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            CONTACT
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-green-500" /> +1-212-456-7890
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-green-500" /> contact@example.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-green-500" /> 794 Francisco,
              94102
            </li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3
            className={`text-sm font-semibold mb-4 ${
              isDarkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            WEBSITE
          </h3>
          <ul className="space-y-2">
            {["Home", "Privacy Policy"].map((link) => (
              <li key={link}>
                <a
                  href={link === "Home" ? "/" : "#"}
                  className={`hover:underline ${
                    isDarkMode ? "text-gray-300 hover:text-white" : ""
                  }`}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div
        className={`mt-10 py-5 text-center text-xs transition-colors duration-300 ${
          isDarkMode
            ? "text-gray-400 border-t border-gray-700"
            : "text-gray-500 border-t border-gray-200"
        }`}
      >
        Copyright {new Date().getFullYear()} © gocart All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
