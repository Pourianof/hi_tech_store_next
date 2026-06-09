// import { CstParser } from "chevrotain";

// import {
//   allTokens,
//   Identifier,
//   NumberLiteral,
//   Dot,
//   LParen,
//   RParen,
//   Equal,
//   NotEqual,
//   GreaterThan,
//   LessThan,
//   And,
//   Or,
//   Arrow,
//   Comma,
// } from "./lexer";

// export class RuleParser extends CstParser {
//   constructor() {
//     super(allTokens);

//     const $ = this;

//     $.RULE("expression", () => {
//       $.SUBRULE($.logicalOr);
//     });

//     $.RULE("logicalOr", () => {
//       $.SUBRULE($.logicalAnd);

//       $.MANY(() => {
//         $.CONSUME(Or);
//         $.SUBRULE2($.logicalAnd);
//       });
//     });

//     $.RULE("logicalAnd", () => {
//       $.SUBRULE($.comparison);

//       $.MANY(() => {
//         $.CONSUME(And);
//         $.SUBRULE2($.comparison);
//       });
//     });

//     $.RULE("comparison", () => {
//       $.SUBRULE($.memberExpression);

//       $.OPTION(() => {
//         $.OR([
//           { ALT: () => $.CONSUME(Equal) },
//           { ALT: () => $.CONSUME(NotEqual) },
//           { ALT: () => $.CONSUME(GreaterThan) },
//           { ALT: () => $.CONSUME(LessThan) },
//         ]);

//         $.SUBRULE2($.memberExpression);
//       });
//     });

//     $.RULE("memberExpression", () => {
//       $.SUBRULE($.primary);

//       $.MANY(() => {
//         $.OR([
//           {
//             ALT: () => {
//               $.CONSUME(Dot);
//               $.CONSUME(Identifier);
//             },
//           },
//           {
//             ALT: () => {
//               $.CONSUME(LParen);

//               $.OPTION(() => {
//                 $.SUBRULE($.argument);

//                 $.MANY2(() => {
//                   $.CONSUME(Comma);
//                   $.SUBRULE2($.argument);
//                 });
//               });

//               $.CONSUME(RParen);
//             },
//           },
//         ]);
//       });
//     });

//     $.RULE("argument", () => {
//       $.OR([
//         { ALT: () => $.SUBRULE($.lambda) },
//         { ALT: () => $.SUBRULE($.expression) },
//       ]);
//     });

//     $.RULE("lambda", () => {
//       $.CONSUME(Identifier);
//       $.CONSUME(Arrow);
//       $.SUBRULE($.expression);
//     });

//     $.RULE("primary", () => {
//       $.OR([
//         {
//           ALT: () => $.CONSUME(NumberLiteral),
//         },
//         {
//           ALT: () => $.CONSUME(Identifier),
//         },
//         {
//           ALT: () => {
//             $.CONSUME(LParen);
//             $.SUBRULE($.expression);
//             $.CONSUME(RParen);
//           },
//         },
//       ]);
//     });

//     this.performSelfAnalysis();
//   }
// }
