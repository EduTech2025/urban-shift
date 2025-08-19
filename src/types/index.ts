export interface Property {
  id: number;
  title: string;
  image: string;
  description: string;
  gradient: string;
}

export interface NavigationItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

export interface ActionButton {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}