import { apiRoutes } from "./apiRoutes";

const HEALTHY_STATE = "Healthy";

export async function isHealthyApi() {
  const result = await fetch(apiRoutes.healthCheck);

  const state = await result.text();

  return HEALTHY_STATE.toLowerCase() == state.toLowerCase();
}
