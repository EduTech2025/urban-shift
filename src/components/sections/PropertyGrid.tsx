import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Image from 'next/image';
import type { Property } from '@/types';

const properties: Property[] = [
  {
    id: 1,
    gradient: "from-blue-400 to-blue-600",
    image: "/assets/build1.jpg",
    title: "Golf Course Road and Extension",
    description: "Premium urban developments"
  },
  {
    id: 2,
    gradient: "from-amber-400 to-orange-500",
    image: "/assets/build2.jpg",
    title: "Sohna Road",
    description: "Family-friendly communities"
  },
  {
    id: 3,
    gradient: "from-purple-400 to-indigo-600",
    image: "/assets/build3.jpg",
    title: "Nirvana Country",
    description: "Panoramic urban views"
  },
  {
    id: 4,
    gradient: "from-green-400 to-teal-600",
    image: "/assets/build4.jpg",
    title: "DLF City Phase 1-5 MG Road",
    description: "Premium properties"
  }
];

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <Card hover className="group overflow-hidden">
      <CardHeader className="h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/40 z-10" />
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20" />
      </CardHeader>
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {property.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {property.description}
        </p>
      </CardContent>
    </Card>
  );
};

const PropertyGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of urban properties designed for modern living
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;