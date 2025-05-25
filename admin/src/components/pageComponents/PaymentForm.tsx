import React from "react";
import { PaymentFormProps, Product } from "@/services/types";
import {
  Grid,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import useFetch from "@/services/hooks/UseRequest";

const PaymentForm: React.FC<PaymentFormProps> = ({
  payment,
  selectedProduct,
  setSelectedProduct,
}) => {
  const { data: responseData } = useFetch<{ data: Product[] }>(
    "admin/products"
  );

  const products = responseData?.data || [];

  const handleProductChange = (event: { target: { value: any } }) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="product-select-label">Product</InputLabel>
                <Select
                  labelId="product-select-label"
                  id="product-select"
                  value={selectedProduct}
                  label="Entity"
                  onChange={handleProductChange}
                  name="entity_id"
                >
                  {products?.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {`${product.flat_type} ${product?.floor_number}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          name="amount"
          fullWidth
          defaultValue={payment?.amount || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="transaction_id"
          label="Transaction ID"
          variant="outlined"
          name="transaction_id"
          fullWidth
          defaultValue={payment?.transaction_id || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid item xs={12} md={8}>
          <TextField
            id="payment_note"
            label="Payment Note"
            variant="outlined"
            name="payment_note"
            fullWidth
            defaultValue={payment?.payment_note || ""}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="payment_date"
            label="Payment Date"
            type="date"
            variant="outlined"
            name="payment_date"
            fullWidth
            defaultValue={payment?.payment_date || ""}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentForm;
