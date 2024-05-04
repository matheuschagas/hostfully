export interface Property {
  id: number;
  name: string;
  slug: string;
  location: string;
  type: string; // e.g., "Cottage", "Villa", "Apartment"
  amenities: string[];
  pricePerNight: number;
  cleaningFee: number;
  description: string;
  image?: string; // Optional field for property image URL
}