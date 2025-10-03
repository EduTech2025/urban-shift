import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Advisory from '@/components/sections/Advisory';
import Hero from '@/components/sections/Hero';
import PropertyFilterSection from '@/components/sections/PropertyFilterSection';
import PropertyGrid from '@/components/sections/PropertyGrid';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <PropertyFilterSection />
      <Advisory />
      <PropertyGrid />
      <Footer />
    </div>
  );
}