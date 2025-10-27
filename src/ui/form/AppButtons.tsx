import { Button } from "@mui/material";
import { ReactNode } from "react";

export function FilledButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: VoidFunction;
  className?: string;
}) {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: "var(--color-primary-blue-0c)",
        textTransform: "none",
        borderRadius: "6px",
        py: "10px",
        fontSize: "16px",
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      fullWidth
      className={className}
    >
      {children}
    </Button>
  );
}
