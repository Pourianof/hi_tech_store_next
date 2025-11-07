import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

export function SimpleCheckBox({
  label,
  fieldName,
  defaultValue,
}: {
  label: React.ReactElement | string;
  fieldName: string;
  defaultValue?: boolean;
}) {
  return (
    <Controller
      defaultValue={defaultValue}
      name={fieldName}
      render={({ field: { value, onChange } }) => (
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                backgroundColor: "#f5f8fa",
              }}
              value={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          }
          label={label}
        />
      )}
    />
  );
}
