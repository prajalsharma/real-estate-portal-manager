import PropertyGrid from "@/components/PropertyGrid";
import { client } from "@/lib/sanity/client";

export default async function MaisonettesPage() {
  const properties = await client.fetch(
    `*[_type == "property" && propertyType == "Maisonette"]{
      _id, title, slug, price, mainImage { asset, alt }, bedrooms, bathrooms, sqft, address { city, region }
    }`
  );

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl">
        <PropertyGrid properties={properties} />
      </div>
    </section>
  );
}
