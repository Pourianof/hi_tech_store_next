import { Button } from "@mui/material";
import { ReactNode } from "react";

export function FilledButton({
  children,
  onClick,
  className,
  disabled,
}: {
  disabled?: boolean;
  children: ReactNode;
  onClick?: VoidFunction;
  className?: string;
}) {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      sx={{
        bgcolor: "var(--color-primary-blue-0c)",
        textTransform: "none",
        borderRadius: "6px",
        py: "10px",
        fontSize: "16px",
      }}
      onClick={
        onClick
          ? (e) => {
              e.preventDefault();
              onClick?.();
            }
          : undefined
      }
      fullWidth
      className={className}
    >
      {children}
    </Button>
  );
}
