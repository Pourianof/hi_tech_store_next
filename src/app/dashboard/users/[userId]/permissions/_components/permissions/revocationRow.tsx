// ---------------------------------------------------------------------------
// Current-permission row: read-only permission + scope, with a Switch that's
// the only way to request a revoke. Disabled (with a tooltip reason) when
// the ability engine says the actor isn't allowed to revoke this one.
// ---------------------------------------------------------------------------

import {
  AbilityAction,
  explain,
  PermissionAbility,
  toPermissionFacts,
} from "@/core/features/permissions/ability";
import { PERMISSION_CATALOG } from "@/core/features/permissions/constants";
import { Chip, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { Controller, useWatch } from "react-hook-form";

interface RevocationRowProps {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  ability: PermissionAbility;
  disabled?: boolean;
}

export function RevocationRow({
  index,
  control,
  ability,
  disabled,
}: RevocationRowProps) {
  const permissionCode = useWatch({
    control,
    name: `revocations.${index}.permissionCode`,
  });
  const scope = useWatch({ control, name: `revocations.${index}.scope` });

  const canRevoke = ability.can(
    AbilityAction.Revoke,
    toPermissionFacts(permissionCode, scope, scope),
  );
  const reason = !canRevoke
    ? explain(
        ability,
        AbilityAction.Revoke,
        toPermissionFacts(permissionCode, scope, scope),
      )
    : undefined;

  const row = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{
        p: 1.25,
        px: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" flex={1}>
        <Typography variant="body2">
          {permissionLabel(permissionCode)}
        </Typography>
        <Chip size="small" variant="outlined" label={scope} />
      </Stack>
      <Controller
        name={`revocations.${index}.revoke`}
        control={control}
        render={({ field }) => (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography
              variant="caption"
              color={field.value ? "error.main" : "text.secondary"}
            >
              {field.value ? "Will be revoked" : "Keep"}
            </Typography>
            <Switch
              size="small"
              color="error"
              checked={field.value}
              disabled={disabled || !canRevoke}
              onChange={(e) => field.onChange(e.target.checked)}
              value={field.value}
              inputProps={{
                "aria-label": `Revoke ${permissionLabel(permissionCode)}`,
              }}
            />
          </Stack>
        )}
      />
    </Stack>
  );

  if (canRevoke || disabled) return row;

  return (
    <Tooltip title={reason ?? "You're not allowed to revoke this permission."}>
      <span>{row}</span>
    </Tooltip>
  );
}

function permissionLabel(code: string): string {
  return PERMISSION_CATALOG.find((p) => p.code === code)?.label ?? code;
}
