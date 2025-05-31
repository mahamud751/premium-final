"use client";
import React, { useState } from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useAuth } from "@/services/hooks/auth";
import StatusButton from "@/components/atoms/StatusButton";
import { Edit } from "@mui/icons-material";

const JournalList = () => {
  const { token } = useAuth();
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<any[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<null | string>(null);

  const handleOpenDetailsModal = (details: any[]) => {
    setSelectedDetails(details);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedDetails([]);
  };

  const handleOpenStatusModal = (rowId: string) => {
    setSelectedRowId(rowId);
    setOpenStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
    setSelectedRowId(null);
  };

  const handleStatusUpdate = async (status: "Confirm" | "Reject") => {
    if (!selectedRowId) return;

    try {
      const formData = new FormData();
      formData.append("status", status);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/requisitions/${selectedRowId}/status`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert(`Status updated to ${status}`);
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      handleCloseStatusModal();
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    {
      field: "reference_number",
      headerName: "Reference Number",
      flex: 1,
      minWidth: 120,
    },
    { field: "description", headerName: "Description", flex: 1, minWidth: 120 },
    {
      field: "transaction_date",
      headerName: "Transaction Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              handleOpenDetailsModal(params.row.journal_entry_details)
            }
          >
            View Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/journal-entries`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/journal-entries`}
        columns={columns}
        searchField="description"
        defaultHiddenColumns={[]}
        link="journal-list"
        isJustActionData={false}
      />
      {/* Journal Entry Details Modal */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseDetailsModal}
        aria-labelledby="details-modal-title"
        aria-describedby="details-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="details-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Journal Entry Details
          </Typography>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 500 }}
              aria-label="journal entry details table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Journal Entry ID</TableCell>
                  <TableCell>Chart of Account ID</TableCell>
                  <TableCell>Entry Type</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedDetails.map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell>{detail.id}</TableCell>
                    <TableCell>{detail.journal_entry_id}</TableCell>
                    <TableCell>{detail.chart_of_account_id}</TableCell>
                    <TableCell>{detail.entry_type}</TableCell>
                    <TableCell align="right">{detail.amount}</TableCell>
                  </TableRow>
                ))}
                {selectedDetails.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No details available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={handleCloseDetailsModal}
            sx={{ mt: 2, float: "right" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
      {/* Status Update Modal */}
      <Modal
        open={openStatusModal}
        onClose={handleCloseStatusModal}
        aria-labelledby="status-modal-title"
        aria-describedby="status-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="status-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Update Status
          </Typography>
          <Typography id="status-modal-description" sx={{ mb: 2 }}>
            Select a status for the requisition:
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleStatusUpdate("Confirm")}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleStatusUpdate("Reject")}
            >
              Reject
            </Button>
          </Box>
          <Button
            variant="outlined"
            onClick={handleCloseStatusModal}
            sx={{ mt: 2, width: "100%" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default JournalList;
