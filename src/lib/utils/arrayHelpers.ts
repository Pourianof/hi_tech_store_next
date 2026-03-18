export function flatMapBasedOn<T, R>(
  arr: T[],
  targetSelector: (target: T) => R[],
): R[] {
  return arr.reduce(
    (prev, cur) => [...prev, ...targetSelector(cur)],
    [] as R[],
  );
}
