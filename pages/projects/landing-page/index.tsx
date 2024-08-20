import CallToAction from "@/components/LandingPage/CallToAction";
import Footer from "@/components/LandingPage/Footer";
import LandingHero from "@/components/LandingPage/Hero";
import Main from "@/components/LandingPage/Main";
import LandingPageNavbar from "@/components/LandingPage/Navbar";
import Quote from "@/components/LandingPage/Quote";

const LandingPage = () => {
  return (
    <div>
      <LandingPageNavbar />
      <LandingHero />
      <Main />
      <Quote />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
