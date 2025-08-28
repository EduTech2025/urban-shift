"use client";

import React, { useState } from "react";
import { Search, MessageCircle, User, Bookmark, Menu, X } from "lucide-react";
import Navigation from "./Navigation";
import type { ActionButton as ActionButtonType, NavigationItem } from "@/types";
import Image from "next/image";
// import type { NavigationItem } from "@/types";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative w-32 h-30 sm:w-40 sm:h-40 lg:w-55 lg:h-40">
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

const navigationItems: NavigationItem[] = [
  { label: "Property" },
  { label: "Rentals" },
];

type Props = {
  isMobile?: boolean;
  selectedNav: string;
  onSelectNav: (label: string) => void;
  onClose?: () => void; // ✅ new
};

const NavigationWithSearch = ({
  isMobile = false,
  selectedNav,
  onSelectNav,
  onClose,
}: Props) => {
  const handleSelect = (label: string) => {
    onSelectNav(label);
    if (isMobile && onClose) {
      onClose(); // ✅ close menu when selecting in mobile
    }
  };

  return (
    <div
      className={`${
        isMobile
          ? "flex flex-col space-y-4 w-full"
          : "hidden lg:flex items-center bg-white rounded-full shadow-sm border border-gray-200 px-6 py-2"
      }`}
    >
      {/* Navigation */}
      <div
        className={`flex ${isMobile ? "flex-col space-y-2" : "items-center"}`}
      >
        <Navigation
          items={navigationItems}
          selected={selectedNav}
          onSelect={handleSelect}
        />
      </div>

      {/* Separator */}
      {!isMobile && <div className="h-6 w-px bg-gray-300 mx-4"></div>}

      {/* Search */}
      <div
        className={`flex items-center flex-1 ${
          isMobile
            ? "bg-white rounded-full shadow-sm border border-gray-200 px-4 py-3"
            : ""
        }`}
      >
        
        <Search className="h-4 w-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder={`Search ${selectedNav.toLowerCase()}...`}
          className={`bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 flex-1`}
        />
      </div>
    </div>
  );
};

const ActionButton = ({
  icon,
  label,
  isMobile = false,
}: ActionButtonType & { isMobile?: boolean }) => {
  return (
    <button
      className={`flex cursor-pointer ${
        isMobile
          ? "items-center justify-start space-x-3 w-full py-3 px-4"
          : "flex-col items-center"
      } text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors`}
    >
      <span className={isMobile ? "" : "pb-1"}>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

const HeaderActions = ({ isMobile = false }: { isMobile?: boolean }) => {
  const actions: ActionButtonType[] = [
    {
      icon: <MessageCircle className="h-4 w-4 cursor-pointer" />,
      label: "Contact Us",
    },
    {
      icon: <User className="h-4 w-4 cursor-pointer" />,
      label: "Log In/Sign In",
    },
    { icon: <Bookmark className="h-4 w-4 cursor-pointer" />, label: "Saved" },
  ];

  return (
    <div
      className={`flex cursor-pointer ${
        isMobile
          ? "flex-col space-y-2 w-full border-t border-gray-200 pt-4"
          : "items-center space-x-4 xl:space-x-6"
      }`}
    >
      {actions.map((action) => (
        <ActionButton key={action.label} {...action} isMobile={isMobile} />
      ))}
    </div>
  );
};

const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Mobile menu */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#faf3ee] z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {/* Logo small on mobile */}
          <div className="relative w-28 h-12">
            <Image
              src="/assets/logo.png"
              alt="UrbanShift Capital"
              fill
              className="object-contain"
              priority
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {/* Nav + Search */}
          <NavigationWithSearch
            isMobile
            selectedNav="Property"
            onSelectNav={() => {}}
            onClose={onClose}
          />

          {/* Actions */}
          <HeaderActions isMobile />
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState("Property"); // default

  return (
    <>
      <header className="bg-[#faf3ee] shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation with Search */}
            <NavigationWithSearch
              selectedNav={selectedNav}
              onSelectNav={setSelectedNav}
            />

            {/* Desktop Actions */}
            <div className="hidden lg:flex">
              <HeaderActions />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Tablet Search */}
          <div className="hidden md:block lg:hidden pb-4">
            <NavigationWithSearch
              isMobile
              selectedNav={selectedNav}
              onSelectNav={setSelectedNav}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
