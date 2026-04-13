import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import DualBrandSection from "@/components/landing/DualBrandSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import TrustSection from "@/components/landing/TrustSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <HeroSection />
    <DualBrandSection />
    <FeaturesSection />
    <TestimonialsSection />
    <TrustSection />
    <PricingSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
