"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const FaqList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "question", headerName: "Question", flex: 1, minWidth: 160 },
    { field: "answer", headerName: "Answer", flex: 1, minWidth: 160 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 160 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/faqs`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/faqs`}
        columns={columns}
        searchField="name"
        link="faq-list"
      />
    </div>
  );
};

export default FaqList;
