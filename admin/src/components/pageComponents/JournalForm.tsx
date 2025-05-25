// RequisitionForm.tsx
import React, { useEffect } from "react";
import {
  Journal,
  JournalFormProps,
  Project,
  Requisition,
  RequisitionFormProps,
  RequisitionItem,
  Unit,
} from "@/services/types";
import {
  Grid,
  TextField,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useFetch from "@/services/hooks/UseRequest";
import ProjectSelect from "../molecules/ProjectSelect";

const JournalForm: React.FC<JournalFormProps> = ({
  journal,
  onJournalChange,
}) => {
  const [formData, setFormData] = React.useState<Journal>({
    reference_number: "",
    description: "",
    transaction_date: "",
    details: [{ chart_of_account_id: "", entry_type: "", amount: 0 }],
  });

  const { data: accountData } = useFetch<{ data: Unit[] }>(
    "admin/chart-of-accounts"
  );

  const account = accountData?.data || [];

  useEffect(() => {
    if (journal) {
      setFormData(journal);
    }
  }, [journal]);
  const handleChange = (
    field: keyof Journal,
    value: string | number | Journal["details"]
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    onJournalChange({ ...formData, [field]: value });
  };

  const handleItemChange = (
    index: number,
    field: keyof Journal["details"][number],
    value: string | number
  ) => {
    const updatedItems = [...formData.details];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    handleChange("details", updatedItems);
  };
  const addItem = () => {
    const newItem: Journal["details"][number] = {
      chart_of_account_id: "",
      entry_type: "",
      amount: 0,
    };
    handleChange("details", [...formData.details, newItem]);
  };

  const removeItemEntry = (index: number) => {
    const updatedItems = [...formData.details];
    updatedItems.splice(index, 1);
    handleChange("details", updatedItems);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12} md={6}>
              <TextField
                id="reference_number"
                label="Reference Number"
                variant="outlined"
                name="reference_number"
                defaultValue={journal?.reference_number}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="transaction_date"
                  label="Transaction Date"
                  variant="outlined"
                  name="transaction_date"
                  type="date"
                  defaultValue={journal?.transaction_date}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <Grid item xs={12} md={6}>
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    name="description"
                    defaultValue={journal?.description}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={12} className="mt-5">
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12} md={12}>
              <h2 className="text-lg font-semibold">Journal Entries</h2>
            </Grid>
            {formData.details.map((item, index) => (
              <Grid container spacing={2} key={index} mb={2}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id={`chart_of_account_id-${index}`}>
                      Chart of Account
                    </InputLabel>
                    <Select
                      labelId={`chart_of_account_id-${index}`}
                      id={`chart_of_account_id-${index}`}
                      value={item.chart_of_account_id}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "chart_of_account_id",
                          e.target.value
                        )
                      }
                      label="Chart of Account"
                    >
                      {account.map((account) => (
                        <MenuItem key={account.id} value={account.id}>
                          {account.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id={`type-${index}`}>Type</InputLabel>
                    <Select
                      labelId="type"
                      id="type"
                      label="Type"
                      value={item.entry_type}
                      onChange={(e) =>
                        handleItemChange(index, "entry_type", e.target.value)
                      }
                    >
                      <MenuItem value="Debit">Debit</MenuItem>
                      <MenuItem value="Credit">Credit</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id={`amount-${index}`}
                    label="Amount"
                    variant="outlined"
                    name="amount"
                    type="number"
                    value={item.amount}
                    onChange={(e) =>
                      handleItemChange(index, "amount", Number(e.target.value))
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeItemEntry(index)}
                  >
                    Remove Entry
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12} md={12}>
              <Button variant="contained" onClick={addItem}>
                Add Entry
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default JournalForm;
