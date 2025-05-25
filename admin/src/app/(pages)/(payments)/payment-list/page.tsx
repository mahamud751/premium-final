"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const PaymentList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "entity_type", headerName: "Entity Type", flex: 1, minWidth: 160 },
    {
      field: "payment_date",
      headerName: "Payment Date",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <StatusButton status={params.value} />
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/payments`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/employees`}
        columns={columns}
        searchField="name"
        link="payment-list"
      />
    </>
  );
};

export default PaymentList;
