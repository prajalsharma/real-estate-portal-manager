import { groq } from "next-sanity";
import { client } from "./client";
import {
  PropertyQueryResult,
  SanityAgent,
  BlogQueryResult,
  PropertyFilters,
  PropertiesResponse,
  AgentsResponse,
  BlogResponse,
  PROPERTY_QUERY_FIELDS,
  AGENT_QUERY_FIELDS,
  BLOG_QUERY_FIELDS,
} from "./types";

// Properties Queries
export const getFeaturedProperties = async (limit: number = 4): Promise<PropertyQueryResult[]> => {
  const query = groq`
    *[_type == "property" && featured == true] | order(publishedAt desc) [0...${limit}] {
      ${PROPERTY_QUERY_FIELDS}
    }
  `;
  return await client.fetch(query);
};

export const getFeaturedAgents = async (limit: number = 4): Promise<SanityAgent[]> => {
  const query = groq`
    *[_type == "agent"] | order(sold desc) [0...${limit}] {
      ${AGENT_QUERY_FIELDS}
    }
  `;
  return await client.fetch(query);
};

export const getCarouselProperties = async (limit: number = 4): Promise<PropertyQueryResult[]> => {
  const query = groq`
    *[_type == "property" && carousel == true && (status == "For Sale" || status == "For Rent")] | order(publishedAt desc) [0...${limit}] {
      ${PROPERTY_QUERY_FIELDS}
    }
  `;
  return await client.fetch(query);
};

// Helper function to sanitize GROQ string inputs
function sanitizeGroqString(input: string): string {
  // Escape backslashes first, then quotes
  return input.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export const getAllProperties = async (
  filters?: PropertyFilters,
  page: number = 1,
  limit: number = 12
): Promise<PropertiesResponse> => {
  const offset = (page - 1) * limit;
  let filterConditions = '_type == "property"';

  if (filters?.location && filters.location.trim()) {
    const sanitizedLocation = sanitizeGroqString(filters.location.trim());
    const locationLower = sanitizedLocation.toLowerCase();

    filterConditions += ` && (
      lower(address.city) match "${locationLower}*" ||
      lower(address.region) match "${locationLower}*"
    )`;
  }

  // Property type filter: exact match with sanitization
  if (filters?.propertyType && filters.propertyType.trim()) {
    const sanitizedType = sanitizeGroqString(filters.propertyType.trim());
    filterConditions += ` && propertyType == "${sanitizedType}"`;
  }

  // Status filter: exact match with sanitization
  if (filters?.status && filters.status.trim()) {
    const sanitizedStatus = sanitizeGroqString(filters.status.trim());
    filterConditions += ` && status == "${sanitizedStatus}"`;
  }

  // Price filters: numeric range validation
  if (filters?.minPrice !== undefined && filters.minPrice !== null) {
    const minPrice = Number(filters.minPrice);
    if (!isNaN(minPrice) && minPrice >= 0) {
      filterConditions += ` && price >= ${minPrice}`;
    }
  }

  if (filters?.maxPrice !== undefined && filters.maxPrice !== null) {
    const maxPrice = Number(filters.maxPrice);
    if (!isNaN(maxPrice) && maxPrice >= 0) {
      filterConditions += ` && price <= ${maxPrice}`;
    }
  }

  // Beds filter: numeric or "5+" handling
  if (filters?.beds && filters.beds.trim()) {
    const bedsValue = filters.beds.trim();
    if (bedsValue === "5-plus" || bedsValue === "5+") {
      filterConditions += ` && bedrooms >= 5`;
    } else {
      const bedsNum = Number(bedsValue);
      if (!isNaN(bedsNum) && bedsNum >= 0) {
        filterConditions += ` && bedrooms == ${bedsNum}`;
      }
    }
  }

  // SCALABILITY: Optimize fetch strategy for 1000+ properties
  const hasLocationFilter = filters?.location && filters.location.trim();
  let fetchLimit: number;

  if (hasLocationFilter) {
    const safetyMultiplier = 4; // Account for prefix matches that don't match substring
    const targetResults = offset + limit;
    const calculatedLimit = Math.ceil(targetResults * safetyMultiplier);

    fetchLimit = Math.min(calculatedLimit, 1000);
    fetchLimit = Math.max(fetchLimit, limit * 2); // At least 2x the requested limit
  } else {
    // No location filter - use efficient GROQ pagination (fetch exactly what we need)
    fetchLimit = offset + limit;
  }

  // Build GROQ query with proper escaping
  const propertiesQuery = groq`
    *[${filterConditions}] | order(publishedAt desc) [0...${fetchLimit}] {
      ${PROPERTY_QUERY_FIELDS}
    }
  `;

  // Count query - for location we'll approximate after client-side filtering
  const countQuery = groq`count(*[${filterConditions}])`;

  try {
    const [allProperties, total] = await Promise.all([
      client.fetch(propertiesQuery),
      client.fetch(countQuery),
    ]);

    // Client-side filtering for location substring matching (only if needed)
    let filteredProperties = allProperties;
    let accurateTotal = total;
    const needsClientSideFilter = hasLocationFilter;

    if (needsClientSideFilter) {
      const locationLower = filters.location!.trim().toLowerCase();

      // Filter for substring matches (case-insensitive)
      filteredProperties = allProperties.filter((property: PropertyQueryResult) => {
        const city = property.address?.city?.toLowerCase() || "";
        const region = property.address?.region?.toLowerCase() || "";
        return city.includes(locationLower) || region.includes(locationLower);
      });

      // Calculate accurate total for location searches
      if (filteredProperties.length < fetchLimit) {
        // We have all matching results - accurate count
        accurateTotal = filteredProperties.length;
      } else {
        // We might have more results beyond fetchLimit (for 1000+ properties)
        // This is a minimum count (at least this many)
        // For exact count with very large datasets, consider: caching, server-side full-text search
        accurateTotal = filteredProperties.length; // Minimum count
      }
    }

    const paginatedProperties = needsClientSideFilter
      ? filteredProperties.slice(offset, offset + limit)
      : allProperties.slice(offset, offset + limit);

    // Calculate hasMore flag correctly
    const hasMore = needsClientSideFilter
      ? filteredProperties.length > offset + limit
      : total > offset + limit;

    return {
      properties: paginatedProperties,
      total: accurateTotal,
      hasMore,
    };
  } catch (error) {
    console.error("GROQ Query Error:", error);
    console.error("Filter conditions:", filterConditions);
    throw error;
  }
};
