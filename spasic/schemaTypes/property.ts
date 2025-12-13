import { defineField, defineType } from "sanity";

export default defineType({
  name: "property",
  title: "Property",
  type: "document",
  fieldsets: [
    {
      name: "translations",
      title: "🌍 Title Translations",
      description: "Add translations for the property title in different languages",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "descriptionTranslations",
      title: "🌍 Description Translations",
      description: "Add translations for the property description in different languages",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // Title and Slug
    defineField({
      name: "title",
      title: "🇬🇧 Title (English)",
      type: "string",
      description: "Primary title in English (required)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_el",
      title: "🇬🇷 Title (Greek)",
      type: "string",
      fieldset: "translations",
      description: "Τίτλος στα Ελληνικά",
    }),
    defineField({
      name: "title_sr",
      title: "🇷🇸 Title (Serbian)",
      type: "string",
      fieldset: "translations",
      description: "Наслов на српском",
    }),
    defineField({
      name: "title_ru",
      title: "🇷🇺 Title (Russian)",
      type: "string",
      fieldset: "translations",
      description: "Название на русском",
    }),
    defineField({
      name: "title_bg",
      title: "🇧🇬 Title (Bulgarian)",
      type: "string",
      fieldset: "translations",
      description: "Заглавие на български",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    // Interior Features
    defineField({
      name: "interiorFeatures",
      title: "Interior Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "list",
        list: [
          { title: "Internal staircase", value: "Internal staircase" },
          { title: "Air conditioning", value: "Air conditioning" },
          { title: "Solar water heater", value: "Solar water heater" },
          { title: "Security door", value: "Security door" },
          { title: "Double glassboard", value: "Double glassboard" },
          { title: "Window screens", value: "Window screens" },
          { title: "Bright", value: "Bright" },
          { title: "Diaspora", value: "Diaspora" },
          { title: "Stained", value: "Stained" },
          { title: "Asan elevator", value: "Asan elevator" },
          { title: "Furnished", value: "Furnished" },
          { title: "Fireplace", value: "Fireplace" },
          { title: "Intra-deposits heating", value: "Intra-deposits heating" },
          { title: "Night current", value: "Night current" },
          { title: "Warehouse", value: "Warehouse" },
          { title: "Sofa", value: "Sofa" },
          { title: "Playroom", value: "Playroom" },
          { title: "Satellite antenna", value: "Satellite antenna" },
          { title: "Alarm", value: "Alarm" },
          { title: "Reception with a doorman", value: "Reception with a doorman" },
          { title: "Electric car charging facilities", value: "Electric car charging facilities" },
          { title: "Luxurious", value: "Luxurious" },
        ],
      },
    }),

    // Floor Type
    defineField({
      name: "floorType",
      title: "Floor Type",
      type: "string",
      options: {
        list: [
          { title: "Wood", value: "Wood" },
          { title: "Mosaic", value: "Mosaic" },
          { title: "Granite", value: "Granite" },
          { title: "Tiles", value: "Tiles" },
        ],
      },
    }),

    // Frames (formerly Buffets)
    defineField({
      name: "frames",
      title: "Frames",
      type: "string",
      options: {
        list: [
          { title: "Synthetic", value: "Synthetic" },
          { title: "Wood", value: "Wood" },
          { title: "Aluminum", value: "Aluminum" },
        ],
      },
    }),

    // External Features
    defineField({
      name: "externalFeatures",
      title: "External Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "list",
        list: [
          { title: "Balcony", value: "Balcony" },
          { title: "Private Garden", value: "Private Garden" },
          { title: "Swimming pool", value: "Swimming pool" },
          { title: "Careful", value: "Careful" },
          { title: "Parking", value: "Parking" },
          { title: "Tentes", value: "Tentes" },
          { title: "Built-in BBQ", value: "Built-in BBQ" },
          { title: "View", value: "View" },
          { title: "Access for America", value: "Access for America" },
          { title: "Corner", value: "Corner" },
        ],
      },
    }),

    // Floor Level
    defineField({
      name: "floorLevel",
      title: "Floor Level",
      type: "string",
      options: {
        list: [
          { title: "Underground", value: "Underground" },
          { title: "Basement", value: "Basement" },
          { title: "Ground Floor", value: "Ground Floor" },
          { title: "1st Floor", value: "1st Floor" },
          { title: "2nd Floor", value: "2nd Floor" },
          { title: "3rd Floor", value: "3rd Floor" },
          { title: "4th Floor", value: "4th Floor" },
          { title: "5th Floor", value: "5th Floor" },
          { title: "6th Floor", value: "6th Floor" },
          { title: "7th Floor", value: "7th Floor" },
          { title: "8th Floor", value: "8th Floor" },
          { title: "9th Floor", value: "9th Floor" },
          { title: "10th Floor", value: "10th Floor" },
        ],
      },
    }),

    // Orientation
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      options: {
        list: [
          { title: "North", value: "North" },
          { title: "East", value: "East" },
          { title: "West", value: "West" },
          { title: "South", value: "South" },
          { title: "Northeast", value: "Northeast" },
          { title: "Northwest", value: "Northwest" },
          { title: "Southeast", value: "Southeast" },
          { title: "Southwest", value: "Southwest" },
        ],
      },
    }),

    // Distance from Sea
    defineField({
      name: "distanceFromSea",
      title: "Distance from the Sea (meters)",
      type: "number",
      validation: (Rule) => Rule.min(0),
      description: "Distance to the nearest sea/beach in meters",
    }),

    // Construction
    defineField({
      name: "construction",
      title: "Construction",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "list",
        list: [
          { title: "Semi-finished", value: "Semi-finished" },
          { title: "Ceiling apartment", value: "Ceiling apartment" },
          { title: "Renovated", value: "Renovated" },
          { title: "It swells renovation", value: "It swells renovation" },
          { title: "Neoclassic", value: "Neoclassic" },
          { title: "Maintain", value: "Maintain" },
          { title: "Subzafos", value: "Subzafos" },
          { title: "Need renovation", value: "Need renovation" },
          { title: "Under construction", value: "Under construction" },
        ],
      },
    }),

    // Suitable For
    defineField({
      name: "suitableFor",
      title: "Suitable For",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "list",
        list: [
          { title: "Holiday", value: "Holiday" },
          { title: "Investment", value: "Investment" },
          { title: "Tourist rental", value: "Tourist rental" },
          { title: "Student", value: "Student" },
          { title: "Professional use", value: "Professional use" },
          { title: "Clinic", value: "Clinic" },
        ],
      },
    }),

    // Price and Currency
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      options: {
        list: [{ title: "EUR - Euro", value: "EUR" }],
      },
      initialValue: "EUR",
      validation: (Rule) => Rule.required(),
    }),

    // Rooms Details
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(20),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(20),
    }),
    defineField({
      name: "livingRooms",
      title: "Living Rooms",
      type: "number",
      validation: (Rule) => Rule.min(0).max(10),
    }),
    defineField({
      name: "kitchens",
      title: "Kitchens",
      type: "number",
      validation: (Rule) => Rule.min(0).max(10),
    }),

    // // Legacy (kept for compatibility)
    // defineField({
    //   name: "beds",
    //   title: "Beds (Legacy - use Bedrooms)",
    //   type: "number",
    //   validation: (Rule) => Rule.min(0).max(20),
    // }),
    // defineField({
    //   name: "baths",
    //   title: "Baths (Legacy - use Bathrooms)",
    //   type: "number",
    //   validation: (Rule) => Rule.min(0).max(20),
    // }),

    defineField({
      name: "sqft",
      title: "Square Meters",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),

    // Type/Status
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      options: {
        list: [
          { title: "Apartment", value: "Apartment" },
          { title: "Maisonette", value: "Maisonette" },
          { title: "Building", value: "Building" },
          { title: "Hotel", value: "Hotel" },
          { title: "Complex", value: "Complex" },
          { title: "Commercial", value: "Commercial" },
          { title: "Land", value: "Land" },
          { title: "Rental Service", value: "Rental Service" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "For Sale", value: "For Sale" },
          { title: "For Rent", value: "For Rent" },
          { title: "Sold", value: "Sold" },
          { title: "Rented", value: "Rented" },
        ],
      },
      initialValue: "For Sale",
      validation: (Rule) => Rule.required(),
    }),

    // Flags
    defineField({
      name: "featured",
      title: "Featured Section",
      type: "boolean",
      initialValue: false,
      description: "Tick if property should be shown in featured section.",
    }),
    defineField({
      name: "carousel",
      title: "Carousel Section",
      type: "boolean",
      initialValue: false,
      description: "Tick if property should be shown in homepage carousel.",
    }),

    // Property Images — BULK UPLOAD with improved UX
    defineField({
      name: "images",
      title: "Property Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Describe what is shown in the image",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption for the image",
            },
          ],
        },
      ],
      options: {
        sortable: true,
        layout: "grid",
      },
      validation: (Rule) => Rule.min(1).max(50),
      description:
        "📸 Click 'Add' → 'Upload' → select multiple image files at once (hold Ctrl/Cmd and click each file) → click 'Open' to upload all together. Drag thumbnails to reorder.",
    }),

    // Main Image (legacy/preview only)
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
      validation: (Rule) => Rule.required(),
    }),

    // Videos Section — direct file upload (not Mux)
    defineField({
      name: "videos",
      title: "Property Videos",
      type: "array",
      of: [
        {
          type: "file",
          options: { accept: "video/*" },
        },
      ],
    }),

    // Address object
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "street", title: "Street Address", type: "string" },
        {
          name: "city",
          title: "City",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "region",
          title: "Region/State",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "country",
          title: "Country",
          type: "string",
          initialValue: "Greece",
          validation: (Rule) => Rule.required(),
        },
        { name: "postalCode", title: "Postal Code", type: "string" },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Coordinates for maps
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      description: "e.g. 40.0523",
      validation: (Rule) => Rule.min(-90).max(90),
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      description: "e.g. 23.4567",
      validation: (Rule) => Rule.min(-180).max(180),
    }),

    // Description
    defineField({
      name: "description",
      title: "🇬🇧 Description (English)",
      type: "text",
      rows: 4,
      description: "Primary description in English",
    }),
    defineField({
      name: "description_el",
      title: "🇬🇷 Description (Greek)",
      type: "text",
      rows: 4,
      fieldset: "descriptionTranslations",
      description: "Περιγραφή στα Ελληνικά",
    }),
    defineField({
      name: "description_sr",
      title: "🇷🇸 Description (Serbian)",
      type: "text",
      rows: 4,
      fieldset: "descriptionTranslations",
      description: "Опис на српском",
    }),
    defineField({
      name: "description_ru",
      title: "🇷🇺 Description (Russian)",
      type: "text",
      rows: 4,
      fieldset: "descriptionTranslations",
      description: "Описание на русском",
    }),
    defineField({
      name: "description_bg",
      title: "🇧🇬 Description (Bulgarian)",
      type: "text",
      rows: 4,
      fieldset: "descriptionTranslations",
      description: "Описание на български",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "yearBuilt",
      title: "Year Built",
      type: "number",
      validation: (Rule) => Rule.min(1800).max(new Date().getFullYear() + 2),
    }),
    defineField({
      name: "lotSize",
      title: "Lot Size (sq meters)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "agent",
      title: "Listing Agent",
      type: "reference",
      to: [{ type: "agent" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      price: "price",
      currency: "currency",
      status: "status",
    },
    prepare(selection) {
      const { title, price, currency, status, media } = selection;
      return {
        title,
        subtitle: `${currency} ${price?.toLocaleString()} - ${status}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Price, High to Low",
      name: "priceDesc",
      by: [{ field: "price", direction: "desc" }],
    },
    {
      title: "Price, Low to High",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
  ],
});
