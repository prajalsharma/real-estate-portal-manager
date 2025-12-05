import { defineField, defineType } from "sanity";

export default defineType({
  name: "property",
  title: "Ακίνητο",
  type: "document",
  fields: [
    // Title and Slug
    defineField({
      name: "title",
      title: "Τίτλος",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      title: "Εσωτερικά χαρακτηριστικά",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "list",
        list: [
          { title: "Εσωτερική σκάλα", value: "Internal staircase" },
          { title: "Κλιματισμός", value: "Air conditioning" },
          { title: "Ηλιακός θερμοσίφωνας", value: "Solar water heater" },
          { title: "Δάπεδο: Πλακάκι", value: "Floor type: Plaque" },
          { title: "Θωρακισμένη πόρτα", value: "Security door" },
          { title: "Κουφώματα αλουμινίου", value: "Buffets: Aluminum" },
          { title: "Διπλά τζάμια", value: "Double glassboard" },
          { title: "Σίτες", value: "Sites" },
          { title: "Φωτεινό", value: "Bright" },
          { title: "Διαμπερές", value: "Diaspora" },
          { title: "Βαμμένο", value: "Stained" },
          { title: "Ασανσέρ", value: "Asan elevator" },
          { title: "Επιπλωμένο", value: "Furnished" },
          { title: "Τζάκι", value: "Fireplace" },
          { title: "Αυτόνομη θέρμανση", value: "Intra-deposits heating" },
          { title: "Νυχτερινό ρεύμα", value: "Night current" },
          { title: "Αποθήκη", value: "Warehouse" },
          { title: "Σοφίτα", value: "Sofa" },
          { title: "Playroom", value: "Playroom" },
          { title: "Δορυφορική κεραία", value: "Satellite antenna" },
          { title: "Συναγερμός", value: "Alarm" },
          { title: "Υποδοχή με θυρωρό", value: "Reception with a doorman" },
          { title: "Φόρτιση ηλεκτρικών οχημάτων", value: "Electric car charging facilities" },
          { title: "Πολυτελές", value: "Luxurious" },
        ],
      },
    }),

    // External Features
    defineField({
      name: "externalFeatures",
      title: "Εξωτερικά χαρακτηριστικά",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "list",
        list: [
          { title: "Βεράντα (5 τ.μ.)", value: "Veranda (5sq.m.)" },
          { title: "Ιδιωτικός κήπος", value: "Private Garden" },
          { title: "Πισίνα", value: "Swimming pool" },
          { title: "Περιποιημένος χώρος", value: "Careful" },
          { title: "Προσανατολισμός: Δυτικός", value: "Orientation: Western-famous" },
          { title: "Πρόσβαση από άσφαλτο", value: "Access from: asphalt" },
          { title: "Αγροτική ζώνη", value: "Agricultural zone" },
          { title: "Θέση στάθμευσης", value: "Parking" },
          { title: "Τέντες", value: "Tentes" },
          { title: "Χτιστό BBQ", value: "Built-in BBQ" },
          { title: "Θέα", value: "View" },
          { title: "Πρόσβαση για ΑμεΑ", value: "Access for America" },
          { title: "Γωνιακό", value: "Corner" },
        ],
      },
    }),

    // Construction
    defineField({
      name: "construction",
      title: "Κατάσταση / Κατασκευή",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "list",
        list: [
          { title: "Ημιτελές", value: "Semi-finished" },
          { title: "Ρετιρέ", value: "Ceiling apartment" },
          { title: "Ανακαινισμένο", value: "Renovated" },
          { title: "Χρήζει ανακαίνισης", value: "It swells renovation" },
          { title: "Νεοκλασικό", value: "Neoclassic" },
          { title: "Καλοδιατηρημένο", value: "Maintain" },
          { title: "Υπόγειο", value: "Subzafos" },
        ],
      },
    }),

    // Suitable For
    defineField({
      name: "suitableFor",
      title: "Κατάλληλο για",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "list",
        list: [
          { title: "Εξοχική κατοικία", value: "Holiday" },
          { title: "Επένδυση", value: "Investment" },
          { title: "Τουριστική μίσθωση", value: "Tourist rental" },
          { title: "Φοιτητική κατοικία", value: "Student" },
          { title: "Επαγγελματική χρήση", value: "Professional use" },
          { title: "Ιατρείο / Κλινική", value: "Clinic" },
        ],
      },
    }),

    // Price and Currency
    defineField({
      name: "price",
      title: "Τιμή",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Νόμισμα",
      type: "string",
      options: {
        list: [{ title: "EUR - Ευρώ", value: "EUR" }],
      },
      initialValue: "EUR",
      validation: (Rule) => Rule.required(),
    }),

    // Beds, Baths, Sqft
    defineField({
      name: "beds",
      title: "Υπνοδωμάτια",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(20),
    }),
    defineField({
      name: "baths",
      title: "Μπάνια",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(20),
    }),
    defineField({
      name: "sqft",
      title: "Τετραγωνικά μέτρα",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),

    // Type/Status
    defineField({
      name: "propertyType",
      title: "Τύπος ακινήτου",
      type: "string",
      options: {
        list: [
          { title: "Διαμέρισμα", value: "Apartment" },
          { title: "Μεζονέτα", value: "Maisonette" },
          { title: "Επαγγελματικό", value: "Commercial" },
          { title: "Οικόπεδο / Γη", value: "Land" },
          { title: "Υπηρεσία ενοικίασης", value: "Rent" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Κατάσταση",
      type: "string",
      options: {
        list: [
          { title: "Προς πώληση", value: "For Sale" },
          { title: "Προς ενοικίαση", value: "For Rent" },
          { title: "Πωλημένο", value: "Sold" },
          { title: "Ενοικιασμένο", value: "Rented" },
        ],
      },
      initialValue: "For Sale",
      validation: (Rule) => Rule.required(),
    }),

    // Flags
    defineField({
      name: "featured",
      title: "Προβεβλημένο (Featured section)",
      type: "boolean",
      initialValue: false,
      description: "Επιλέξτε το αν θέλετε να εμφανίζεται στην προβεβλημένη ενότητα.",
    }),
    defineField({
      name: "carousel",
      title: "Carousel στην αρχική",
      type: "boolean",
      initialValue: false,
      description: "Επιλέξτε το αν θέλετε να εμφανίζεται στο carousel της αρχικής σελίδας.",
    }),

    // Property Images — bulk upload & ordering!
    defineField({
      name: "images",
      title: "Φωτογραφίες ακινήτου",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Εναλλακτικό κείμενο (ALT)" }],
        },
      ],
      options: { sortable: true },
      validation: (Rule) => Rule.min(1).max(20),
    }),

    // Main Image (legacy/preview only)
    defineField({
      name: "mainImage",
      title: "Κεντρική φωτογραφία",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Εναλλακτικό κείμενο (ALT)" }],
      validation: (Rule) => Rule.required(),
    }),

    // Videos Section — direct file upload (not Mux)
    defineField({
      name: "videos",
      title: "Βίντεο ακινήτου",
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
      title: "Διεύθυνση",
      type: "object",
      fields: [
        { name: "street", title: "Οδός", type: "string" },
        {
          name: "city",
          title: "Πόλη",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "region",
          title: "Περιοχή / Νομός",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "country",
          title: "Χώρα",
          type: "string",
          initialValue: "Greece",
          validation: (Rule) => Rule.required(),
        },
        { name: "postalCode", title: "Τ.Κ.", type: "string" },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "latitude",
      title: "Γεωγραφικό πλάτος (Latitude)",
      type: "number",
      description: "Π.χ. 40.0523",
      validation: (Rule) => Rule.min(-90).max(90),
    }),
    defineField({
      name: "longitude",
      title: "Γεωγραφικό μήκος (Longitude)",
      type: "number",
      description: "Π.χ. 23.4567",
      validation: (Rule) => Rule.min(-180).max(180),
    }),

    // Description
    defineField({
      name: "description",
      title: "Περιγραφή",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "features",
      title: "Χαρακτηριστικά",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "amenities",
      title: "Παροχές",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "yearBuilt",
      title: "Έτος κατασκευής",
      type: "number",
      validation: (Rule) => Rule.min(1800).max(new Date().getFullYear() + 2),
    }),
    defineField({
      name: "lotSize",
      title: "Εμβαδόν οικοπέδου (τ.μ.)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "agent",
      title: "Μεσίτης / Υπεύθυνος αγγελίας",
      type: "reference",
      to: [{ type: "agent" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Ημερομηνία δημοσίευσης",
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
      title: "Ημερομηνία δημοσίευσης (Νεότερα)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Ημερομηνία δημοσίευσης (Παλαιότερα)",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Τιμή (Υψηλότερη προς χαμηλότερη)",
      name: "priceDesc",
      by: [{ field: "price", direction: "desc" }],
    },
    {
      title: "Τιμή (Χαμηλότερη προς υψηλότερη)",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
  ],
});
