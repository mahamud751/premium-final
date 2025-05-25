"use client";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

const Vendor = () => {
  const { token } = useAuth();

  const fetchLocations = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/v1/vendors`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  };

  const { data: data, isLoading } = useQuery({
    queryKey: ["vendors"],
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
    <section>
      <h2 className="text-3xl font-bold text-center mb-8">Top Vendors</h2>
      <div className="grid grid-cols-1 mt-5 md:mt-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="w-full h-48 relative">
              {vendor?.image &&
                Array.isArray(vendor.image) &&
                vendor.image[0] && (
                  <Image
                    src={vendor.image[0]}
                    alt={vendor?.name || "City image"}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    width={400}
                    height={300}
                  />
                )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{vendor.name}</h3>
              <p className="text-gray-500 mt-1">{vendor.info}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Vendor;
