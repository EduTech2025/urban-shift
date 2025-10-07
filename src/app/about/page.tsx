"use client";

import { motion } from "framer-motion";
import { Building2, Globe2, Users2, Home } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sky-900 to-sky-600 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            About <span className="text-sky-300">Unshift Capitals</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Redefining real estate with trust, innovation, and smart investments that inspire
            growth and elevate lifestyles.
          </motion.p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#fffaf0]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-6">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            <strong>Unshift Capitals</strong> is a forward-thinking real estate firm dedicated to
            creating premium residential and commercial spaces. We combine industry expertise,
            data-driven insights, and a client-first approach to deliver unmatched value and
            satisfaction.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-sky-500 hover:shadow-2xl transition">
            <Building2 className="w-10 h-10 text-sky-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2 text-sky-900">Premium Properties</h3>
            <p className="text-gray-600">
              We handpick properties that combine modern architecture, functionality, and value —
              designed to inspire.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-sky-500 hover:shadow-2xl transition">
            <Globe2 className="w-10 h-10 text-sky-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2 text-sky-900">Smart Investments</h3>
            <p className="text-gray-600">
              Our market intelligence helps clients identify high-growth opportunities and secure
              sustainable returns.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-sky-500 hover:shadow-2xl transition">
            <Users2 className="w-10 h-10 text-sky-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2 text-sky-900">Trusted Expertise</h3>
            <p className="text-gray-600">
              Guided by ethics and experience, our experts ensure every transaction is smooth,
              transparent, and rewarding.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-sky-900 text-white px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <Home className="w-10 h-10 text-sky-300 mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-blue-100 leading-relaxed">
              To empower individuals and organizations with smarter, more accessible real estate
              solutions through transparency, innovation, and integrity.
            </p>
          </div>
          <div>
            <Globe2 className="w-10 h-10 text-sky-300 mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-blue-100 leading-relaxed">
              To be recognized globally as a brand that builds communities where comfort,
              technology, and design coexist beautifully.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
