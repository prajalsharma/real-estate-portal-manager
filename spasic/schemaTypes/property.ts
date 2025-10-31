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
    // Images Array (sortable)
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
      options: { sortable: true }, // enables ordering
      validation: (Rule) => Rule.min(1).max(20),
    }),
    // Main Image (for preview)
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
    // Videos Section
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "url", title: "Video URL", type: "url", validation: Rule => Rule.required() },
            { name: "caption", title: "Caption", type: "string" }
          ]
        }
      ]
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
    // Desc/Features/Amenities
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
    // Agent Reference
    defineField({
      name: "agent",
      title: "Listing Agent",
      type: "reference",
      to: [{ type: "agent" }],
      validation: (Rule) => Rule.required(),
    }),
    // Publish Date
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
