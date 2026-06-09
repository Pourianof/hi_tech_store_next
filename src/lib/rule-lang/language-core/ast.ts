import { TypeDef } from "./types";

export interface BaseNode {
  returnType?: TypeDef;
}

export interface IdentifierNode extends BaseNode {
  type: "Identifier";
  name: string;
}

export interface LiteralNode extends BaseNode {
  type: "Literal";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export interface BinaryExpressionNode extends BaseNode {
  type: "BinaryExpression";

  operator: "==" | "!=" | ">" | "<" | ">=" | "<=" | "&&" | "||";

  left: ExpressionNode;
  right: ExpressionNode;
}

export interface MemberAccessNode extends BaseNode {
  type: "MemberAccess";

  object: ExpressionNode;
  member: string;
}

export interface LambdaNode extends BaseNode {
  type: "Lambda";

  parameter: string;
  body: ExpressionNode;
}

export interface MethodCallNode extends BaseNode {
  type: "MethodCall";

  object: ExpressionNode;
  method: string;
  arguments: ExpressionNode[];
}

export type ExpressionNode =
  | IdentifierNode
  | LiteralNode
  | BinaryExpressionNode
  | MemberAccessNode
  | LambdaNode
  | MethodCallNode;
