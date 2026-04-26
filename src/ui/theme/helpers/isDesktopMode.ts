"use client";

import { useMediaQuery } from "@mui/material";

export function useIsDesktopScreen() {
  // const [bpSm, setBpSm] = useState<string>();

  // useEffect(() => {
  //   const bpSm = getComputedStyle(document.documentElement)
  //     .getPropertyValue("--breakpoint-desktop")
  //     .trim();
  //   setBpSm(bpSm);
  // }, []);

  return useMediaQuery(`(min-width: 360px)`);
}
