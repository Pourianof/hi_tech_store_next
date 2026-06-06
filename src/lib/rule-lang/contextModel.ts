export interface ObjectType {
  kind: "object";
  name?: string;
  properties: Record<string, ContextType>;
}

interface ArrayType {
  kind: "array";
  itemType: ContextType;
}

interface PrimitiveType {
  kind: "number" | "string" | "date" | "boolean";
}

export type ContextType = ObjectType | ArrayType | PrimitiveType;

const OrderItemContext: ContextType = {
  kind: "array",
  itemType: {
    kind: "object",
    name: "Order",
    properties: {
      Count: { kind: "number" },
      OrderPayTimePrice: { kind: "number" },
    },
  },
};

const ProductVariationContext: ContextType = {
  kind: "object",
  name: "ProductVariation",
  properties: {
    Price: { kind: "number" },
    Inventory: { kind: "number" },
    Orders: OrderItemContext,
  },
};

export const ProductEditorContext: ContextType = {
  kind: "object",
  properties: {
    CategoryId: { kind: "number" },
    Variations: {
      kind: "array",
      itemType: ProductVariationContext,
    },
  },
};

const CartContext: ContextType = {
  kind: "object",
  properties: {
    Items: {
      kind: "array",
      itemType: {
        kind: "object",
        properties: {
          Amount: { kind: "number" },
        },
      },
    },
  },
};

export const UserEditorContext: ContextType = {
  kind: "object",
  properties: {
    Orders: {
      kind: "array",
      itemType: OrderItemContext,
    },
    ActiveCart: CartContext,
    RegisteredAt: { kind: "date" },
  },
};

export const ARRAY_METHODS = ["Any", "Count"];
