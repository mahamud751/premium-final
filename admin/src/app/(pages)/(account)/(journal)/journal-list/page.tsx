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
  const [openItemsModal, setOpenItemsModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<null | string>(null);

  const handleOpenItemsModal = (items: any[]) => {
    setSelectedItems(items);
    setOpenItemsModal(true);
  };

  const handleCloseItemsModal = () => {
    setOpenItemsModal(false);
    setSelectedItems([]);
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
      field: "project_id",
      headerName: "Project ID",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div>
          <p>{params.row.project_id}</p>
        </div>
      ),
    },
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
      field: "items",
      headerName: "Items",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: 10,
          }}
        >
          {params.row.items && params.row.items.length > 0 && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleOpenItemsModal(params.row.items)}
            >
              Items Details
            </Button>
          )}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
    {
      field: "update",
      headerName: "Status Update",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOpenStatusModal(params.row.id)}
            endIcon={<Edit />}
          >
            Update Status
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
        link="/journal-list"
      />
      {/* Items Modal */}
      <Modal
        open={openItemsModal}
        onClose={handleCloseItemsModal}
        aria-labelledby="items-modal-title"
        aria-describedby="items-modal-description"
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
            id="items-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            All Items
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="items table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell align="right">{item.qty}</TableCell>
                    <TableCell align="right">{item.unit_price}</TableCell>
                    <TableCell align="right">{item.total_price}</TableCell>
                  </TableRow>
                ))}
                {selectedItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No items available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={handleCloseItemsModal}
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
