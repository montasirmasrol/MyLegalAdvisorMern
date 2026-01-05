import AboutUsSection from "../../Components/Home/AboutUs/AboutUsSection";
import Banner from "../../Components/Home/Banner/Banner";
import ClientServe from "../../Components/Home/ClientsServe/ClientServe";
import GuidanceProcess from "../../Components/Home/Guidence/GuidenceProcess";
import LatestBlogSection from "../../Components/Home/LatestBlog/LatestBlogSection";
import ServicesSection from "../../Components/Home/Services/ServicesSection";
import TeamSection from "../../Components/Home/SpecialTeam/TeamSection";
import StatsSection from "../../Components/Home/Stats/StatsSection";
import Testimonials from "../../Components/Home/Testimonials/Testimonials";

const Home = () => {
  return (
    <div className=" mb-56">
      <Banner />
      <AboutUsSection />
      <ServicesSection />
      <ClientServe />
      <Testimonials />
      <TeamSection />
      <StatsSection />
      <GuidanceProcess/>
      <LatestBlogSection />
    </div>
  );
};

export default Home;
