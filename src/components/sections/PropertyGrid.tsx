import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import type { Property } from "@/types";

const properties: Property[] = [
  {
    id: 1,
    gradient: "from-blue-400 to-blue-600",
    image: "/assets/build1.jpg",
    title: "Golf Course Road and Extension",
    description: "Premium urban developments",
  },
  {
    id: 2,
    gradient: "from-amber-400 to-orange-500",
    image: "/assets/build2.jpg",
    title: "Sohna Road",
    description: "Family-friendly communities",
  },
  {
    id: 3,
    gradient: "from-purple-400 to-indigo-600",
    image: "/assets/build3.jpg",
    title: "Nirvana Country",
    description: "Panoramic urban views",
  },
  {
    id: 4,
    gradient: "from-green-400 to-teal-600",
    image: "/assets/build4.jpg",
    title: "DLF City Phase 1-5 MG Road",
    description: "Premium properties",
  },
];

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <Card
      hover
      className="group overflow-hidden h-full transition-all duration-300 hover:shadow-xl"
    >
      <CardHeader
        className="
        h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52
        relative overflow-hidden
      "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/40 z-10" />
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20" />
      </CardHeader>
      <CardContent
        className="
        pt-3 sm:pt-4 
        px-3 sm:px-4 lg:px-6 
        pb-4 sm:pb-5 lg:pb-6
        flex-1 flex flex-col
      "
      >
        <h3
          className="
          text-sm sm:text-base lg:text-lg 
          font-semibold text-gray-900 
          mb-1 sm:mb-2 
          leading-tight
          line-clamp-2
        "
        >
          {property.title}
        </h3>
        <p
          className="
          text-gray-600 
          text-xs sm:text-sm 
          leading-relaxed
          flex-1
          line-clamp-2 sm:line-clamp-3
        "
        >
          {property.description}
        </p>
      </CardContent>
    </Card>
  );
};

const PropertyGrid = () => {
  return (
    <section
      className="
      py-8 sm:py-12 md:py-16 lg:py-20 
      bg-gray-50
    "
    >
      <div
        className="
        max-w-7xl mx-auto 
        px-3 sm:px-4 md:px-6 lg:px-8
      "
      >
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2
            className="
            text-xl sm:text-2xl md:text-3xl lg:text-4xl 
            font-bold text-gray-900 
            mb-2 sm:mb-3 md:mb-4
            leading-tight
          "
          >
            Featured Properties
          </h2>
          <p
            className="
            text-gray-600 
            text-sm sm:text-base 
            max-w-xl sm:max-w-2xl 
            mx-auto
            leading-relaxed
            px-4 sm:px-0
          "
          >
            Discover our premium selection of urban properties designed for
            modern living
          </p>
        </div>

        {/* Properties Grid */}
        <div
          className="
          grid 
          grid-cols-1 
          xs:grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8
        "
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PropertyGrid;
