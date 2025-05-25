"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBedroom, setSelectedBedroom] = useState("");
  const [selectedBathroom, setSelectedBathroom] = useState("");
  const [selectedSquares, setSelectedSquares] = useState("");
  const router = useRouter();

  const bedroomOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const bathroomOptions = ["1", "2", "3", "4"];
  const squareOptions = [
    "500",
    "1000",
    "1500",
    "2000",
    "2500",
    "3000",
    "3500",
    "4000",
  ];

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (searchQuery.trim()) {
      query.set("q", searchQuery.trim());
    }
    if (selectedBedroom) {
      query.set("_bedroom", selectedBedroom);
    }
    if (selectedBathroom) {
      query.set("_bathroom", selectedBathroom);
    }
    if (selectedSquares) {
      query.set("_squares", selectedSquares);
    }

    if (query.toString()) {
      router.push(`/properties/search?${query.toString()}`);
    }
  };

  return (
    <div className="w-full px-4 py-8 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transform hover:shadow-3xl transition-shadow duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Search Input */}
          <div className="col-span-1">
            <label className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <i className="fas fa-search text-[#10572A] mr-2"></i> Search
            </label>
            <input
              type="search"
              placeholder="Enter city, neighborhood, or ZIP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Square Footage Filter */}
          <div className="col-span-1">
            <label className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <i className="fas fa-ruler-combined text-[#10572A] mr-2"></i>{" "}
              Square Footage
            </label>
            <select
              value={selectedSquares}
              onChange={(e) => setSelectedSquares(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Select sq.ft
              </option>
              {squareOptions.map((num) => (
                <option key={num} value={num}>
                  {num} sq.ft
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms Filter */}
          <div className="col-span-1">
            <label className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <i className="fas fa-bed text-[#10572A] mr-2"></i> Bedrooms
            </label>
            <select
              value={selectedBedroom}
              onChange={(e) => setSelectedBedroom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Select number
              </option>
              {bedroomOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Bathrooms Filter */}
          <div className="col-span-1">
            <label className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <i className="fas fa-bath text-[#10572A] mr-2"></i> Bathrooms
            </label>
            <select
              value={selectedBathroom}
              onChange={(e) => setSelectedBathroom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Select number
              </option>
              {bathroomOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="col-span-1 flex items-end">
            <button
              onClick={handleSearch}
              className="w-full px-6 py-2 bg-[#10572A] text-white text-sm font-semibold rounded-lg  hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-md"
            >
              <i className="fas fa-search mr-2"></i> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
