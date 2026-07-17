import { describe, expect, it } from "vitest";
import {
  ACCESS_GRANT_PERMISSION_CODE,
  ActorContext,
  defineAbilityFor,
  toPermissionFacts,
  toTargetUserFacts,
} from "./ability";

const plainTarget = toTargetUserFacts({
  id: "target-1",
  isAdmin: false,
  isManager: false,
  permissions: [],
});

describe("defineAbilityFor — access gate", () => {
  // if (!isActorAdmin && !actorPermissions.Any(access:grant)) -> GrantPermissionRequiredGrantAccess
  it("blocks access when the actor lacks access:grant and is not admin", () => {
    const actor: ActorContext = {
      id: "a1",
      isAdmin: false,
      isManager: false,
      permissions: [],
    };
    expect(defineAbilityFor(actor).can("access", "PermissionForm")).toBe(false);
  });

  it("admins bypass the access:grant requirement entirely", () => {
    const actor: ActorContext = {
      id: "a1",
      isAdmin: true,
      isManager: false,
      permissions: [],
    };
    expect(defineAbilityFor(actor).can("access", "PermissionForm")).toBe(true);
  });

  it("a non-admin holding access:grant (any scope) gets access", () => {
    const actor: ActorContext = {
      id: "a1",
      isAdmin: false,
      isManager: false,
      permissions: [{ code: ACCESS_GRANT_PERMISSION_CODE, scope: "Self" }],
    };
    expect(defineAbilityFor(actor).can("access", "PermissionForm")).toBe(true);
  });
});

describe("defineAbilityFor — grant/revoke scope matching (exact, not hierarchical)", () => {
  // Actor must hold the EXACT scope requested — holding "All" does not
  // automatically permit granting "Self", and vice versa.
  it("cannot grant a permission the actor does not hold at all", () => {
    const actor: ActorContext = {
      id: "a1",
      isAdmin: false,
      isManager: false,
      permissions: [{ code: ACCESS_GRANT_PERMISSION_CODE, scope: "Self" }],
    };
    const ability = defineAbilityFor(actor);
    expect(
      ability.can("grant", toPermissionFacts("product:create", "Self")),
    ).toBe(false);
  });

  it("cannot grant/revoke a scope the actor holds a different scope for", () => {
    const actor: ActorContext = {
      id: "a1",
      isAdmin: false,
      isManager: false,
      permissions: [
        { code: ACCESS_GRANT_PERMISSION_CODE, scope: "Self" },
        { code: "product:create", scope: "Self" },
      ],
    };
    const ability = defineAbilityFor(actor);

    expect(
      ability.can("grant", toPermissionFacts("product:create", "All")),
    ).toBe(false);
    expect(
      ability.can("revoke", toPermissionFacts("product:create", "All")),
    ).toBe(false);
    expect(
      ability.can("grant", toPermissionFacts("product:create", "Self")),
    ).toBe(true);
  });

  it("holding All does not implicitly grant Self eligibility (exact match only)", () => {
    const actor: ActorContext = {
      id: "a1",
      isAdmin: false,
      isManager: false,
      permissions: [
        { code: ACCESS_GRANT_PERMISSION_CODE, scope: "Self" },
        { code: "product:create", scope: "All" },
      ],
    };
    const ability = defineAbilityFor(actor);

    expect(
      ability.can("grant", toPermissionFacts("product:create", "All")),
    ).toBe(true);
    expect(
      ability.can("grant", toPermissionFacts("product:create", "Self")),
    ).toBe(false);
  });
});

describe("defineAbilityFor — access:grant is admin-only, even for holders", () => {
  // if (!isActorAdmin && permission.Code == Access.Grant) -> ForbiddenAccessGranting
  // Applies even if the non-admin actor personally holds access:grant.
  it("a non-admin can never grant or revoke access:grant, even if they hold it", () => {
    const actor: ActorContext = {
      id: "a1",
      isAdmin: false,
      isManager: false,
      permissions: [{ code: ACCESS_GRANT_PERMISSION_CODE, scope: "All" }],
    };
    const ability = defineAbilityFor(actor);
    expect(
      ability.can(
        "grant",
        toPermissionFacts(ACCESS_GRANT_PERMISSION_CODE, "All"),
      ),
    ).toBe(false);
    expect(
      ability.can(
        "revoke",
        toPermissionFacts(ACCESS_GRANT_PERMISSION_CODE, "All"),
      ),
    ).toBe(false);
  });

  // Admins still need to hold access:grant themselves at the matching scope —
  // being admin only removes the outright ban, not the ownership/scope check.
  it("an admin who doesn't hold access:grant still cannot grant it", () => {
    const actor: ActorContext = {
      id: "a1",
      isAdmin: true,
      isManager: false,
      permissions: [],
    };
    const ability = defineAbilityFor(actor);
    expect(
      ability.can(
        "grant",
        toPermissionFacts(ACCESS_GRANT_PERMISSION_CODE, "All"),
      ),
    ).toBe(false);
  });

  it("an admin who holds access:grant at the matching scope can grant it", () => {
    const actor: ActorContext = {
      id: "a1",
      isAdmin: true,
      isManager: false,
      permissions: [{ code: ACCESS_GRANT_PERMISSION_CODE, scope: "All" }],
    };
    const ability = defineAbilityFor(actor);
    expect(
      ability.can(
        "grant",
        toPermissionFacts(ACCESS_GRANT_PERMISSION_CODE, "All"),
      ),
    ).toBe(true);
    expect(
      ability.can(
        "grant",
        toPermissionFacts(ACCESS_GRANT_PERMISSION_CODE, "Self"),
      ),
    ).toBe(false);
  });
});

