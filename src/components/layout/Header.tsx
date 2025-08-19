"use client";

import React, { useState } from "react";
import { Search, MessageCircle, User, Bookmark, Menu, X } from "lucide-react";
import Navigation from "./Navigation";
import type { ActionButton as ActionButtonType } from "@/types";
import Image from "next/image";

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

const NavigationWithSearch = ({
  isMobile = false,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) => {
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
        <Navigation />
      </div>

      {/* Vertical Separator - only on desktop */}
      {!isMobile && <div className="h-6 w-px bg-gray-300 mx-4"></div>}

      {/* Search */}
      <div
        className={`flex items-center ${
          isMobile
            ? "bg-white rounded-full shadow-sm border border-gray-200 px-4 py-3"
            : ""
        }`}
      >
        <Search className="h-4 w-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className={`bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 ${
            isMobile ? "w-full" : "w-32"
          }`}
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
      className={`flex ${
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
    { icon: <MessageCircle className="h-5 w-5" />, label: "Contact Us" },
    { icon: <User className="h-5 w-5" />, label: "Log In/Sign In" },
    { icon: <Bookmark className="h-5 w-5" />, label: "Saved" },
  ];

  return (
    <div
      className={`flex ${
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
      <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#faf3ee] z-50 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <NavigationWithSearch isMobile onClose={onClose} />
              <HeaderActions isMobile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[#faf3ee] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-22">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation with Search */}
            <NavigationWithSearch />

            {/* Desktop Actions */}
            <div className="hidden lg:flex">
              <HeaderActions />
            </div>

            {/* Mobile/Tablet Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Tablet Search Bar (visible on md screens only) */}
          <div className="hidden md:block lg:hidden pb-4">
            <div className="bg-white rounded-full shadow-sm border border-gray-200 px-4 py-2">
              <div className="flex items-center">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                />
              </div>
            </div>
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
