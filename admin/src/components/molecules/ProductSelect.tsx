import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Product } from "@/services/types";

interface ProductSelectProps {
  products: Product[];
  selectedProduct: string;
  onProductChange: (event: SelectChangeEvent<string>) => void;
}

const ProductSelect: React.FC<ProductSelectProps> = ({
  products,
  selectedProduct,
  onProductChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="product-select-label">Product</InputLabel>
      <Select
        labelId="product-select-label"
        id="product-select"
        value={selectedProduct}
        label="Product"
        onChange={onProductChange}
        name="product_id"
      >
        {products?.map((product) => (
          <MenuItem key={product.id} value={product.id}>
            {`${product.flat_type} ${product?.floor_number}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductSelect;
