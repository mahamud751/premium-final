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

interface FilterOption {
  id: number;
  name: string;
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

const SalaryPreview: React.FC = () => {
  // State for table data and filter options
  const [salaryData, setSalaryData] = useState<SalaryData[]>([]);
  const [departments, setDepartments] = useState<FilterOption[]>([]);
  const [designations, setDesignations] = useState<FilterOption[]>([]);
  const [employees, setEmployees] = useState<FilterOption[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<"Active" | "Inactive">(
    "Active"
  );
  const [month, setMonth] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
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

  // Fetch salary data from API (GET)
  const fetchSalaryData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        salary_month: month,
        department_id: selectedDepartment || "",
        status: selectedStatus,
        designation_id: selectedDesignation || "",
        user_id: selectedEmployee || "",
      }).toString();

      const response = await api.get<SalaryResponse>(
        `/v1/admin/salary-preview?${queryParams}`
      );
      if (response.data.status === "success") {
        const data = response.data.data;
        setSalaryData(data);
        setTotalRows(data.length);
      } else {
        setSalaryData([]);
        setTotalRows(0);
      }
    } catch (error) {
      console.error("Error fetching salary data:", error);
      setSalaryData([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  };

  // Generate salary (POST)
  const generateSalary = async () => {
    setLoading(true);
    try {
      const payload = {
        salary_month: month,
        department_id: selectedDepartment || "",
        status: selectedStatus,
        designation_id: selectedDesignation || "",
        user_id: selectedEmployee || "",
      };

      const response = await api.post("/v1/admin/salary-generate", payload);
      if (response.data.status === "success") {
        console.log("Salary generated successfully:", response.data);
        // Refresh the salary preview data after generating
        await fetchSalaryData();
      }
    } catch (error) {
      console.error("Error generating salary:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Apply button click
  const handleApply = () => {
    fetchSalaryData();
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
  const paginatedData = salaryData.slice(
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
          label="Month"
          type="month"
          value={month.slice(0, 7)}
          onChange={(e) => setMonth(`${e.target.value}-01`)}
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

        <Button
          variant="contained"
          className="bg-dark-background hover:bg-dark-background text-white w-[220px]"
          onClick={generateSalary}
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate Salary Sheet"}
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
              <StyledTableCell>Payable</StyledTableCell>
              <StyledTableCell>Additional</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
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
                  <TableCell>{row.salary}</TableCell>
                  <TableCell>{row.payable_salary}</TableCell>
                  <TableCell>{row.additional_salary}</TableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <TableCell colSpan={13} align="center">
                  {loading ? "Loading..." : "No data available"}
                </TableCell>
              </StyledTableRow>
            )}
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

export default SalaryPreview;
