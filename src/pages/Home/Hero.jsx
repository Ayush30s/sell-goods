import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  return (
    <section
      className={`container mx-auto pb-10 flex flex-col gap-12 max-w-7xl px-4 sm:px-6 transition-colors duration-500`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Big Card */}
        <div
          className={`lg:col-span-2 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 transition-colors duration-500 ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"
              : "bg-gradient-to-br from-pink-50 via-yellow-50 to-green-50"
          }`}
        >
          <div className="flex-1 text-center md:text-left">
            <span
              className={`inline-block text-sm font-semibold px-3 py-1 rounded-full mb-2 ${
                isDarkMode
                  ? "bg-yellow-600/30 text-yellow-300"
                  : "bg-yellow-200/40 text-yellow-800"
              }`}
            >
              NEW ARRIVALS
            </span>
            <p
              className={`text-sm mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Free Shipping on Orders Above $50
            </p>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold leading-snug mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Find Your{" "}
              <span className="text-pink-600 dark:text-pink-400">
                Favorites
              </span>
              <br />
              From{" "}
              <span className="text-green-700 dark:text-green-400">
                Home
              </span>{" "}
              to{" "}
              <span className="text-blue-700 dark:text-blue-400">
                Lifestyle
              </span>
            </h2>
            <p
              className={`text-lg mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Deals starting at{" "}
              <span
                className={`font-bold text-2xl ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                $4.90
              </span>
            </p>
            <button className="px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 shadow-sm transition w-full md:w-auto">
              Browse Collection
            </button>
          </div>
          <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Shopping_bags.png"
              alt="Shopping Collection"
              className="max-h-56 sm:max-h-72 w-auto object-contain"
            />
          </div>
        </div>

        {/* Right Small Cards */}
        <div className="flex flex-col gap-6">
          {[
            {
              lightBg: "bg-gradient-to-br from-purple-50 to-purple-100",
              darkBg: "bg-gradient-to-br from-gray-700 to-gray-800",
              img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Fashion_shoes.png",
              title: "Trending Fashion",
              linkState: { from: "homepage", promo: true, tab: "Fashion" },
            },
            {
              lightBg: "bg-gradient-to-br from-blue-50 to-blue-100",
              darkBg: "bg-gradient-to-br from-gray-700 to-gray-800",
              img: "https://upload.wikimedia.org/wikipedia/commons/8/85/Decorative_vase.png",
              title: "Home Essentials",
              linkState: { from: "homepage", promo: true, tab: "Home" },
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors duration-500 ${
                isDarkMode ? card.darkBg : card.lightBg
              }`}
            >
              <img
                src={card.img}
                alt={card.title}
                className="h-24 sm:h-28 w-auto object-contain mb-4"
              />
              <h3
                className={`text-lg sm:text-xl font-bold mb-2 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {card.title}
              </h3>
              <Link
                to="/products"
                state={card.linkState}
                className={`text-sm font-medium transition ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Shop Now →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