describe("defineAbilityFor — modifying the target user", () => {
  const actorWithAccess: ActorContext = {
    id: "a1",
    isAdmin: false,
    isManager: false,
    permissions: [{ code: ACCESS_GRANT_PERMISSION_CODE, scope: "All" }],
  };

  it("a non-admin cannot modify a manager or admin target", () => {
    const ability = defineAbilityFor(actorWithAccess);
    const managerTarget = toTargetUserFacts({
      id: "t1",
      isAdmin: false,
      isManager: true,
      permissions: [],
    });
    const adminTarget = toTargetUserFacts({
      id: "t2",
      isAdmin: true,
      isManager: false,
      permissions: [],
    });

    expect(ability.can("modify", managerTarget)).toBe(false);
    expect(ability.can("modify", adminTarget)).toBe(false);
    expect(ability.can("modify", plainTarget)).toBe(true);
  });

  it("an admin can modify a manager but not another admin", () => {
    const admin: ActorContext = {
      id: "a1",
      isAdmin: true,
      isManager: false,
      permissions: [],
    };
    const ability = defineAbilityFor(admin);
    const managerTarget = toTargetUserFacts({
      id: "t1",
      isAdmin: false,
      isManager: true,
      permissions: [],
    });
    const adminTarget = toTargetUserFacts({
      id: "t2",
      isAdmin: true,
      isManager: false,
      permissions: [],
    });

    expect(ability.can("modify", managerTarget)).toBe(true);
    expect(ability.can("modify", adminTarget)).toBe(false);
  });

  it("locks a target that holds access:grant, unless actor is admin or manager", () => {
    const lockedTarget = toTargetUserFacts({
      id: "t1",
      isAdmin: false,
      isManager: false,
      permissions: [{ code: ACCESS_GRANT_PERMISSION_CODE, scope: "Self" }],
    });

    expect(defineAbilityFor(actorWithAccess).can("modify", lockedTarget)).toBe(
      false,
    );

    const managerActor: ActorContext = {
      ...actorWithAccess,
      isManager: true,
    };
    expect(defineAbilityFor(managerActor).can("modify", lockedTarget)).toBe(
      true,
    );

    const adminActor: ActorContext = {
      id: "a2",
      isAdmin: true,
      isManager: false,
      permissions: [],
    };
    expect(defineAbilityFor(adminActor).can("modify", lockedTarget)).toBe(true);
  });
});

describe("defineAbilityFor — revoke scope vs target's actual scope", () => {
  // Cannot revoke "All" from a target that only actually holds "Self".
  it("blocks revoking All when the target only holds Self", () => {
    const actor: ActorContext = {
      id: "a1",
      isAdmin: false,
      isManager: false,
      permissions: [
        { code: ACCESS_GRANT_PERMISSION_CODE, scope: "All" },
        { code: "product:create", scope: "All" },
      ],
    };
    const ability = defineAbilityFor(actor);

    // Actor holds "All" themselves, but the target's actual grant is only
    // "Self" — revoking "All" from them doesn't correspond to a real grant.
    expect(
      ability.can("revoke", toPermissionFacts("product:create", "All", "Self")),
    ).toBe(false);
  });

  it("allows revoking a scope the actor holds exactly, matching the target's actual grant", () => {
    const actorWithSelfScope: ActorContext = {
      id: "a2",
      isAdmin: false,
      isManager: false,
      permissions: [
        { code: ACCESS_GRANT_PERMISSION_CODE, scope: "All" },
        { code: "product:create", scope: "Self" },
      ],
    };
    const ability = defineAbilityFor(actorWithSelfScope);

    expect(
      ability.can(
        "revoke",
        toPermissionFacts("product:create", "Self", "Self"),
      ),
    ).toBe(true);
  });
});
