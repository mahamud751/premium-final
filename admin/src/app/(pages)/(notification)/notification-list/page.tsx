"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/templates/DataTable";

const NotificationList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 160 },
    { field: "message", headerName: "Message", flex: 1, minWidth: 160 },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/notifications`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/notifications`}
        columns={columns}
        searchField="name"
        link="notification-list"
        isJustCreateData={false}
      />
    </>
  );
};

export default NotificationList;
