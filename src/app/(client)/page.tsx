import Loader from "@/components/default/loader/Loader";
import Domestic from "@/components/home/domestic/Domestic";
import HeroSection from "@/components/home/hero/HeroSection";
import International from "@/components/home/international/International";
import SpecialPackages from "@/components/home/special/SpecialPackages";
import Testimonials from "@/components/home/testimonials/Testimonials";
import Trending from "@/components/home/trending/Trending";
import WildLife from "@/components/home/wildlife/WildLife";

export default function Home() {
  return (
    <>
      {/* <Loader /> */}
      <HeroSection />
      <Trending />
      <International />
      <Domestic />
      <WildLife />
      <SpecialPackages />
      <Testimonials />
    </>
  );
}
