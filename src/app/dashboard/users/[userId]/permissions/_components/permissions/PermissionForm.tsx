"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  FormProvider,
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";

import {
  AbilityAction,
  explain,
  PermissionAbility,
} from "@/core/features/permissions/ability";

import {
  PERMISSION_CATALOG,
  resolveErrorMessage,
} from "@/core/features/permissions/constants";
import {
  useActorAbility,
  useTargetUserFacts,
} from "@/core/features/permissions/hooks";
import {
  ModifyPermissionFormValues,
  modifyPermissionSchema,
  PermissionModificationAction,
  PermissionScope,
} from "@/core/features/permissions/schema";
import { User } from "@/core/models/user";
import { updateUserPermissionsAction } from "@/lib/server_actions/authActions";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import Icon from "@/ui/icons/icon";
import { GrantRow } from "./grantRow";
import { RevocationRow } from "./revocationRow";
import { UserPermissionDto } from "@/core/Dtos/LoginDto";

const DEFAULT_GRANT_ROW = {
  permissionCode: "",
  action: PermissionModificationAction.Grant,
  scope: PermissionScope.Self,
};

function mapPermissionsToRevokationCadidates(perms: UserPermissionDto[]) {
  return perms.map((p) => ({
    permissionCode: p.code,
    scope: p.scope == 0 ? PermissionScope.All : PermissionScope.Self,
    revoke: false,
  }));
}

