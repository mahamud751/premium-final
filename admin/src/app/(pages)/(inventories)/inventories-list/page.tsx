"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";
import Link from "next/link";
import DataTable from "@/components/templates/DataTable";

const InventoriesList: React.FC = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    {
      field: "average_unit_price",
      headerName: "Average Unit Price",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "average_total_price",
      headerName: "Average Total Price",
      flex: 1,
      minWidth: 160,
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/inventories`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/inventories`}
        columns={columns}
        searchField="name"
        link="inventories-list"
        isJustCreateData={false}
      />
    </>
  );
};

export default InventoriesList;
