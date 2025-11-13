import PropertyGrid from "@/components/PropertyGrid";
import { client } from "@/lib/sanity/client";

export default async function CondosPage() {
  const condoProperties = await client.fetch(
    `*[_type == "property" && propertyType == "Condo"]{
      _id,
      title,
      slug,
      price,
      mainImage { asset->{url}, alt },
      beds, baths, sqft,
      address { city, region }
    }`
  );

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl">
        <PropertyGrid properties={condoProperties} />
      </div>
    </section>
  );
}
