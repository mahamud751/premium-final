// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Snackbar, Alert, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAuth } from "@/services/hooks/auth";

const BASE_URL = "https://erp.samironbarai.xyz";

interface Schedule {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  is_weekend: boolean | string;
  created_by: number;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: string;
  code: number;
  message: string;
  data: Schedule[];
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

const fetchWeekends = async (token: string): Promise<Schedule[]> => {
  try {
    const response = await fetch(`${BASE_URL}/v1/admin/weekends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data: ApiResponse = await response.json();
    if (data.status === "success") {
      return data.data;
    }
    throw new Error(data.message || "Failed to fetch weekends");
  } catch (error) {
    console.error("Error fetching weekends:", error);
    throw error;
  }
};

const updateWeekends = async (
  schedules: Schedule[],
  token: string
): Promise<ApiResponse> => {
  const formattedSchedules = schedules.map((schedule) => ({
    id: schedule.id,
    start_time: schedule.start_time,
    end_time: schedule.end_time,
    is_weekend: schedule.is_weekend ? 1 : 0,
  }));
  try {
    const response = await fetch(`${BASE_URL}/v1/admin/weekends`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ schedules: formattedSchedules }),
    });
    const data: ApiResponse = await response.json();
    if (data.status === "success") {
      return data;
    }
    throw new Error(data.message || "Failed to update weekends");
  } catch (error) {
    console.error("Error updating weekends:", error);
    throw error;
  }
};

export default function WeekendSchedules() {
  const { token } = useAuth();
  const [rows, setRows] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const loadData = async () => {
      if (!token) {
        setSnackbar({
          open: true,
          message: "Authentication token is lacking",
          severity: "error",
        });
        return;
      }
      setLoading(true);
      try {
        const data = await fetchWeekends(token);
        const formattedData = data.map((row) => ({
          ...row,
          is_weekend: !!row.is_weekend,
        }));
        setRows(formattedData);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to load schedules",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  const parseTimeString = (timeString: string | null): Date | null => {
    if (!timeString) return null;
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds || 0);
    return date;
  };

  const formatTimeString = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().slice(11, 19);
  };

  const validateRows = (
    rows: Schedule[]
  ): { valid: boolean; message?: string } => {
    for (const row of rows) {
      if (!row.start_time || !row.end_time) {
        return {
          valid: false,
          message: `Start time and end time are required for ${row.name}`,
        };
      }
      const start = parseTimeString(row.start_time);
      const end = parseTimeString(row.end_time);
      if (start && end && start >= end) {
        return {
          valid: false,
          message: `End time must be after start time for ${row.name}`,
        };
      }
    }
    return { valid: true };
  };

  const handleSave = async () => {
    if (!token) {
      setSnackbar({
        open: true,
        message: "Authentication token is missing",
        severity: "error",
      });
      return;
    }

    const validation = validateRows(rows);
    if (!validation.valid) {
      setSnackbar({
        open: true,
        message: validation.message || "Invalid data",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await updateWeekends(rows, token);
      const updatedData = await fetchWeekends(token);
      const formattedData = updatedData.map((row) => ({
        ...row,
        is_weekend: !!row.is_weekend,
      }));
      setRows(formattedData);
      setSnackbar({
        open: true,
        message: "Schedules updated successfully",
        severity: "success",
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: `Failed to update schedules: ${error.message}`,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100, editable: false },
    { field: "name", headerName: "Day", width: 150, editable: false },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 150,
      editable: true,
      renderCell: (params) => {
        const time = parseTimeString(params.value as string);
        return time
          ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "";
      },
      renderEditCell: (params) => (
        <TimePicker
          value={parseTimeString(params.value as string)}
          onChange={(newValue) => {
            const timeString = formatTimeString(newValue);
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: timeString,
            });
          }}
          renderInput={(inputProps: any) => (
            <TextField {...inputProps} fullWidth autoFocus />
          )}
        />
      ),
    },
    {
      field: "end_time",
      headerName: "End Time",
      width: 150,
      editable: true,
      renderCell: (params) => {
        const time = parseTimeString(params.value as string);
        return time
          ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "";
      },
      renderEditCell: (params) => (
        <TimePicker
          value={parseTimeString(params.value as string)}
          onChange={(newValue) => {
            const timeString = formatTimeString(newValue);
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: timeString,
            });
          }}
          renderInput={(inputProps) => (
            <TextField {...inputProps} fullWidth autoFocus />
          )}
        />
      ),
    },
    {
      field: "is_weekend",
      headerName: "Is Weekend",
      width: 120,
      editable: true,
      type: "boolean",
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <h1>Weekend Schedules</h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            disableSelectionOnClick
            loading={loading}
            processRowUpdate={(updatedRow, originalRow) => {
              setRows(
                rows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
              );
              return updatedRow;
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading || !token}
          style={{ marginTop: "20px" }}
        >
          Save Changes
        </Button>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </LocalizationProvider>
  );
}
