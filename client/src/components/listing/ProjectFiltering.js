"use client";

import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

// Dummy property data
const dummyData = [
  {
    id: 1,
    images: ["https://example.com/images/property1.jpg"],
    description:
      "Spacious 3-bedroom apartment with modern amenities and great city views.",
    floor_number: 5,
    bedroom: 3,
    bathroom: 2,
    flat_size: 1200,
    total_price: 15000000,
    status: "Available",
  },
  {
    id: 2,
    images: ["https://example.com/images/property2.jpg"],
    description:
      "Cozy 2-bedroom flat in a quiet neighborhood, perfect for small families.",
    floor_number: 2,
    bedroom: 2,
    bathroom: 1,
    flat_size: 850,
    total_price: 8500000,
    status: "Sold",
  },
  {
    id: 3,
    images: ["https://example.com/images/property3.jpg"],
    description: "Luxurious penthouse with large terrace and premium fittings.",
    floor_number: 10,
    bedroom: 4,
    bathroom: 3,
    flat_size: 2000,
    total_price: 25000000,
    status: "Available",
  },
];

const ProjectFiltering = () => {
  const { token } = useAuth();

  const fetchLocations = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/v1/projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  };

  const { data: locations, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchLocations,
  });

  if (isLoading) {
    return (
      <section className="our-faq pt-0 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Loading Locations...</p>
        </div>
      </section>
    );
  }
  return (
    <section className="pt-0 pb-20 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {locations?.map((city) => (
            <div className="market_page" key={city.id}>
              <Link href={`/property/${city.id}`} className="block">
                <div className="home9-city-style">
                  <Link href={`/project/${city?.id}`}>
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      {city?.images &&
                        Array.isArray(city.images) &&
                        city.images[0] && (
                          <Image
                            src={city.images[0]}
                            alt={city?.name || "City image"}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            width={400}
                            height={300}
                          />
                        )}
                    </div>
                    <div className="mt-3">
                      <h6 className="text-lg font-semibold">{city?.name}</h6>
                      <p className="text-sm text-gray-600">{city?.address}</p>
                    </div>
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectFiltering;
