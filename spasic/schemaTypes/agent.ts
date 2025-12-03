import {defineField, defineType} from "sanity";

export default defineType({
  name: "agent",
  title: "Μεσίτης",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Ονοματεπώνυμο",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Φωτογραφία προφίλ",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Εναλλακτικό κείμενο (ALT)",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Ρόλος / Τίτλος",
      type: "string",
      placeholder: "π.χ. Senior Listing Agent • Αθήνα",
    }),
    defineField({
      name: "bio",
      title: "Σύντομο βιογραφικό",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "rating",
      title: "Αξιολόγηση",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "sold",
      title: "Ακίνητα πουλήθηκαν",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: "phone",
      title: "Τηλέφωνο",
      type: "string",
      placeholder: "+30 210 123 4567",
    }),
    defineField({
      name: "email",
      title: "Ηλεκτρονική διεύθυνση (Email)",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "specializations",
      title: "Εξειδικεύσεις",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "π.χ. Πολυτελείς κατοικίες, Επαγγελματικά, Πρώτη κατοικία",
    }),
    defineField({
      name: "languages",
      title: "Γλώσσες",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Γλώσσες στις οποίες μπορεί να εξυπηρετήσει ο μεσίτης",
    }),
    defineField({
      name: "licenseNumber",
      title: "Αριθμός άδειας",
      type: "string",
    }),
    defineField({
      name: "yearsExperience",
      title: "Χρόνια εμπειρίας",
      type: "number",
      validation: (Rule) => Rule.min(0).max(50),
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media",
      type: "object",
      fields: [
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        },
        {
          name: "facebook",
          title: "Facebook",
          type: "url",
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter / X",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Προβεβλημένος μεσίτης",
      type: "boolean",
      initialValue: false,
      description: "Εμφάνιση του μεσίτη σε προβεβλημένες ενότητες",
    }),
    defineField({
      name: "active",
      title: "Κατάσταση (Ενεργός)",
      type: "boolean",
      initialValue: true,
      description: "Είναι ο μεσίτης αυτή τη στιγμή ενεργός;",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "avatar",
      sold: "sold",
      rating: "rating",
    },
    prepare(selection) {
      const { title, subtitle, sold, rating, media } = selection;
      return {
        title,
        subtitle: `${subtitle} • ${sold} πωλήσεις • ⭐ ${rating}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Πωλήσεις (περισσότερες πρώτα)",
      name: "soldDesc",
      by: [{ field: "sold", direction: "desc" }],
    },
    {
      title: "Αξιολόγηση (υψηλότερη πρώτα)",
      name: "ratingDesc",
      by: [{ field: "rating", direction: "desc" }],
    },
    {
      title: "Όνομα A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
