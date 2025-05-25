"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";

const UnitList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
    { field: "label", headerName: "Label", flex: 1, minWidth: 160 },
    { field: "multiplier", headerName: "Multiplier", flex: 1, minWidth: 160 },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/units`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/units`}
        columns={columns}
        searchField="name"
        link="unit-list"
      />
    </>
  );
};

export default UnitList;
