import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { User } from "@/services/types";

interface UserSelectProps {
  users: User[];
  selectedUser: string;
  onUserChange: (event: SelectChangeEvent<string>) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({
  users,
  selectedUser,
  onUserChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="user-select-label">User</InputLabel>
      <Select
        labelId="user-select-label"
        id="user-select"
        value={selectedUser}
        label="User"
        onChange={onUserChange}
        name="user_id"
      >
        {users?.map((user) => (
          <MenuItem key={user?.id} value={user?.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserSelect;
