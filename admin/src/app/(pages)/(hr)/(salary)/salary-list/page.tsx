"use client";
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DataTable from "@/components/templates/DataTable";
import { Box } from "@mui/material";

const SalaryList: React.FC = () => {
  // State to manage the selected date
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2025-10-05")
  );

  // Format the date as YYYY-MM-DD for the API
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0]; // e.g., "2025-10-05"
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ my: 2, marginLeft: 10 }}>
        <DatePicker
          label="Select Salary Month"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          slotProps={{ textField: { size: "small" } }}
        />
      </Box>
      <DataTable
        fetchUrl={`${
          process.env.NEXT_PUBLIC_BASEURL
        }/v1/admin/salary-preview?salary_month=${formatDate(selectedDate)}`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/inventories`}
        columns={columns}
        searchField="name"
        link="salary-list"
        isJustCreateData={false}
      />
    </LocalizationProvider>
  );
};

export default SalaryList;
