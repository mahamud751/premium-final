import React from "react";
import { NotificationFormProps, Product } from "@/services/types";
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

const NotificationForm: React.FC<NotificationFormProps> = ({
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
      <Grid item xs={12} md={6}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          name="title"
          fullWidth
          defaultValue={payment?.title || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="message"
          label="Message"
          variant="outlined"
          name="message"
          fullWidth
          defaultValue={payment?.message || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default NotificationForm;
