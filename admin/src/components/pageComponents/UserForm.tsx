import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { UserFormProps } from "@/services/types";

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="User Name"
          name="name"
          fullWidth
          defaultValue={user?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Email"
          name="email"
          fullWidth
          defaultValue={user?.email || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          name="phone"
          fullWidth
          defaultValue={user?.phone || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Address"
          name="address"
          fullWidth
          defaultValue={user?.address || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      {!user?.id && (
        <>
          <Grid item xs={12} md={4}>
            <TextField
              id="outlined-basic"
              label="Password"
              name="password"
              fullWidth
              defaultValue={user?.password || ""}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                label="Select Type"
                name="_user_type"
                defaultValue={user?._user_type || ""}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </>
      )}
    </>
  );
};

export default UserForm;
