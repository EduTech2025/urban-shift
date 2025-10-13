"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, FileText, UserCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Your privacy matters to us. Learn how Unshift Capitals collects, uses, and protects your
            personal information.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Introduction */}
          <div>
            <h2 className="text-3xl font-bold text-sky-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to <strong>Unshift Capitals</strong>. This Privacy Policy explains how we
              collect, use, and protect your personal data when you visit our website or engage with
              our services. By accessing our website, you agree to the terms outlined in this
              policy.
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-sky-600" />
              <h2 className="text-2xl font-semibold text-sky-900">
                2. Information We Collect
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We may collect personal and non-personal information such as:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Full name, email address, and phone number.</li>
              <li>Property preferences or search criteria.</li>
              <li>IP address, browser type, and device information.</li>
              <li>Communication and inquiry records through forms or chat.</li>
            </ul>
          </div>

          {/* How We Use the Information */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-sky-600" />
              <h2 className="text-2xl font-semibold text-sky-900">
                3. How We Use Your Information
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The information we collect is used for the following purposes:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>To respond to inquiries and provide customer support.</li>
              <li>To improve our website, services, and user experience.</li>
              <li>To send property updates, promotional offers, or newsletters.</li>
              <li>To comply with legal obligations and prevent fraud.</li>
            </ul>
          </div>

          {/* Data Protection */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-6 h-6 text-sky-600" />
              <h2 className="text-2xl font-semibold text-sky-900">
                4. Data Protection and Security
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We implement robust security measures to protect your personal data from unauthorized
              access, alteration, or disclosure. However, please note that no online system is 100%
              secure, and we cannot guarantee absolute protection.
            </p>
          </div>

          {/* Data Sharing */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <UserCheck className="w-6 h-6 text-sky-600" />
              <h2 className="text-2xl font-semibold text-sky-900">
                5. Sharing Your Information
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, rent, or trade your personal information. We may share limited data
              only with trusted third parties who help us operate our business — such as payment
              processors, legal advisors, or marketing services — under strict confidentiality
              agreements.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-2xl font-semibold text-sky-900 mb-3">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may use cookies to enhance your browsing experience. Cookies help us
              understand user behavior, remember preferences, and improve content relevance. You can
              disable cookies in your browser settings at any time.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-2xl font-semibold text-sky-900 mb-3">
              7. Your Data Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, or request deletion of your personal
              information. To exercise these rights, please contact us at{" "}
              <a
                href="mailto:urbanshiftcapital@gmail.com"
                className="text-sky-600 font-medium hover:underline"
              >
                urbanshiftcapital@gmail.com
              </a>
              .
            </p>
          </div>

          {/* Updates */}
          <div>
            <h2 className="text-2xl font-semibold text-sky-900 mb-3">
              8. Policy Updates
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Unshift Capitals reserves the right to update or modify this Privacy Policy at any
              time. Any significant changes will be reflected on this page with an updated
              “Effective Date.”
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold text-sky-900 mb-3">
              9. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns regarding this Privacy Policy, please contact
              us at:
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:urbanshiftcapital@gmail.com"
                className="text-sky-600 font-medium hover:underline"
              >
                urbanshiftcapital@gmail.com
              </a>
              <br />
              <strong>Address:</strong> 2516, DLF Phase 4 Sec 28 , Near Cross Point Mall, Gurugram,
            </p>
          </div>
        </div>
      </section>
 </main>
  );
}
