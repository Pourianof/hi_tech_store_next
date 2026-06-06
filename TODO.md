# Rule Editor Roadmap

## Current

* [x] Monaco Editor integration
* [x] Syntax highlighting
* [x] Dynamic context support (`Product`, `User`, ...)
* [x] Context-aware autocomplete
* [x] Lambda (`=>`) support
* [x] Array methods (`Any`, `Count`)

---

## Parser & AST

* [ ] Implement Lexer
* [ ] Implement Recursive Descent Parser
* [ ] Generate AST
* [ ] Support partial/incomplete AST for live editing
* [ ] Add parent/scope tracking

---

## Semantic Analysis

* [ ] Type resolution
* [ ] Scope resolution
* [ ] Lambda parameter inference
* [ ] Expression return type validation
* [ ] Ensure root expression evaluates to `boolean`

---

## Editor Features

* [ ] AST-based autocomplete
* [ ] Hover documentation
* [ ] Signature help
* [ ] Diagnostics (semantic errors)
* [ ] Formatter
* [ ] Rename lambda variable
* [ ] Go to definition

---

## Smart UI Features

* [ ] Lookup picker for foreign keys (e.g. `CategoryId`)
* [ ] Date picker for `date` properties
* [ ] Enum selector
* [ ] Boolean (`true` / `false`) picker
* [ ] Numeric input helper

---

## Runtime

* [ ] AST evaluator
* [ ] Rule validation
* [ ] Rule serialization
* [ ] AST caching

---

## Future

* [ ] SQL translation
* [ ] LINQ/Expression Tree generation
* [ ] Rule optimization
* [ ] Rule explanation
* [ ] Visual rule builder
* [ ] AI-assisted rule generation
