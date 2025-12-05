// Sanity schema types for Real Estate Portal

import { title } from "node:process";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SanityAgent {
  _id: string;
  _type: "agent";
  name: string;
  role?: string;
  rating: number;
  sold: number;
  phone?: string;
  email?: string;
  avatar: SanityImage;
  bio?: string;
  specializations?: string[];
  languages?: string[];
}

export interface SanityProperty {
  _id: string;
  _type: "property";
  title: string;
  slug: {
    current: string;
  };
  price: number;
  currency: "EUR" | "USD" | "GBP";
  beds: number;
  baths: number;
  sqft: number;
  propertyType: "House" | "Apartment" | "Condo" | "Commercial" | "Land";
  status: "For Sale" | "For Rent" | "Sold" | "Rented";
  featured: boolean;
  interiorFeatures?: string[];
  externalFeatures?: string[];
  construction?: string[];
  suitableFor?: string[];
  images: SanityImage[];
  mainImage: SanityImage;

  address: {
    street?: string;
    city: string;
    region: string;
    country: string;
    postalCode?: string;
  };
  latitude?: number;
  longitude?: number;
  description?: string;
  features?: string[];
  videos?: string[];
  amenities?: string[];
  yearBuilt?: number;
  lotSize?: number;
  agent: SanityAgent;
  publishedAt: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface SanityBlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any[]; // Portable text
  mainImage?: SanityImage;
  category: {
    title: string;
    slug: { current: string };
  };
  author: SanityAgent;
  tags?: string[];
  publishedAt: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface SanityCategory {
  _id: string;
  _type: "category";
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface SanityLocation {
  _id: string;
  _type: "location";
  name: string;
  slug: {
    current: string;
  };
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description?: string;
  image?: SanityImage;
  featured: boolean;
  propertyCount?: number;
}

// Query result types
export interface PropertyQueryResult extends Omit<SanityProperty, "agent"> {
  agent: SanityAgent;
}

export interface BlogQueryResult extends Omit<SanityBlogPost, "author" | "category"> {
  author: SanityAgent;
  category: SanityCategory;
}

// API Response types
export interface PropertiesResponse {
  properties: PropertyQueryResult[];
  total: number;
  hasMore: boolean;
}

export interface AgentsResponse {
  agents: SanityAgent[];
  total: number;
}

export interface BlogResponse {
  posts: BlogQueryResult[];
  total: number;
  hasMore: boolean;
}

// Filter types
export interface PropertyFilters {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: string;
  status?: string;
  featured?: boolean;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
}

// GROQ query helpers
export const PROPERTY_QUERY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  price,
  currency,
  beds,
  baths,
  sqft,
  propertyType,
  status,
  featured,
  images,
  mainImage,
  address,
  location,
  description,
  features,
  amenities,
  yearBuilt,
  lotSize,
  agent->,
  publishedAt,
  _createdAt,
  _updatedAt
`;

export const AGENT_QUERY_FIELDS = `
  _id,
  name,
  role,
  rating,
  sold,
  phone,
  email,
  avatar,
  bio,
  specializations,
  languages
`;

export const BLOG_QUERY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  mainImage,
  category->,
  author->,
  tags,
  publishedAt,
  _createdAt,
  _updatedAt
`;
