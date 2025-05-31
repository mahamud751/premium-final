"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "@/services/hooks/auth";

// Interfaces for TypeScript
interface Attendance {
  presents: number;
  weekends: number;
  holidays: number;
  leaves: number;
  absents: number;
}

interface SalaryData {
  id: number;
  machine_user_id: number;
  name: string;
  email: string | null;
  department: string;
  designation: string;
  additional_salary: number;
  attendances: Attendance;
  salary: number;
  payable_salary: number;
}

interface SalaryResponse {
  status: string;
  data: SalaryData[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#f1f5f9",
  border: "1px solid #e5e7eb",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fff",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#f9fafb",
  },
  border: "1px solid #e5e7eb",
}));

const SalarySheet: React.FC = () => {
  // State for table data and filter
  const [salaryData, setSalaryData] = useState<SalaryData[]>([]);
  const [month, setMonth] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalRows, setTotalRows] = useState<number>(0);

  // Get token from useAuth
  const { token } = useAuth();

  // Axios instance with default headers
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASEURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch salary sheet data from API
  const fetchSalarySheetData = async () => {
    try {
      const queryParams = new URLSearchParams({
        salary_month: month,
      }).toString();

      const response = await api.get<SalaryResponse>(
        `/v1/admin/salary-sheet?${queryParams}`
      );
      if (response.data.status === "success") {
        const data = response.data.data;
        setSalaryData(data);
        setTotalRows(data.length);
      }
    } catch (error) {
      console.error("Error fetching salary sheet data:", error);
      setSalaryData([]);
      setTotalRows(0);
    }
  };

  // Fetch data on component mount and when month changes
  useEffect(() => {
    setPage(0); // Reset page to 0 when month changes
    fetchSalarySheetData();
  }, [month]);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Paginate the data for display
  const paginatedData = salaryData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-4">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        <TextField
          label="Month"
          type="month"
          value={month.slice(0, 7)}
          onChange={(e) => setMonth(`${e.target.value}-01`)}
          className="w-48"
          InputLabelProps={{ shrink: true }}
        />

        <Button
          variant="contained"
          className="bg-dark-background  hover:bg-dark-background text-white w-[220px]"
          onClick={fetchSalarySheetData}
        >
          Apply
        </Button>
      </div>

      {/* Total Records Display */}
      <div className="mb-4 text-lg font-semibold">
        Total Records: {totalRows}
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Present</StyledTableCell>
              <StyledTableCell>Weekend</StyledTableCell>
              <StyledTableCell>Leave</StyledTableCell>
              <StyledTableCell>Holiday</StyledTableCell>
              <StyledTableCell>Absent</StyledTableCell>
              <StyledTableCell>Salary</StyledTableCell>
              <StyledTableCell>Additional</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email || "-"}</TableCell>
                <TableCell>AL00{row.id}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.attendances.presents}</TableCell>
                <TableCell>{row.attendances.weekends}</TableCell>
                <TableCell>{row.attendances.leaves}</TableCell>
                <TableCell>{row.attendances.holidays}</TableCell>
                <TableCell>{row.attendances.absents}</TableCell>
                <TableCell>{row.salary.toLocaleString()}</TableCell>
                <TableCell>{row.additional_salary}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default SalarySheet;
