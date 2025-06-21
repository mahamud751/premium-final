import React, { useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { User } from "@/services/types";
import useFetch from "@/services/hooks/UseRequest";

interface UserSelectProps {
  users: User[];
  selectedUser: string; // Should represent user.id, not user.name
  onUserChange: (event: React.SyntheticEvent, value: User | null) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({
  users: initialUsers,
  selectedUser,
  onUserChange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Fetch users based on search term
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useFetch<{ data: User[] }>(
    searchTerm
      ? `admin/users?_search=${encodeURIComponent(searchTerm)}`
      : "admin/users"
  );

  const users = userData?.data || initialUsers || [];

  // Find the selected user object based on selectedUser (user.id)
  const selectedUserObj =
    users.find((user) => user.id === selectedUser) || null;

  // Handle input change for search
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Autocomplete
      id="user-select"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={users}
      getOptionLabel={(option) => option.name || ""}
      value={selectedUserObj}
      onChange={onUserChange}
      loading={userLoading}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label="User"
          variant="outlined"
          onChange={handleInputChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {userLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default UserSelect;
