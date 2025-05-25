import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useFetch from "@/services/hooks/UseRequest";
import ProjectSelect from "../molecules/ProjectSelect";
import { Project, Product, User } from "@/services/types";
import ProductSelect from "../molecules/ProductSelect";
import UserSelect from "../molecules/UserSelect";

interface OrderData {
  user_id: string;
  project_id: string;
  product_id: string;
  amount: number;
  payment_method: string;
  transaction_id: string;
  payment_date: string;
  payment_note: string;
}

interface OrderFormProps {
  order: OrderData | null;
  selectedProject: string;
  selectedUser: string;
  setSelectedUser: (value: string) => void;
  setSelectedProject: (value: string) => void;
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
  onOrderChange: (order: OrderData) => void;
}

const paymentMethodOptions = ["Bank", "Credit Card", "PayPal", "Cash"];

const OrderForm: React.FC<OrderFormProps> = ({
  order,
  selectedProject,
  selectedUser,
  setSelectedUser,
  setSelectedProject,
  selectedProduct,
  setSelectedProduct,
  onOrderChange,
}) => {
  const [formData, setFormData] = React.useState<OrderData>({
    user_id: "",
    project_id: "",
    product_id: "",
    amount: 0,
    payment_method: "",
    transaction_id: "",
    payment_date: "",
    payment_note: "",
  });

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useFetch<{ data: Project[] }>("admin/projects");

  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useFetch<{ data: Product[] }>("admin/products");

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useFetch<{ data: User[] }>("admin/users");

  const projects = projectData?.data || [];
  const products = productData?.data || [];
  const users = userData?.data || [];

  useEffect(() => {
    if (order) {
      setFormData(order);
      setSelectedProject(order.project_id);
      setSelectedProduct(order.product_id);
    }
  }, [order, setSelectedProject, setSelectedProduct]);

  const handleChange = (
    field: keyof OrderData,
    value: string | number | boolean
  ) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    onOrderChange(updatedFormData);
  };
  const handleProjectChange = (event: { target: { value: any } }) => {
    const selectedProjectId = event.target.value;
    setSelectedProject(selectedProjectId);
  };
  const handleProductChange = (event: { target: { value: any } }) => {
    const selectedProductId = event.target.value;
    setSelectedProduct(selectedProductId);
  };
  const handleUserChange = (event: { target: { value: any } }) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);
  };

  if (projectLoading || productLoading) return <p>Loading...</p>;
  if (projectError) return <p>Error: {projectError?.message}</p>;
  if (productError) return <p>Error: {productError?.message}</p>;
  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>Error: {userError?.message}</p>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12}>
              <UserSelect
                users={users}
                selectedUser={selectedUser}
                onUserChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12}>
              <ProjectSelect
                projects={projects}
                selectedProject={selectedProject}
                onProjectChange={handleProjectChange}
              />
            </Grid>
            <Grid item xs={12}>
              <ProductSelect
                products={products}
                selectedProduct={selectedProduct}
                onProductChange={handleProductChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="amount"
                label="Amount"
                type="number"
                variant="outlined"
                name="amount"
                fullWidth
                value={formData.amount}
                onChange={(e) =>
                  handleChange("amount", parseFloat(e.target.value) || 0)
                }
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="payment_method_label">
                  Payment Method
                </InputLabel>
                <Select
                  labelId="payment_method_label"
                  id="payment_method"
                  value={formData.payment_method}
                  onChange={(e) =>
                    handleChange("payment_method", e.target.value)
                  }
                  name="payment_method"
                  label="Payment Method"
                >
                  {paymentMethodOptions.map((method) => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="transaction_id"
                label="Transaction ID"
                variant="outlined"
                name="transaction_id"
                fullWidth
                value={formData.transaction_id}
                onChange={(e) => handleChange("transaction_id", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="payment_date"
                label="Payment Date"
                type="date"
                variant="outlined"
                name="payment_date"
                fullWidth
                value={formData.payment_date}
                onChange={(e) => handleChange("payment_date", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="payment_note"
                label="Payment Note"
                variant="outlined"
                name="payment_note"
                fullWidth
                multiline
                rows={4}
                value={formData.payment_note}
                onChange={(e) => handleChange("payment_note", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrderForm;
