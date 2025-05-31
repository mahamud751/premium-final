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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "@/services/hooks/auth";

// Interfaces for TypeScript
interface EventData {
  id: string;
  name: string;
  email: string | null;
  department: string;
  designation: string;
  start: string;
  punched_at: string;
  title: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  allDay: boolean;
}

interface FilterOption {
  id: number;
  name: string;
}

interface EventResponse {
  status: string;
  data: EventData[];
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

const AttendencePreview: React.FC = () => {
  // State for table data and filter options
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [departments, setDepartments] = useState<FilterOption[]>([]);
  const [designations, setDesignations] = useState<FilterOption[]>([]);
  const [employees, setEmployees] = useState<FilterOption[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<"Active" | "Inactive">(
    "Active"
  );
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

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

  // Fetch departments, designations, and employees
  const fetchFilterOptions = async () => {
    try {
      const [deptResponse, desigResponse, empResponse] = await Promise.all([
        api.get("/v1/admin/departments"),
        api.get("/v1/admin/designations"),
        api.get("/v1/admin/employees"),
      ]);
      setDepartments(deptResponse.data.data || []);
      setDesignations(desigResponse.data.data || []);
      setEmployees(empResponse.data.data || []);
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  // Fetch event data from API (GET)
  const fetchEventData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        from_date: fromDate,
        to_date: toDate,
        department_id: selectedDepartment || "",
        status: selectedStatus,
        designation_id: selectedDesignation || "",
        user_id: selectedEmployee || "",
      }).toString();

      const response = await api.get<EventResponse>(
        `/v1/admin/attendances?${queryParams}`
      );
      if (response.data.status === "success") {
        const data = response.data.data;
        setEventData(data);
        setTotalRows(data.length);
      } else {
        setEventData([]);
        setTotalRows(0);
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
      setEventData([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  };

  // Handle Apply button click
  const handleApply = () => {
    fetchEventData();
  };

  // Fetch filter options on component mount
  useEffect(() => {
    fetchFilterOptions();
  }, []);

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
  const paginatedData = eventData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-4">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        <FormControl className="w-48">
          <InputLabel>Department</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value as string)}
            disabled={loading}
            label="Department"
          >
            <MenuItem value="">All Department</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id.toString()}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="w-48">
          <InputLabel>Designation</InputLabel>
          <Select
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value as string)}
            disabled={loading}
            label="Designation"
          >
            <MenuItem value="">All Designation</MenuItem>
            {designations.map((desig) => (
              <MenuItem key={desig.id} value={desig.id.toString()}>
                {desig.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="w-48">
          <InputLabel>Employee</InputLabel>
          <Select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value as string)}
            disabled={loading}
            label="Employee"
          >
            <MenuItem value="">All Employee</MenuItem>
            {employees.map((emp) => (
              <MenuItem key={emp.id} value={emp.id.toString()}>
                {emp.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="w-48">
          <InputLabel>Employee Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as "Active" | "Inactive")
            }
            disabled={loading}
            label="Employee Status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="From Date"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-48"
          disabled={loading}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="To Date"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-48"
          disabled={loading}
          InputLabelProps={{ shrink: true }}
        />

        <Button
          variant="contained"
          className="bg-dark-background hover:bg-dark-background text-white w-[220px]"
          onClick={handleApply}
          disabled={loading}
        >
          {loading ? "Loading..." : "Apply"}
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
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>All Day</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData?.map((row) => (
                <StyledTableRow key={row.id || `${row.name}-${row.start}`}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email || "-"}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell>{row.start}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.allDay ? "Yes" : "No"}</TableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <TableCell colSpan={8} align="center">
                  {loading ? "Loading..." : "No data available"}
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
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

export default AttendencePreview;
