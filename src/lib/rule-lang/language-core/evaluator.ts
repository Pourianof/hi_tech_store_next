/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressionNode } from "./ast";

export function evaluate(node: ExpressionNode, scope: any): any {
  switch (node.type) {
    case "Literal":
      return node.value;

    case "Identifier":
      return scope[node.name];

    case "MemberAccess": {
      const obj = evaluate(node.object, scope);

      return obj[node.member];
    }

    case "BinaryExpression": {
      const left = evaluate(node.left, scope);
      const right = evaluate(node.right, scope);

      switch (node.operator) {
        case "==":
          return left == right;

        case "!=":
          return left != right;

        case ">":
          return left > right;

        case "<":
          return left < right;

        case "&&":
          return left && right;

        case "||":
          return left || right;
      }
    }

    case "Lambda": {
      return (arg: any) => {
        const n = node as { body: any; parameter: any };
        return evaluate(n.body, {
          ...scope,
          [n.parameter]: arg,
        });
      };
    }

    case "MethodCall": {
      const object = evaluate(node.object, scope);

      if (node.method === "Any") {
        const fn = evaluate(node.arguments[0], scope);

        return object.some(fn);
      }

      if (node.method === "Count") {
        if (!node.arguments.length) {
          return object.length;
        }

        const fn = evaluate(node.arguments[0], scope);

        return object.filter(fn).length;
      }

      throw new Error("Unknown method");
    }
  }
}
