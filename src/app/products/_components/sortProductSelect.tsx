"use client";

import {
  BaseSelectProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useRouter } from "next/navigation";

const SORT_OPTIONS = {
  "price.asc": "Price: ascending",
  "price.des": "Price: descending",
  created_at: "New Arrivals",
};

type SORT_PARAMS = keyof typeof SORT_OPTIONS;

export function SortProductSelect() {
  const router = useRouter();

  function onSortChange(
    event: Parameters<NonNullable<BaseSelectProps<unknown>["onChange"]>>[0]
  ) {
    const { value } = event.target as { value: SORT_PARAMS };
    const url = new URL(window.location.href);
    if (value == "created_at") {
      url.searchParams.delete("sortBy");
      url.searchParams.delete("sortDir");
    } else {
      const sort = value.split(".");
      url.searchParams.set("sortBy", sort[0]);
      url.searchParams.set("sortDir", sort[1]);
    }
    router.push(url.href);
  }

  return (
    <div>
      <FormControl sx={{ minWidth: 180 }} fullWidth>
        <InputLabel id="demo-simple-select-required-label">
          Sort by: feature
        </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          variant="outlined"
          renderValue={(val) => {
            if (!val) return "Sort By: featured";
            return SORT_OPTIONS[val as unknown as SORT_PARAMS];
          }}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  borderRadius: "10px",
                  marginTop: "5px",
                },
              },
            },
          }}
          sx={{
            border: "none",
            outline: "none",
            ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" },
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          fullWidth={true}
          className="shadow-lg"
          onChange={onSortChange}
          // input={<BootstrapInput />}
        >
          {Object.entries(SORT_OPTIONS).map(([key, val]) => (
            <MenuItem key={key} value={key}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
