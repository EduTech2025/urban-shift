import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import PropertyGrid from '@/components/sections/PropertyGrid';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <PropertyGrid />
    </div>
  );
}