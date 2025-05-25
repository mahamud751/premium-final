"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import { useAuth } from "@/services/hooks/auth";

const OrderList = () => {
  const { user } = useAuth();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 120 },
    { field: "user_id", headerName: "User ID", flex: 1, minWidth: 120 },
    { field: "project_id", headerName: "Project ID", flex: 1, minWidth: 120 },
    { field: "product_id", headerName: "Product ID", flex: 1, minWidth: 120 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <p>{params?.value?.toFixed(2)}</p>,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "transaction_id",
      headerName: "Transaction ID",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "payment_date",
      headerName: "Payment Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "payment_note",
      headerName: "Payment Note",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <p>
          {params.value
            ? params.value.substring(0, 30) +
              (params.value.length > 30 ? "..." : "")
            : ""}
        </p>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/orders`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/orders`}
        columns={columns}
        searchField="transaction_id"
        link="orders-list"
      />
    </>
  );
};

export default OrderList;
