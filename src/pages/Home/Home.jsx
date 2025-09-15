import Hero from "./Hero";
import BestSellingProducts from "../Product/BestSelling";
import LatestProducts from "../Product/RecentProducts";
import CategoriesMarquee from "../Product/CategoriesAnimation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CategoriesMarquee />
      <BestSellingProducts />
      <LatestProducts />
      <Footer/>
    </>
  );
};

export default Home;
