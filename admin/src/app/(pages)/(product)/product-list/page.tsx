"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";
import Image from "next/image";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const ProductList = () => {
  const columns: GridColDef[] = [
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div>
          <p>{params.row.project?.name || "N/A"}</p>
        </div>
      ),
    },
    {
      field: "flat_type",
      headerName: "Flat Type",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "floor_number",
      headerName: "Floor Number",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "flat_size",
      headerName: "Flat Size (sqft)",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "total_price",
      headerName: "Total Price",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "rooftop_gardening",
      headerName: "Rooftop Gardening",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div>
          <p>{params.row.rooftop_gardening ? "Yes" : "No"}</p>
        </div>
      ),
    },
    {
      field: "car_parking",
      headerName: "Car Parking",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div>
          <p>{params.row.car_parking ? "Yes" : "No"}</p>
        </div>
      ),
    },
    {
      field: "generator",
      headerName: "Generator",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div>
          <p>{params.row.generator ? "Yes" : "No"}</p>
        </div>
      ),
    },
    {
      field: "Sold/Available",
      headerName: "Sold/Available",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div>
          <p>
            {params.row.user_id ? (
              <button className="bg-red-400 w-24 h-8 mt-3 text-white">
                <p className="mt-[-12px]"> Sold</p>
              </button>
            ) : (
              <button className="bg-green-400 w-24 h-8 mt-3 text-green-800">
                <p className="mt-[-12px]"> Available</p>
              </button>
            )}
          </p>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
    {
      field: "images",
      headerName: "Images",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <div className="my-2 flex flex-wrap gap-2">
          {Array.isArray(params.value) && params.value.length > 0 ? (
            params.value.map((photo: string, index: number) => (
              <div key={index} className="relative">
                <Image
                  src={photo}
                  alt={`Image ${index + 1}`}
                  width={36}
                  height={36}
                  className="object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-image.png";
                  }}
                />
              </div>
            ))
          ) : (
            <span>No images</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/products`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/products`}
      columns={columns}
      searchField="flat_type"
      defaultHiddenColumns={[""]}
      link="product-list"
    />
  );
};

export default ProductList;
