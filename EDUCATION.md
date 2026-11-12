# Education

## The pitfall

Contracts that branch on free-form memos invite typos, case bugs, and oversized strings that waste CPU or RAM. Treating every memo as a command without a grammar is how `Blend` and `blend` become two different products.

## The rule

1. ASCII action name, lowercase, 1–16 letters.
2. Optional payload after a single `:`, charset `[a-z0-9._-]`, max 64 chars.
3. Total memo ≤ 256 characters (Antelope-style bound for this lab).
4. Known actions are an allow-list; others parse as `unknown` unless `requireKnown` is used.

## Official context

On WAX, transfers and API surfaces are documented at [docs.wax.io](https://docs.wax.io/). The memo field itself is not a typed router on-chain until **your** contract parses it. See [SOURCES.md](SOURCES.md).

## What this is not

- Not UTF-8 grapheme counting.
- Not a full router with auth (use [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit) for shared gates).
- Not wasm in this repo (production mirror is `pxmemo` in wax-contract-compiler).
