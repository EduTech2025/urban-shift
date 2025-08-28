export interface Property {
  id: number;
  title: string;
  image: string;
  description: string;
  gradient: string;
}

export interface PropertyFilters {
  property_id: number;
  main_image: string;
  show_images?: string[];
  title: string;
  description?: string;
  subtitle?: string;
  location: string;
  location_map?: string;
  price: number;
  price_unit: 'Lakhs' | 'Crores' | 'Thousand';
  propertyType: 'Residential Apartment' | 'Commercial' | 'Working Space' | 'Rental' | 'Affordables' | 'Independent Villa' | 'Penthouse';
  in_sector: boolean;
  size?: number;
  size_unit?: string;
  bhk_rk: '1BHK' | '2BHK' | '3BHK' | '4BHK' | '5BHK' | 'RK';
  has_parking_space: boolean;
  furnishing?: 'Furnished' | 'Unfurnished' | 'Semi-Furnished';
  availability: 'Ready to Move' | 'Under Construction';
  is_featured: boolean;
}

export interface PropertyDetailModalProps {
  property: PropertyFilters;
  isOpen: boolean;
  onClose: () => void;
  onSaveProperty?: (propertyId: number) => void;
  isSaved?: boolean;
}

export interface NavigationItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

export interface ActionButtonType {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  requiresAuth?: boolean;
}

export interface ActionButtonProps extends ActionButtonType {
  isMobile?: boolean;
}

// Add these to your existing types
export interface LocationCard {
  id: number;
  title: string;
  image: string;
  gradient: string;
}

export interface StatCard {
  id: number;
  number: string;
  label: string;
  bgColor: string;
}

export interface Filters {
  price: number;
  location: string[]; // This explicitly types location as string[]
  propertyType: string[];
  areaSize: number;
  bhk: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
