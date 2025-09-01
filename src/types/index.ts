export interface Property {
  property_id: number;
  main_image: string;
  show_image?: string[];
  title: string;
  description?: string;
  subtitle?: string;
  location: string;
  location_map?: string;
  price: number;
  price_unit: "Lakhs" | "Crores" | "Thousand";
  propertyType:
    | "Residential Apartment"
    | "Commercial"
    | "Working Space"
    | "Rental"
    | "Affordables"
    | "Independent Villa"
    | "Penthouse";
  in_sector: boolean;
  size?: number;
  size_unit?: string;
  bhk_rk: "1BHK" | "2BHK" | "3BHK" | "4BHK" | "5BHK" | "RK";
  has_parking_space: boolean;
  furnishing?: "Furnished" | "Unfurnished" | "Semi-Furnished";
  availability: "Ready to Move" | "Under Construction";
  is_featured: boolean;
  is_favorite?: boolean;
}

export interface PropertyDetailModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onSaveProperty?: (propertyId: number) => void;
  isSaved?: boolean;
}

export interface PropertyDetailsPageProps {
  property: Property;
  onBack?: () => void;
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

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

///////////////////// AUTH  ///////////////////
// User type returned by Django
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  is_staff: boolean;
  is_superuser: boolean;
}


// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Signup credentials
export interface SignupCredentials {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string; // optional, used on frontend for validation
  agreeToTerms?: boolean; // optional, used on frontend for validation
}
