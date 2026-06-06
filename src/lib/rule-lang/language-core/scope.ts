import { TypeDef } from "./types";

export class Scope {
  parent?: Scope;

  symbols = new Map<string, TypeDef>();

  constructor(parent?: Scope) {
    this.parent = parent;
  }

  define(name: string, type: TypeDef) {
    this.symbols.set(name, type);
  }

  resolve(name: string): TypeDef | undefined {
    const local = this.symbols.get(name);

    if (local) {
      return local;
    }

    return this.parent?.resolve(name);
  }
}
