import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import LearningSection from "@/components/LearningSection";
import PreviewSection from "@/components/PreviewSection";
import ComparisonChart from "@/components/ComparisonChart";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <LearningSection />
      <PreviewSection />
      <ComparisonChart />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
