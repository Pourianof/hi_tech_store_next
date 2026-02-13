"use client";
import { Button, CircularProgress, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { StatefulForm } from "./statefulForm";
import { Theme } from "@emotion/react";

interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  onClick?: VoidFunction;
  className?: string;
  type?: "button" | "submit" | "reset";
  styles?: SxProps<Theme>;
  isActive?: boolean;
}

export function FilledButton({
  children,
  onClick,
  className,
  disabled,
  type,
  styles,
}: ButtonProps) {
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
        ...styles,
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

export function OutlinedButton({
  children,
  onClick,
  className,
  disabled,
  type,
  styles,
}: ButtonProps) {
  return (
    <Button
      disabled={disabled}
      variant="outlined"
      onClick={
        onClick
          ? (e) => {
              e.preventDefault();
              onClick?.();
            }
          : undefined
      }
      className={className}
      type={type}
      sx={styles}
    >
      {children}
    </Button>
  );
}

export function TextButton({
  children,
  onClick,
  className,
  isActive,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={[
        "cursor-pointer py-0.5 px-1.5 transition-colors rounded-full hover:bg-slate-400 hover:text-slate-100",
        className ?? "",
        isActive ? "bg-[#7685dc]! text-slate-100" : "",
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export function FlatButton({
  children,
  onClick,
  className,
  disabled,
  type,
  styles,
}: ButtonProps) {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      sx={{
        // bgcolor: "var(--color-primary-blue-0c)",
        textTransform: "none",
        borderRadius: "0",
        py: "10px",
        fontSize: "16px",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
        ...styles,
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
