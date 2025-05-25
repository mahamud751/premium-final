"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import Image from "next/image";

const BannerList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 160 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 160 },
    { field: "position", headerName: "Position", flex: 1, minWidth: 160 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
    {
      field: "image",
      headerName: "Image",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <div className="my-2 flex">
          {params.value?.map(
            (photo: any, index: React.Key | null | undefined) => (
              <div key={index} className="flex mr-2">
                <Image src={photo} alt={photo} width={36} height={36} />
              </div>
            )
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/banners`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/banners`}
        columns={columns}
        searchField="name"
        link="banner-list"
      />
    </>
  );
};

export default BannerList;
