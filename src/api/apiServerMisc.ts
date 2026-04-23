import { apiRoutes } from "./apiRoutes";

const HEALTHY_STATE = "Healthy";
let lastCheckTime = 0;
let cachedState: boolean | undefined = undefined;
const CACHE_INTERVAL = process.env.NODE_ENV == "development" ? 0 : 10 * 1000;

export async function isHealthyApi() {
  const now = Date.now();

  if (
    typeof cachedState != "undefined" &&
    now - lastCheckTime < CACHE_INTERVAL
  ) {
    return cachedState;
  }

  try {
    const result = await fetch(apiRoutes.healthCheck);

    const state = await result.text();
    cachedState = HEALTHY_STATE.toLowerCase() == state.toLowerCase();
    return cachedState;
  } catch {
    cachedState = false;
    return cachedState;
  } finally {
    lastCheckTime = Date.now();
  }
}
