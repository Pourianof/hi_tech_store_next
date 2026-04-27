"use client";
import { Button, CircularProgress, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { StatefulForm } from "./statefulForm";
import { Theme } from "@emotion/react";
import { ButtonLabel } from "../theme/text/buttonLabel";

const ACTIVE_PRIMARY_COLOR = "var(--color-primary-blue-0c)";
const HOVER_PRIMARY_COLOR = "var(--color-primary-blue-05)";
const DISABLED_PRIMARY_COLOR = "var(--color-primary-blue-ae)";

const ACTIVE_SECONDARY_COLOR = "var(--color-secondary-f4)";
const HOVER_SECONDARY_COLOR = "var(--color-secondary-be)";
const DISABLED_SECONDARY_COLOR = "var(--color-secondary-fd)";

interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  onClick?: VoidFunction;
  className?: string;
  type?: "button" | "submit" | "reset";
  styles?: SxProps<Theme>;
  isActive?: boolean;
  variant?: "primary" | "secondary";
}

function getVariantColors(variant: ButtonProps["variant"]) {
  const isSecondary = variant == "secondary";
  return !isSecondary
    ? {
        active: ACTIVE_PRIMARY_COLOR,
        hover: HOVER_PRIMARY_COLOR,
        disabled: DISABLED_PRIMARY_COLOR,
      }
    : {
        active: ACTIVE_SECONDARY_COLOR,
        hover: HOVER_SECONDARY_COLOR,
        disabled: DISABLED_SECONDARY_COLOR,
      };
}

export function FilledButton({
  children,
  onClick,
  className,
  disabled,
  type,
  styles,
  variant,
  ...props
}: ButtonProps & {
  noFullWidth?: boolean;
}) {
  const colors = getVariantColors(variant);
  return (
    <Button
      disabled={disabled}
      variant="contained"
      sx={{
        bgcolor: colors.active,
        textTransform: "none",
        borderRadius: "var(--radius-md)",
        paddingY: "var(--spacing-8px)",
        paddingX: "var(--spacing-16px)",
        ":hover": {
          bgcolor: colors.hover,
        },
        ":disabled": {
          bgcolor: colors.disabled,
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
      fullWidth={!props.noFullWidth}
      className={className}
      type={type}
    >
      <ButtonLabel size="lg">{children}</ButtonLabel>
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
  variant,
}: ButtonProps) {
  const colors = getVariantColors(variant);

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
      sx={{
        textTransform: "none",
        border: `2px solid ${colors.active} `,
        color: colors.active,
        borderRadius: "var(--radius-md)",
        paddingY: "var(--spacing-8px)",
        paddingX: "var(--spacing-16px)",
        ":hover": {
          border: `2px solid ${colors.hover}`,
          color: colors.hover,
        },
        ":disabled": {
          border: `2px solid ${colors.disabled}`,
          color: colors.disabled,
        },
        ...styles,
      }}
    >
      <span className=" text-button-lg">{children}</span>
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
