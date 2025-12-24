import { Button, CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import { StatefulForm } from "./statefulForm";

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

export function SubmitSensitiveButton({ children }: { children: ReactNode }) {
  return (
    <StatefulForm.Submitter
      render={(_, isSubmitting) => (
        <FilledButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress /> : children}
        </FilledButton>
      )}
    />
  );
}
