// @ts-nocheck
"use client";
import React, { useState } from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";

const ProjectList = () => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [updateFormData, setUpdateFormData] = useState({
    lead_id: 6,
    date: "20-08-2025",
    summary: "vdvc c",
    next_followup_date: "21-08-2025",
    remarks: "dvklarsvlk",
  });
  const [createFormData, setCreateFormData] = useState({
    lead_id: 6,
    date: "21-08-2025",
    summary: "ed;w'efdlw",
    next_followup_date: "",
    remarks: "",
  });

  const columns: GridColDef[] = [
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "customer_profession",
      headerName: "Customer Profession",
      flex: 1,
      minWidth: 120,
    },
    { field: "designation", headerName: "Designation", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 120 },
    {
      field: "lead_date",
      headerName: "Lead Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "lead_source",
      headerName: "Lead Source",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "lead_status",
      headerName: "Lead Status",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "organization_name",
      headerName: "Organization Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 300,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setSelectedLeadId(params.row.id);
              setUpdateModalOpen(true);
            }}
            style={{ marginRight: 8 }}
          >
            Update Details
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              setSelectedLeadId(params.row.id);
              setCreateModalOpen(true);
            }}
          >
            Create Details
          </Button>
        </>
      ),
    },
  ];

  const handleUpdateSubmit = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const formData = new FormData();
      Object.entries(updateFormData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/lead-details/${selectedLeadId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setUpdateModalOpen(false);
        // Optionally refresh table data
      }
    } catch (error) {
      console.error("Error updating lead details:", error);
    }
  };

  const handleCreateSubmit = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const formData = new FormData();
      Object.entries(createFormData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/lead-details/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setCreateModalOpen(false);
        // Optionally refresh table data
      }
    } catch (error) {
      console.error("Error creating lead details:", error);
    }
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/leads`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/leads`}
        columns={columns}
        searchField="name"
        defaultHiddenColumns={[""]}
        link="leed-list"
      />

      {/* Update Modal */}
      <Modal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        aria-labelledby="update-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography
            id="update-modal-title"
            variant="h6"
            component="h2"
            mb={3}
          >
            Update Lead Details
          </Typography>
          <TextField
            fullWidth
            label="Lead ID"
            value={updateFormData.lead_id}
            disabled
            margin="normal"
          />
          <TextField
            fullWidth
            label="Date"
            value={updateFormData.date}
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, date: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Summary"
            value={updateFormData.summary}
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, summary: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Next Follow-up Date"
            value={updateFormData.next_followup_date}
            onChange={(e) =>
              setUpdateFormData({
                ...updateFormData,
                next_followup_date: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Remarks"
            value={updateFormData.remarks}
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, remarks: e.target.value })
            }
            margin="normal"
          />
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setUpdateModalOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleUpdateSubmit} variant="contained">
              Update
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Create Modal */}
      <Modal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        aria-labelledby="create-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography
            id="create-modal-title"
            variant="h6"
            component="h2"
            mb={3}
          >
            Create Lead Details
          </Typography>
          <TextField
            fullWidth
            label="Lead ID"
            value={createFormData.lead_id}
            disabled
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Date"
            value={createFormData.date}
            onChange={(e) =>
              setCreateFormData({ ...createFormData, date: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Summary"
            value={createFormData.summary}
            onChange={(e) =>
              setCreateFormData({ ...createFormData, summary: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Next Follow-up Date"
            value={createFormData.next_followup_date}
            onChange={(e) =>
              setCreateFormData({
                ...createFormData,
                next_followup_date: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Remarks"
            value={createFormData.remarks}
            onChange={(e) =>
              setCreateFormData({ ...createFormData, remarks: e.target.value })
            }
            margin="normal"
          />
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setCreateModalOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleCreateSubmit} variant="contained">
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectList;
