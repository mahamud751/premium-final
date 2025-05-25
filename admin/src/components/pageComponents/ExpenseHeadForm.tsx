import React from "react";
import { ExpenseHead } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface ExpenseFormProps {
  expenseHead: ExpenseHead | null;
}

const ExpenseHeadForm: React.FC<ExpenseFormProps> = ({ expenseHead }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="expense-head-name"
          label="Expense Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={expenseHead?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="expense-head-unit"
          label="Expense Head Unit"
          variant="outlined"
          name="unit"
          fullWidth
          defaultValue={expenseHead?.unit || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default ExpenseHeadForm;
