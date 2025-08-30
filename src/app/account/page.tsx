"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, User, Mail, Phone, UserCircle } from "lucide-react";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    console.log("User data:", user);
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#faf3ee] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  const userData = user?.user || user;

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0)?.toUpperCase() || "";
    const last = lastName?.charAt(0)?.toUpperCase() || "";
    return first + last || userData.username?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <div className="min-h-screen bg-[#faf3ee] py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* User Details Card */}
        <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-semibold text-gray-700">
                {getInitials(userData.first_name, userData.last_name)}
              </span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              Account Details
            </h1>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Name
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {userData.first_name && userData.last_name
                    ? `${userData.first_name} ${userData.last_name}`
                    : userData.first_name || userData.username}
                </p>
              </div>
            </div>

            {/* Username */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Username
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {userData.username}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Email
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {userData.email}
                </p>
              </div>
            </div>

            {/* Phone Number */}
            {userData.phone_number && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {userData.phone_number}
                  </p>
                </div>
              </div>
            )}

            {/* User ID */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">#</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  User ID
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {userData.id}
                </p>
              </div>
            </div>
          </div>

          {/* Home Button */}
          <div className="mt-8">
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