export default function PermissionForm() {
  const targetUser = useStaticData("target-user") as User;
  const targetUserId = targetUser.id;

  const [formError, setFormError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  // The ability engine (business logic) — loaded once, independent of any form state.
  const {
    ability,
    loading: abilityLoading,
    error: abilityError,
  } = useActorAbility();

  const methods = useForm<ModifyPermissionFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(modifyPermissionSchema) as any,
    defaultValues: {
      targetUserId: targetUserId ?? "",
      permissions: [],
      revocations: mapPermissionsToRevokationCadidates(
        targetUser.permissions ?? [],
      ),
    },
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const { append, fields, remove } = useFieldArray({
    control,
    name: "permissions",
  });

  const { fields: revocationFields } = useFieldArray({
    control,
    name: "revocations",
  });

  const { facts: targetFacts, loading: targetFactsLoading } =
    useTargetUserFacts();

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      const grants = values.permissions.map((p) => ({
        permissionCode: p.permissionCode,
        action: PermissionModificationAction.Grant,
        scope: p.scope,
      }));
      const revokes = values.revocations
        .filter((r) => r.revoke)
        .map((r) => ({
          permissionCode: r.permissionCode,
          action: PermissionModificationAction.Revoke,
          scope: r.scope,
        }));

      const result = await updateUserPermissionsAction(values.targetUserId, {
        permissions: [...grants, ...revokes],
      });

      if (result.status == "failed") {
        // The very first error is the most relevant one to surface prominently;
        // all business-rule errors returned by the service are mutually exclusive
        // guard clauses, so there's normally just one. This is the server's own
        // verdict — always trusted over whatever the client-side ability said.
        const [firstError] = Object.entries(result.data.errors ?? {});
        setFormError(
          firstError
            ? resolveErrorMessage(firstError[0], firstError[1].at(0))
            : "The request could not be completed.",
        );
        return;
      }

      setSuccessOpen(true);
      reset({
        targetUserId: values.targetUserId,
        permissions: [],
        revocations: mapPermissionsToRevokationCadidates(result.data),
      });
    } catch {
      setFormError("Something went wrong while saving. Please try again.");
    }
  });

  if (abilityLoading) {
    return (
      <Card variant="outlined" sx={{ maxWidth: 720, mx: "auto", p: 4 }}>
        <Stack alignItems="center" spacing={1.5}>
          <CircularProgress size={28} />
          <Typography variant="body2" color="text.secondary">
            Loading your permissions…
          </Typography>
        </Stack>
      </Card>
    );
  }

  if (abilityError || !ability) {
    return (
      <Card variant="outlined" sx={{ maxWidth: 720, mx: "auto" }}>
        <CardContent>
          <Alert severity="error">
            {abilityError ?? "Something went wrong."}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Business rule: GrantPermissionRequiredGrantAccess — nothing below is reachable
  // without this, so the whole form is replaced with an explanation.
  if (!ability.can(AbilityAction.Access, "PermissionForm")) {
    return (
      <Card variant="outlined" sx={{ maxWidth: 720, mx: "auto" }}>
        <CardContent>
          <Alert severity="warning" icon={<Icon name="key" />}>
            {explain(ability, AbilityAction.Access, "PermissionForm")}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const canModifyTarget = targetFacts
    ? ability.can(AbilityAction.Modify, targetFacts)
    : true;
  const targetBlockedReason = targetFacts
    ? explain(ability, AbilityAction.Modify, targetFacts)
    : undefined;
  const sectionsDisabled =
    !!targetUserId && (targetFactsLoading || !canModifyTarget);

  return (
    <FormProvider {...methods}>
      <Card variant="outlined" sx={{ maxWidth: 720, mx: "auto" }}>
        <CardHeader
          avatar={<Icon name="security" />}
          title="Modify user permissions"
          subheader="Revoke permissions the user currently holds, or grant new ones."
        />
        <Divider />
        <CardContent component="form" onSubmit={onSubmit} noValidate>
          <Stack spacing={3}>
            <Collapse in={!!formError}>
              <Alert severity="error" onClose={() => setFormError(null)}>
                {formError}
              </Alert>
            </Collapse>
            <Box
              sx={{
                p: 2,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Avatar
                  src={targetUser.avatarUrl ?? "/images/user.jpg"}
                  alt={`${targetUser.firstName} ${targetUser.lastName}`}
                  sx={{ width: 64, height: 64 }}
                >
                  {targetUser.firstName?.[0]}
                </Avatar>

                <Box>
                  <Typography variant="h6">
                    {targetUser.firstName} {targetUser.lastName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    @{targetUser.userName}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Email</Typography>
                  <Typography>{targetUser.email}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">User ID</Typography>
                  <Typography
                    fontFamily="monospace"
                    sx={{ wordBreak: "break-all" }}
                  >
                    {targetUser.id}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Collapse
              in={!!targetUserId && !targetFactsLoading && !canModifyTarget}
            >
              <Alert severity="warning" icon={<Icon name="key" />}>
                {targetBlockedReason}
              </Alert>
            </Collapse>

            {/* Current permissions — shown by default, revoke-only via a switch. */}
            <Collapse
              in={
                !!targetUserId &&
                !targetFactsLoading &&
                revocationFields.length > 0
              }
            >
              <Box sx={{ opacity: sectionsDisabled ? 0.5 : 1 }}>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  Current permissions
                </Typography>
                <Stack spacing={1}>
                  {revocationFields.map((field, index) => (
                    <RevocationRow
                      key={field.id}
                      index={index}
                      control={control}
                      ability={ability}
                      disabled={sectionsDisabled}
                    />
                  ))}
                </Stack>
              </Box>
            </Collapse>

            <Divider />

            {/* Grant new permissions — dynamic, user-added rows. */}
            <Box sx={{ opacity: sectionsDisabled ? 0.5 : 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Grant new permissions
                </Typography>
                <Button
                  size="small"
                  startIcon={<Icon name="add" />}
                  onClick={() => append(DEFAULT_GRANT_ROW)}
                  disabled={sectionsDisabled}
                >
                  Add permission
                </Button>
              </Stack>

              {errors.permissions?.root?.message ||
              (typeof errors.permissions?.message === "string" &&
                errors.permissions.message) ? (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {errors.permissions?.root?.message ??
                    errors.permissions?.message}
                </Alert>
              ) : null}

              <PermissionsList
                ability={ability}
                sectionsDisabled={sectionsDisabled}
                fields={fields}
                remove={remove}
              />
            </Box>

            <Divider />

            <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
              <Button
                type="button"
                color="inherit"
                onClick={() => reset()}
                disabled={isSubmitting}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || sectionsDisabled || !targetUserId}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : null
                }
              >
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </Stack>
          </Stack>
        </CardContent>

        <Snackbar
          open={successOpen}
          autoHideDuration={4000}
          onClose={() => setSuccessOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="success"
            onClose={() => setSuccessOpen(false)}
            sx={{ width: "100%" }}
          >
            Permissions updated successfully.
          </Alert>
        </Snackbar>
      </Card>
    </FormProvider>
  );
}

function PermissionsList({
  ability,
  sectionsDisabled,
  fields,
  remove,
}: {
  ability: PermissionAbility;
  sectionsDisabled?: boolean;
  fields: UseFieldArrayReturn<
    ModifyPermissionFormValues,
    "permissions"
  >["fields"];
  remove: (index: number) => void;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ModifyPermissionFormValues>();

  const _fields = useWatch({ name: "permissions", control });
  const revocations = useWatch({ name: "revocations", control });

  const groupedCatalog = useMemo(
    () =>
      [...PERMISSION_CATALOG].sort((a, b) => a.group.localeCompare(b.group)),
    [],
  );

  const currentStateSet = useMemo(
    () =>
      new Set(
        _fields.filter((f) => !!f.permissionCode).map((f) => f.permissionCode),
      ),
    [_fields],
  );

  useEffect(() => {
    if (!_fields.length) {
      return;
    }

    // by default the curren user's permissions are blocked to use
    // but if they marked as revoked, we can assign them again
    // and if then actor decide to undo the revokation, so we
    // remove the permissions with matched code we assigned to user
    for (const revoke of revocations) {
      if (!revoke.revoke && currentStateSet.has(revoke.permissionCode)) {
        remove(
          _fields.findIndex((f) => f.permissionCode == revoke.permissionCode),
        );
      }
    }
  }, [_fields, currentStateSet, remove, revocations]);

  return (
    <Stack spacing={2}>
      {fields.map((field, index) => (
        <GrantRow
          key={field.id}
          index={index}
          control={control}
          catalog={groupedCatalog.filter(
            (catalogField) =>
              _fields.at(index)?.permissionCode == catalogField.code ||
              !currentStateSet.has(catalogField.code),
          )}
          ability={ability}
          disabled={sectionsDisabled}
          onRemove={() => remove(index)}
          errorMessage={errors.permissions?.[index]?.permissionCode?.message}
        />
      ))}
      {fields.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No new permissions added yet.
        </Typography>
      )}
    </Stack>
  );
}
