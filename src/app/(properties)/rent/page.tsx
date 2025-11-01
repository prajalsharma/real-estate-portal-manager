import PropertyGrid from "@/components/PropertyGrid";
import { getRentalProperties } from "@/lib/dummy-data";

export default function RentPage() {
  const rentalProperties = getRentalProperties();

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <PropertyGrid properties={rentalProperties} />
        </div>
      </section>
    </>
  );
}
