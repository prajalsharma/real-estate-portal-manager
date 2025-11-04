import { defineField, defineType } from "sanity";

export default defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    // Title and Slug
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96)
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
        layout: "tags",
        list: [
          { title: "Internal staircase", value: "Internal staircase" },
          { title: "Air conditioning", value: "Air conditioning" },
          { title: "Solar water heater", value: "Solar water heater" },
          { title: "Floor type: Plaque", value: "Floor type: Plaque" },
          { title: "Security door", value: "Security door" },
          { title: "Buffets: Aluminum", value: "Buffets: Aluminum" },
          { title: "Double glassboard", value: "Double glassboard" },
          { title: "Sites", value: "Sites" },
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
        ]
      },
    }),

    // External Features
    defineField({
      name: "externalFeatures",
      title: "External Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "Veranda (5sq.m.)", value: "Veranda (5sq.m.)" },
          { title: "Private Garden", value: "Private Garden" },
          { title: "Swimming pool", value: "Swimming pool" },
          { title: "Careful", value: "Careful" },
          { title: "Orientation: Western-famous", value: "Orientation: Western-famous" },
          { title: "Access from: asphalt", value: "Access from: asphalt" },
          { title: "Agricultural zone", value: "Agricultural zone" },
          { title: "Parking", value: "Parking" },
          { title: "Tentes", value: "Tentes" },
          { title: "Built-in BBQ", value: "Built-in BBQ" },
          { title: "View", value: "View" },
          { title: "Access for America", value: "Access for America" },
          { title: "Corner", value: "Corner" },
        ]
      },
    }),

    // Construction
    defineField({
      name: "construction",
      title: "Construction",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "Semi-finished", value: "Semi-finished" },
          { title: "Ceiling apartment", value: "Ceiling apartment" },
          { title: "Renovated", value: "Renovated" },
          { title: "It swells renovation", value: "It swells renovation" },
          { title: "Neoclassic", value: "Neoclassic" },
          { title: "Maintain", value: "Maintain" },
          { title: "Subzafos", value: "Subzafos" },
        ]
      },
    }),

    // Suitable For
    defineField({
      name: "suitableFor",
      title: "Suitable For",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "Holiday", value: "Holiday" },
          { title: "Investment", value: "Investment" },
          { title: "Tourist rental", value: "Tourist rental" },
          { title: "Student", value: "Student" },
          { title: "Professional use", value: "Professional use" },
          { title: "Clinic", value: "Clinic" },
        ]
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
    // Beds, Baths, Sqft
    defineField({
      name: "beds",
      title: "Bedrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(20),
    }),
    defineField({
      name: "baths",
      title: "Bathrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(20),
    }),
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
          { title: "Commercial", value: "Commercial" },
          { title: "Land", value: "Land" },
          { title: "Rental Service", value: "Rent" },
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
    // Property Images — bulk upload & ordering!
    defineField({
      name: "images",
      title: "Property Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alternative Text" },
          ],
        },
      ],
      options: { sortable: true }, // optional for ordering
      validation: (Rule) => Rule.min(1).max(20),
    }),
    // Main Image (legacy/preview only)
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternative Text" },
      ],
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
        { name: "city", title: "City", type: "string", validation: (Rule) => Rule.required() },
        { name: "region", title: "Region/State", type: "string", validation: (Rule) => Rule.required() },
        { name: "country", title: "Country", type: "string", initialValue: "Greece", validation: (Rule) => Rule.required() },
        { name: "postalCode", title: "Postal Code", type: "string" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    // Description
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
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
    select: { title: "title", media: "mainImage", price: "price", currency: "currency", status: "status" },
    prepare(selection) {
      const { title, price, currency, status } = selection;
      return {
        title,
        subtitle: `${currency} ${price?.toLocaleString()} - ${status}`,
        media: selection.media,
      };
    },
  },
  orderings: [
    { title: "Published Date, New", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Published Date, Old", name: "publishedAtAsc", by: [{ field: "publishedAt", direction: "asc" }] },
    { title: "Price, High to Low", name: "priceDesc", by: [{ field: "price", direction: "desc" }] },
    { title: "Price, Low to High", name: "priceAsc", by: [{ field: "price", direction: "asc" }] },
  ],
});
