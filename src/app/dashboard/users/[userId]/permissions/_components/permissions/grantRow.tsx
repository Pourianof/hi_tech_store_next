/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AbilityAction,
  explain,
  PermissionAbility,
  toPermissionFacts,
} from "@/core/features/permissions/ability";
import { PermissionCatalogItem } from "@/core/features/permissions/constants";
import { PermissionScope } from "@/core/features/permissions/schema";
import { PERMISSIONS } from "@/lib/auth/permissionHelper";
import Icon from "@/ui/icons/icon";
import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";

interface GrantRowProps {
  index: number;

  control: any;
  catalog: PermissionCatalogItem[];
  ability: PermissionAbility;
  disabled?: boolean;
  onRemove: () => void;
  errorMessage?: string;
}

export function GrantRow({
  index,
  control,
  catalog,
  ability,
  disabled,
  onRemove,
  errorMessage,
}: GrantRowProps) {
  const revocations = useWatch({ name: "revocations" }) as {
    revoke: boolean;
    permissionCode: string;
    scope: PermissionScope;
  }[];

  // Only offer permissions the actor is actually allowed to grant at some
  // scope — the ability engine decides this, the component just asks.
  const selectableCatalog = useMemo(
    () =>
      catalog
        .filter(
          (item) =>
            ability.can(
              AbilityAction.Grant,
              toPermissionFacts(item.code, "Self"),
            ) ||
            ability.can(
              AbilityAction.Grant,
              toPermissionFacts(item.code, "All"),
            ),
        )
        .map((item) => {
          const hasExist = revocations.some(
            (r) => r.permissionCode == item.code,
          );

          const hasRevoked = revocations.some(
            (r) => r.revoke && r.permissionCode == item.code,
          );

          return {
            isTargetPerm: hasExist,
            revoked: hasRevoked,
            ...item,
          };
        }),
    [catalog, ability, revocations],
  );

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="flex-start"
      >
        <Controller
          name={`permissions.${index}.permissionCode`}
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={selectableCatalog}
              groupBy={(option) => option.group}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.code === value.code
              }
              value={
                selectableCatalog.find((c) => c.code === field.value) ?? null
              }
              getOptionDisabled={(opt: any) => !opt.revoked && opt.isTargetPerm}
              onChange={(_, value) => field.onChange(value?.code ?? "")}
              disabled={disabled}
              sx={{ flex: 1, minWidth: 220 }}
              renderOption={(props, option) => {
                const isNotSelectable = option.isTargetPerm && !option.revoked;
                return (
                  <li
                    {...props}
                    style={{
                      ...props.style,
                      opacity: isNotSelectable ? 0.6 : 1,
                      pointerEvents: isNotSelectable
                        ? "none"
                        : props.style?.pointerEvents,
                    }}
                  >
                    <Stack width="100%" spacing={0.5}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <span>{option.label}</span>

                        {isNotSelectable && (
                          <Box
                            sx={{
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                              bgcolor: "warning.light",
                              color: "warning.contrastText",
                              fontSize: 12,
                            }}
                          >
                            Already Assigned
                          </Box>
                        )}
                      </Box>

                      {isNotSelectable && (
                        <Box
                          sx={{
                            typography: "caption",
                            color: "text.secondary",
                          }}
                        >
                          This permission is already active for the user and has
                          not expired.
                        </Box>
                      )}
                    </Stack>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Permission"
                  error={!!errorMessage}
                  helperText={errorMessage}
                />
              )}
            />
          )}
        />
        <ScopeInput
          ability={ability}
          control={control}
          index={index}
          disabled={disabled}
        />

        <IconButton
          aria-label="Remove permission"
          onClick={onRemove}
          disabled={disabled}
          sx={{ mt: { xs: 0, sm: 0.5 } }}
        >
          <Icon name="remove" />
        </IconButton>
      </Stack>
    </Box>
  );
}

function ScopeInput({
  index,
  control,
  ability,
  disabled,
}: Pick<GrantRowProps, "ability" | "control" | "index" | "disabled">) {
  const permissionCode = useWatch({
    control,
    name: `permissions.${index}.permissionCode`,
  });

  function scopeAllowed(scope: PermissionScope) {
    if (!permissionCode) return true;
    return ability.can(
      AbilityAction.Grant,
      toPermissionFacts(permissionCode, scope),
    );
  }

  const isAccessPermission = permissionCode == PERMISSIONS.access.grant;

  return (
    <Controller
      name={`permissions.${index}.scope`}
      control={control}
      render={({ field }) => (
        <ToggleButtonGroup
          exclusive
          size="small"
          value={isAccessPermission ? PermissionScope.All : field.value}
          onChange={(_, value) => value && field.onChange(value)}
          disabled={disabled}
          sx={{ mt: { xs: 0, sm: 1 } }}
        >
          {([PermissionScope.Self, PermissionScope.All] as const).map(
            (scope) => {
              const allowed = scopeAllowed(scope);
              const button = (
                <ToggleButton
                  key={scope}
                  value={scope}
                  disabled={disabled || !allowed || isAccessPermission}
                >
                  {scope}
                </ToggleButton>
              );
              if (allowed || disabled) return button;
              return (
                <Tooltip
                  key={scope}
                  title={
                    permissionCode
                      ? (explain(
                          ability,
                          AbilityAction.Grant,
                          toPermissionFacts(permissionCode, scope),
                        ) ?? "Not allowed for this permission.")
                      : ""
                  }
                >
                  <span>{button}</span>
                </Tooltip>
              );
            },
          )}
        </ToggleButtonGroup>
      )}
    />
  );
}
