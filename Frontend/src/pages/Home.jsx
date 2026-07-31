import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero"
import Categories from "../components/Catagories/Categories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
       <WhyChooseUs />
       <Footer />
    </>
  );
};

export default Home;