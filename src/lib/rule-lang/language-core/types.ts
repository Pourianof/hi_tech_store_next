export type PrimitiveKind = "string" | "number" | "boolean" | "null";

export interface PrimitiveType {
  kind: PrimitiveKind;
}

export interface ObjectType {
  kind: "object";
  name: string;
  properties: Record<string, TypeDef>;
}

export interface ArrayType {
  kind: "array";
  itemType: TypeDef;
}

export type TypeDef = PrimitiveType | ObjectType | ArrayType;

export const NumberType: PrimitiveType = {
  kind: "number",
};

export const BooleanType: PrimitiveType = {
  kind: "boolean",
};

export const StringType: PrimitiveType = {
  kind: "string",
};
