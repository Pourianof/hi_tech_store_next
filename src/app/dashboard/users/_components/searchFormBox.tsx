import Icon from "@/ui/icons/icon";
import {
  Paper,
  Stack,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState, FormEvent } from "react";
import { UserFilter } from "./types";

export function SearchFormBox({
  setFilters,
}: {
  setFilters: (filters: UserFilter) => void;
}) {
  const [draftFilters, setDraftFilters] = useState<UserFilter>({
    email: "",
    username: "",
    id: "",
  });

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilters({ ...draftFilters });
  };

  const clearFilters = () => {
    const emptyFilters = { email: "", username: "", id: "" };
    setDraftFilters(emptyFilters);
    setFilters(emptyFilters);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Filter by email, username or user id
          </Typography>
          <Typography variant="h6">Search users</Typography>
        </Box>
        <Box component="form" onSubmit={handleSearch}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="flex-end"
          >
            <TextField
              fullWidth
              size="small"
              label="Email"
              value={draftFilters.email}
              onChange={(event) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="email" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              size="small"
              label="Username"
              value={draftFilters.username}
              onChange={(event) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  username: event.target.value,
                }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="user" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              size="small"
              label="Search by ID"
              value={draftFilters.id}
              onChange={(event) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  id: event.target.value,
                }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="search" />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" spacing={1}>
              <Button type="submit" variant="contained" size="medium">
                Search
              </Button>
              <Button variant="outlined" size="medium" onClick={clearFilters}>
                Clear
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
