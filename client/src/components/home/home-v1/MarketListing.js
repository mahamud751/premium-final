"use client";
import Image from "next/image";
import Link from "next/link";

const MarketListing = ({ listings }) => {
  const getSingleImage = (images) => {
    if (Array.isArray(images)) {
      return images[0] || "/path/to/fallback-image.jpg";
    }
    return images || "/path/to/fallback-image.jpg";
  };

  return (
    <>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <div className="item col-lg-4 market_page" key={listing.id}>
            <Link href={`/property/${listing.id}`}>
              {" "}
              <div className="listing-style1">
                <div className="list-thumb">
                  <Image
                    width={1000}
                    height={1000}
                    className="w-100 h-96 cover"
                    src={getSingleImage(listing.images)}
                    alt="listing"
                  />
                </div>
                <div className="list-content">
                  <h6 className="list-title fw-bold">
                    <Link href={`/property/${listing.id}`}>
                      {listing?.description.slice(0, 60) || "Property Listing"}
                    </Link>
                  </h6>

                  <div className="flex items-center gap-4 px-4 py-2 my-3 transition-colors duration-200 rounded-lg bg-gray-50 hover:bg-gray-100">
                    <a
                      href="#"
                      className="flex items-center text-gray-700 transition-colors duration-200 hover:text-teal-600"
                    >
                      <i className="mr-1 text-teal-500 fas fa-layer-group"></i>
                      {listing?.floor_number
                        ? `${listing.floor_number} Floor`
                        : "N/A Floor"}
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-gray-700 transition-colors duration-200 hover:text-blue-600"
                    >
                      <i className="mr-1 text-blue-500 fas fa-bed"></i>
                      {listing?.bedroom ? `${listing.bedroom} bed` : "N/A bed"}
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-gray-700 transition-colors duration-200 hover:text-green-600"
                    >
                      <i className="mr-1 text-green-500 fas fa-bath"></i>
                      {listing?.bathroom
                        ? `${listing.bathroom} bath`
                        : "N/A bath"}
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-gray-700 transition-colors duration-200 hover:text-purple-600"
                    >
                      <i className="mr-1 text-purple-500 fas fa-ruler-combined"></i>
                      {listing?.flat_size
                        ? `${listing.flat_size} sqft`
                        : "N/A sqft"}
                    </a>
                  </div>

                  <div className="mb-2 d-flex justify-content-between">
                    <p
                      className="fw-bold"
                      style={{ fontSize: "15px", color: "#10572A" }}
                    >
                      {listing.total_price.toLocaleString()} ৳
                    </p>
                    <p
                      className="fw-bold"
                      style={{ fontSize: "15px", color: "#10572A" }}
                    >
                      {listing.status || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center">No properties found</p>
      )}
    </>
  );
};

export default MarketListing;
