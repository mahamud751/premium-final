import React from "react";

const PropertyDetails = ({ product }) => {
  const defaultData = {
    id: "N/A",
    total_price: "N/A",
    flat_size: "N/A",
    bathroom: "N/A",
    bedroom: "N/A",
    car_parking: false,
    created_at: "N/A",
    flat_type: "N/A",
    status: "N/A",
  };

  const data = product || defaultData;

  const columns = [
    [
      {
        label: "Property ID",
        value: data?.id,
        icon: "fas fa-id-badge",
        color: "text-blue-500",
      },
      {
        label: "Price",
        value: data?.total_price
          ? `${data?.total_price.toLocaleString()} ৳`
          : "N/A",
        icon: "fas fa-tag",
        color: "text-green-500",
      },
      {
        label: "Property Size",
        value: data?.flat_size ? `${data?.flat_size} Sq Ft` : "N/A",
        icon: "fas fa-ruler-combined",
        color: "text-yellow-500",
      },
      {
        label: "Bathrooms",
        value: data?.bathroom,
        icon: "fas fa-bath",
        color: "text-pink-500",
      },
      {
        label: "Bedrooms",
        value: data?.bedroom,
        icon: "fas fa-bed",
        color: "text-purple-500",
      },
    ],
    [
      {
        label: "Garage",
        value: data?.car_parking ? "Yes" : "No",
        icon: "fas fa-car",
        color: "text-teal-500",
      },
      {
        label: "Garage Size",
        value: "N/A",
        icon: "fas fa-warehouse",
        color: "text-orange-500",
      },
      {
        label: "Year Built",
        value: data?.created_at
          ? new Date(data?.created_at).getFullYear()
          : "N/A",
        icon: "fas fa-calendar-alt",
        color: "text-red-500",
      },
      {
        label: "Property Type",
        value: data?.flat_type || "N/A",
        icon: "fas fa-building",
        color: "text-cyan-500",
      },
      {
        label: "Property Status",
        value: data?.status || "N/A",
        icon: "fas fa-info-circle",
        color: "text-indigo-500",
      },
    ],
  ];

  return (
    <div className="flex flex-wrap -mx-4 p-6  hover:shadow-xl transition-shadow duration-300">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`w-full md:w-1/2 xl:w-1/3 px-4 mb-6 ${
            columnIndex === 1 ? "xl:ml-1/6" : ""
          }`}
        >
          {column.map((detail, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <i className={`${detail.icon} ${detail.color} mr-2`}></i>
                <p className="font-semibold text-gray-800">{detail.label}</p>
              </div>
              <p className="text-gray-600">{detail.value}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
