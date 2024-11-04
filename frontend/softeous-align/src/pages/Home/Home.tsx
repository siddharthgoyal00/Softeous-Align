import { Cards } from "../../components/Cards";
import { HeroSection } from "../../components/HeroSection";
import { Navbar } from "../../components/Navbar";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
    
     <HeroSection></HeroSection>
     <Cards></Cards>
  </div>
  );
};
