import React from "react";
import { ChevronDown } from "lucide-react";
import type { NavigationItem } from "@/types";

type Props = {
  items: NavigationItem[];
  selected: string;
  onSelect: (label: string) => void;
};

const Navigation = ({ items, selected, onSelect }: Props) => {
  return (
    <nav className="hidden md:flex space-x-8">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => onSelect(item.label)}
          className={`relative group text-sm font-medium transition-colors px-3 py-2 
            ${
              selected === item.label
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
        >
          {item.label}
          {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
