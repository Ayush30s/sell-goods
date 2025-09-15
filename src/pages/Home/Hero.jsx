import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="mx-auto px-5 py-12 mt-14 flex flex-col gap-12 max-w-7xl">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Big Card */}
        <div className="col-span-2 bg-gradient-to-br from-pink-50 via-yellow-50 to-green-50 rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <span className="bg-yellow-200/40 text-sm font-semibold px-3 py-1 rounded-full text-yellow-800">
              NEW ARRIVALS
            </span>
            <span className="ml-2 text-sm text-gray-700">
              Free Shipping on Orders Above $50
            </span>
            <h2 className="text-4xl font-extrabold mt-4 leading-snug">
              Find Your <span className="text-pink-700">Favorites</span>
              <br />
              From <span className="text-green-700">Home</span> to{" "}
              <span className="text-blue-700">Lifestyle</span>
            </h2>
            <p className="mt-4 text-lg text-gray-800">
              Deals starting at{" "}
              <span className="font-bold text-2xl text-gray-900">$4.90</span>
            </p>
            <button className="mt-6 px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 shadow-sm transition">
              Browse Collection
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Shopping_bags.png"
              alt="Shopping Collection"
              className="max-h-72 object-contain"
            />
          </div>
        </div>

        {/* Right Small Cards */}
        <div className="flex flex-col gap-6">
          {[
            {
              bg: "bg-gradient-to-br from-purple-50 to-purple-100",
              img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Fashion_shoes.png",
              title: "Trending Fashion",
              linkState: { from: "homepage", promo: true, tab: "Fashion" },
            },
            {
              bg: "bg-gradient-to-br from-blue-50 to-blue-100",
              img: "https://upload.wikimedia.org/wikipedia/commons/8/85/Decorative_vase.png",
              title: "Home Essentials",
              linkState: { from: "homepage", promo: true, tab: "Home" },
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`${card.bg} rounded-lg p-6 flex flex-col items-center justify-center text-center`}
            >
              <img
                src={card.img}
                alt={card.title}
                className="h-28 w-auto object-contain mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
              <Link
                to="/products"
                state={card.linkState}
                className="mt-2 text-sm text-gray-700 hover:text-gray-900"
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
