import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-12 border-t mt-20 text-sm text-gray-700">
      <div className="container mx-auto px-5 grid md:grid-cols-4 sm:grid-cols-2 gap-32">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-600">
            go<span className="text-gray-900">cart.</span>
          </h2>
          <p className="mt-4 max-w-xs">
            Welcome to gocart, your ultimate destination for the latest and
            smartest gadgets. From smartphones and smartwatches to essential
            accessories, we bring you the best in innovation — all in one place.
          </p>
          <div className="flex gap-3 mt-6">
            <a
              href="#"
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-900">PRODUCTS</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Earphones
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Headphones
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Smartphones
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Laptops
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-900">CONTACT</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-green-600" /> +1-212-456-7890
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-green-600" /> contact@example.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-green-600" /> 794 Francisco,
              94102
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-900">WEBSITE?</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t mt-10 py-5 text-center text-gray-500 text-xs">
        Copyright {new Date().getFullYear()} © gocart All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
