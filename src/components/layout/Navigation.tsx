import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { NavigationItem } from '@/types';

const navigationItems: NavigationItem[] = [
  { label: 'Property', hasDropdown: true },
  { label: 'Rentals', hasDropdown: true }
];

const NavigationItem = ({ item }: { item: NavigationItem }) => {
  return (
    <div className="relative group">
      <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition-colors cursor-pointer">
        {item.label}
        {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
      </button>
    </div>
  );
};

const Navigation = () => {
  return (
    <nav className="hidden md:flex space-x-8">
      {navigationItems.map((item) => (
        <NavigationItem key={item.label} item={item} />
      ))}
    </nav>
  );
};

export default Navigation;