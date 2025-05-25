"use client";
import React, { useState } from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import IconButton from "@mui/material/IconButton";
import ApprovalIcon from "@mui/icons-material/CheckCircleOutline";
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

  const handleOpenModal = (id: number) => {
    setSelectedLeaveId(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedLeaveId(null);
  };

  const handleApprove = async () => {
    if (selectedLeaveId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/leaves-approval/${selectedLeaveId}`,
          {
            method: "POST",

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Approved" }),
          }
        );
        if (response.ok) {
          console.log("Leave approved successfully");
          // Optionally, refresh the DataTable here
        } else {
          console.error("Failed to approve leave");
        }
      } catch (error) {
        console.error("Error approving leave:", error);
      }
    }
    handleCloseModal();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "reason", headerName: "Reason", flex: 1, minWidth: 160 },
    { field: "from_date", headerName: "From Date", flex: 1, minWidth: 160 },
    { field: "to_date", headerName: "To Date", flex: 1, minWidth: 160 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <StatusButton status={params.value} />
          <IconButton
            color="primary"
            onClick={() => handleOpenModal(params.row.id)}
            title="Approve Leave"
          >
            <ApprovalIcon />
          </IconButton>
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
        searchField="name"
        link="leave-list"
      />
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="approve-leave-dialog-title"
      >
        <DialogTitle id="approve-leave-dialog-title">Approve Leave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this leave request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleApprove} color="primary" variant="contained">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeaveList;
