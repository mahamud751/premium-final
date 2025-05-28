"use client";

import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterComponent() {
  const { token } = useAuth();

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedBedroom, setSelectedBedroom] = useState("");
  const [selectedBathroom, setSelectedBathroom] = useState("");
  const router = useRouter();

  const bedroomOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const bathroomOptions = ["1", "2", "3", "4"];

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

  const { data: locations } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchLocations,
  });

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (selectedProject) {
      query.set("_project_id", selectedProject); // Use project_id instead of q
    }
    if (selectedBedroom) {
      query.set("_bedroom", selectedBedroom);
    }
    if (selectedBathroom) {
      query.set("_bathroom", selectedBathroom);
    }

    if (query.toString()) {
      router.push(`/properties/search?${query.toString()}`);
    }
  };

  return (
    <div className="w-full md:px-4 px-2 py-2 md:py-8 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transform hover:shadow-3xl transition-shadow duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Project Dropdown */}
          <div className="col-span-2">
            <label className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <i className="fas fa-search text-[#10572A] mr-2"></i> Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Select a project
              </option>
              {locations?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
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
              className="w-full px-6 py-2 bg-[#10572A] text-white text-sm font-semibold rounded-lg hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-md"
            >
              <i className="fas fa-search mr-2"></i> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
