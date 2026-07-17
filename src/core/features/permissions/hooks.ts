"use client";

import { User } from "@/core/models/user";
import { useAuth } from "@/ui/contexts/authContext";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { useEffect, useState } from "react";
import {
  defineAbilityFor,
  PermissionAbility,
  TargetUserFacts,
} from "./ability";
import { userToActorContext, userToFacts } from "./helper";

interface UseActorAbilityResult {
  ability: PermissionAbility | null;
  loading: boolean;
  error: string | null;
}

/**
 * Loads the current actor's permission context once and builds the ability
 * engine from it. Components never build the ability themselves — this is
 * the one place React state and the pure `ability.ts` module meet.
 */
export function useActorAbility(): UseActorAbilityResult {
  const [ability, setAbility] = useState<PermissionAbility | null>(null);
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auth.isLoading) {
      return;
    }

    if (!auth.isLoggedIn) {
      setError("Your are not logged in");
      return;
    }

    setAbility(defineAbilityFor(userToActorContext(auth.data!.user as User)));
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoading, auth.data?.user, auth.isLoggedIn]);

  return { ability, loading: auth.isLoading, error };
}

interface UseTargetUserFactsResult {
  facts: TargetUserFacts | null;
  loading: boolean;
  error: string | null;
}

/** Loads just the ability-relevant facts about whichever user is selected as target. */
export function useTargetUserFacts(): UseTargetUserFactsResult {
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  const targetUser = useStaticData("target-user") as User;
  const userFacts: TargetUserFacts = userToFacts(targetUser);

  return { facts: userFacts, loading, error };
}
