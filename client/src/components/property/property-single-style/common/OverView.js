import React from "react";

const OverView = ({ product }) => {
  const defaultData = {
    bedroom: "N/A",
    bathroom: "N/A",
    flat_size: "N/A",
    created_at: "N/A",
    flat_type: "N/A",
    car_parking: false,
  };

  const data = product || defaultData;

  const overviewData = [
    {
      icon: "fas fa-bed",
      color: "text-blue-500",
      label: "Bedroom",
      value: data.bedroom,
    },
    {
      icon: "fas fa-bath",
      color: "text-green-500",
      label: "Bath",
      value: data.bathroom,
    },
    {
      icon: "fas fa-calendar-alt",
      color: "text-yellow-500",
      label: "Year Built",
      value: data.created_at ? new Date(data.created_at).getFullYear() : "N/A",
    },
    {
      icon: "fas fa-car",
      color: "text-purple-500",
      label: "Garage",
      value: data.car_parking ? "Yes" : "No",
      xs: true,
    },
    {
      icon: "fas fa-ruler-combined",
      color: "text-pink-500",
      label: "Sqft",
      value: data.flat_size ? `${data.flat_size} Sq Ft` : "N/A",
      xs: true,
    },
    {
      icon: "fas fa-building",
      color: "text-teal-500",
      label: "Property Type",
      value: data.flat_type || "N/A",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {overviewData?.map((item, index) => (
        <div
          key={index}
          className={`w-full sm:w-1/2 lg:w-1/3 px-4 ${
            item?.xs ? "mb-6 sm:mb-6" : "mb-6"
          }`}
        >
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200">
            <i className={`${item?.icon} ${item?.color} text-xl mr-3`}></i>
            <div>
              <h6 className="font-semibold text-gray-800 mb-1">{item?.label}</h6>
              <p className="text-gray-600 text-sm">{item?.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverView;
