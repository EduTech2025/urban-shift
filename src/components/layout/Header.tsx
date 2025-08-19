import React from "react";
import { Search, MessageCircle, User, Bookmark } from "lucide-react";
import Navigation from "./Navigation";
import type { ActionButton as ActionButtonType } from "@/types";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative w-55 h-40">
        <Image
          src="/assets/logo.png"
          alt="UrbanShift Capital"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

const NavigationWithSearch = () => {
  return (
    <div className="hidden md:flex items-center bg-white rounded-full shadow-sm border border-gray-200 px-6 py-2">
      {/* Navigation */}
      <div className="flex items-center">
        <Navigation />
      </div>

      {/* Vertical Separator */}
      <div className="h-6 w-px bg-gray-300 mx-4"></div>

      {/* Search */}
      <div className="flex items-center">
        <Search className="h-4 w-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-32"
        />
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }: ActionButtonType) => {
  return (
    <button className="flex flex-col items-center text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors">
      <span className="pb-1">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

const HeaderActions = () => {
  const actions: ActionButtonType[] = [
    { icon: <MessageCircle className="h-5 w-5" />, label: "Contact Us" },
    { icon: <User className="h-5 w-5" />, label: "Log In/Sign In" },
    { icon: <Bookmark className="h-5 w-5" />, label: "Saved" },
  ];

  return (
    <div className="flex items-center space-x-6">
      {actions.map((action) => (
        <ActionButton key={action.label} {...action} />
      ))}
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-[#faf3ee] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          <Logo />
          <NavigationWithSearch />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
};

export default Header;
