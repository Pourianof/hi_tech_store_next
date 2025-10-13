export class NoContextDefinedError extends Error {
  constructor(contextName: string) {
    super(`No context named "${contextName}" defined in upper component tree.`);
    this.name = "NoContextDefinedError";
  }
}
