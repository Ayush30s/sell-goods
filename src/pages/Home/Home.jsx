import Hero from "./Hero";
import BestSellingProducts from "../Product/BestSelling";
import LatestProducts from "../Product/RecentProducts";
import CategoriesMarquee from "../Product/CategoriesAnimation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div className="mx-auto max-w-7xl ">
      <Hero />
      <CategoriesMarquee />
      <BestSellingProducts />
      <CategoriesMarquee />
      <LatestProducts />
      <Footer />
    </div>
  );
};

export default Home;
