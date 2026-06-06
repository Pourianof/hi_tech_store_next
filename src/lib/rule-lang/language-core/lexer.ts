import { createToken, Lexer } from "chevrotain";

export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

export const Arrow = createToken({
  name: "Arrow",
  pattern: /=>/,
});

export const Or = createToken({
  name: "Or",
  pattern: /\|\|/,
});

export const And = createToken({
  name: "And",
  pattern: /&&/,
});

export const Equal = createToken({
  name: "Equal",
  pattern: /==/,
});

export const NotEqual = createToken({
  name: "NotEqual",
  pattern: /!=/,
});

export const GreaterThan = createToken({
  name: "GreaterThan",
  pattern: />/,
});

export const LessThan = createToken({
  name: "LessThan",
  pattern: /</,
});

export const LParen = createToken({
  name: "LParen",
  pattern: /\(/,
});

export const RParen = createToken({
  name: "RParen",
  pattern: /\)/,
});

export const Dot = createToken({
  name: "Dot",
  pattern: /\./,
});

export const Comma = createToken({
  name: "Comma",
  pattern: /,/,
});

export const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /\d+(?:\.\d+)?/,
});

export const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z_][a-zA-Z0-9_]*/,
});

export const allTokens = [
  WhiteSpace,
  Arrow,
  Or,
  And,
  Equal,
  NotEqual,
  GreaterThan,
  LessThan,
  LParen,
  RParen,
  Dot,
  Comma,
  NumberLiteral,
  Identifier,
];

export const RuleLexer = new Lexer(allTokens);
