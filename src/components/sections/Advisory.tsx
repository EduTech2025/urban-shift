import React from "react";
import type { StatCard } from "@/types";

const statCards: StatCard[] = [
  {
    id: 1,
    number: "100+",
    label: "Satisfied Customer",
    bgColor: "bg-indigo-300/70",
  },
  {
    id: 2,
    number: "50+",
    label: "Award Winning",
    bgColor: "bg-indigo-800",
  },
  {
    id: 3,
    number: "07+",
    label: "Year of Experience",
    bgColor: "bg-indigo-300/70",
  },
  {
    id: 4,
    number: "40+",
    label: "Properties Delivered",
    bgColor: "bg-indigo-300/70",
  },
];

const StatCard = ({ stat }: { stat: StatCard }) => {
  const isHighlighted = stat.bgColor === "bg-indigo-800";

  return (
    <div
      className={`${stat.bgColor} ${
        isHighlighted ? "text-white" : "text-white"
      } rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 xl:p-7 flex flex-col justify-end h-full transition-transform hover:scale-105 shadow-md hover:shadow-lg`}
    >
      <div className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-2 sm:mb-3 leading-none">
        {stat.number}
      </div>
      <div className="text-xs sm:text-sm font-normal leading-tight">
        {stat.label}
      </div>
    </div>
  );
};

const Advisory = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Side - Text and Stats */}
          <div className="order-2 lg:order-1">
            <h2
              className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
              font-bold text-violet-950 
              mb-6 sm:mb-8 lg:mb-10 
              leading-tight
            "
            >
              YOUR TRUSTED REAL ESTATE ADVISORY
            </h2>

            {/* Stats Grid - Mobile: 2x2, Desktop: 2x2 */}
            <div
              className="
              grid grid-cols-2 
              gap-3 sm:gap-4 md:gap-6 lg:gap-8 
              h-48 sm:h-56 md:h-64 lg:h-80
            "
            >
              {statCards.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>
          </div>

          {/* Right Side - Images and Description */}
          <div className="order-1 lg:order-2">
            {/* Description Text - Mobile first */}
            <div className="mb-6 sm:mb-8 lg:mb-0 lg:order-1">
              <p
                className="
                text-slate-600 lg:text-slate-400 
                text-sm sm:text-base lg:text-md 
                leading-relaxed
                text-center lg:text-left
              "
              >
                We guide you through every step of your property journey with
                expertise and integrity. From prime locations to the best
                investment opportunities, we ensure you make confident,
                well-informed decisions. Your dream property is our mission, and
                we`&apos;`re here to make it a reality.
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:order-2 lg:mt-8">
              {/* Large Image - Full width on mobile, spans 2 cols on larger */}
              {/* <div
                className="
                sm:col-span-2 
                h-32 sm:h-40 lg:h-48 
                rounded-lg sm:rounded-xl lg:rounded-2xl 
                overflow-hidden
                shadow-md hover:shadow-lg transition-shadow
              "
              >
                <div
                  className="w-full h-full relative bg-gray-200"
                  style={{
                    backgroundImage: `url('/assets/advisory1.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div> */}

              {/* Bottom Images - Stacked on mobile, side by side on larger */}
              <div className="flex flex-col gap-5 sm:gap-6">
                <div
                className="
                h-28 sm:h-32 lg:h-40 
                rounded-lg sm:rounded-xl lg:rounded-2xl 
                overflow-hidden
                shadow-md hover:shadow-lg transition-shadow
              "
              >
                <div
                  className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600"
                  style={{
                    backgroundImage: `url('/assets/advisory4.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
              <div
                className="
                h-28 sm:h-32 lg:h-40 
                rounded-lg sm:rounded-xl lg:rounded-2xl 
                overflow-hidden
                shadow-md hover:shadow-lg transition-shadow
              "
              >
                <div
                  className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600"
                  style={{
                    backgroundImage: `url('/assets/advisory2.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>

              </div>
              <div
                className="
                h-28 sm:h-32 lg:h-64 xl:h-96 
                rounded-lg sm:rounded-xl lg:rounded-2xl 
                overflow-hidden
                shadow-md hover:shadow-lg transition-shadow
              "
              >
                <div
                  className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600"
                  style={{
                    backgroundImage: `url('/assets/advisory3.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advisory;
