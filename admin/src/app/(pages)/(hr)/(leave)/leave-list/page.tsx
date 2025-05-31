"use client";
import React, { useState } from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useAuth } from "@/services/hooks/auth";

const LeaveList = () => {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "Approved" | "Rejected" | ""
  >("");
  const [refreshKey, setRefreshKey] = useState(0); // For table refresh

  const handleOpenModal = (id: number, status: "Approved" | "Rejected") => {
    setSelectedLeaveId(id);
    setSelectedStatus(status);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedLeaveId(null);
    setSelectedStatus("");
  };

  const handleStatusChange = async () => {
    if (selectedLeaveId && selectedStatus) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/leaves-approval/${selectedLeaveId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: selectedStatus }),
          }
        );
        if (response.ok) {
          console.log(`Leave ${selectedStatus.toLowerCase()} successfully`);
          setRefreshKey((prev) => prev + 1); // Trigger table refresh
        } else {
          console.error(`Failed to ${selectedStatus.toLowerCase()} leave`);
        }
      } catch (error) {
        console.error(`Error ${selectedStatus.toLowerCase()} leave:`, error);
      }
    }
    handleCloseModal();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 100 },
    { field: "reason", headerName: "Reason", flex: 1, minWidth: 200 },
    { field: "from_date", headerName: "From Date", flex: 1, minWidth: 150 },
    { field: "to_date", headerName: "To Date", flex: 1, minWidth: 150 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <StatusButton status={params.value} />
          {params.value === "Pending" && (
            <Select
              value=""
              onChange={(event: SelectChangeEvent<string>) =>
                handleOpenModal(
                  params.row.id,
                  event.target.value as "Approved" | "Rejected"
                )
              }
              displayEmpty
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="" disabled>
                Update Status
              </MenuItem>
              <MenuItem value="Approved">Approve</MenuItem>
              <MenuItem value="Rejected">Reject</MenuItem>
            </Select>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/leaves`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/leaves`}
        columns={columns}
        searchField="reason" // Changed to 'reason' since 'name' may not exist
        link="leave-list"
        isJustActionData={false}
        key={refreshKey} // Refresh table when key changes
      />
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="leave-status-dialog-title"
      >
        <DialogTitle id="leave-status-dialog-title">
          {selectedStatus} Leave
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {selectedStatus.toLowerCase()} this leave
            request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleStatusChange}
            color="primary"
            variant="contained"
          >
            {selectedStatus}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeaveList;
