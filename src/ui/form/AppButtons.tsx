import { Button } from "@mui/material";
import { ReactNode } from "react";

export function FilledButton({
  children,
  onClick,
  className,
  disabled,
  type,
}: {
  disabled?: boolean;
  children: ReactNode;
  onClick?: VoidFunction;
  className?: string;
  type?: "button" | "submit" | "reset";
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
      type={type}
    >
      {children}
    </Button>
  );
}
