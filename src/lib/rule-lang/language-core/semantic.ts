import {
  ArrayType,
  BooleanType,
  NumberType,
  ObjectType,
  TypeDef,
} from "./types";

import { Scope } from "./scope";

export class SemanticAnalyzer {
  validateBoolean(type: TypeDef) {
    return (type as any).kind === "boolean";
  }

  resolveMember(objectType: TypeDef, member: string): TypeDef {
    if ((objectType as any).kind !== "object") {
      throw new Error("Not object");
    }

    const result = (objectType as ObjectType).properties[member];

    if (!result) {
      throw new Error(`Property '${member}' not found`);
    }

    return result;
  }

  resolveArrayMethod(arrayType: ArrayType, method: string): TypeDef {
    switch (method) {
      case "Any":
        return BooleanType;

      case "Count":
        return NumberType;

      default:
        throw new Error(`Unknown array method ${method}`);
    }
  }

  createLambdaScope(parent: Scope, parameter: string, itemType: TypeDef) {
    const scope = new Scope(parent);

    scope.define(parameter, itemType);

    return scope;
  }
}
