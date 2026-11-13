# Transfer memo grammar: action and action:payload

> **Domain:** structured transfer memos  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**Goal:** A **structured transfer memo** format — `action` or `action:payload` — with hard length, charset, and known-action checks used by blend/stake/claim flows.

**Code under test:** `npm test` (unit + transfer-desk composition). Not a live transfer.

**Production mirror (C++ → wasm):** [wax-contract-compiler `pxmemo`](https://github.com/pixel-journey/wax-contract-compiler/tree/main/contracts/pxmemo) — [run 26](https://github.com/pixel-journey/wax-contract-compiler/actions/runs/42824476528), wasm SHA256 `62faa0a05cedf643ce27d3df50068631ccb90a17c075d84eabc0f816913d17a3`, audit 0/0. **Not deployed.**

Token contracts treat memos as opaque. This lab is the **grammar** a dapp should apply before branching. **Network docs:** [docs.wax.io](https://docs.wax.io/).

## Composition

`memo.composition.test.ts` builds a desk: `formatMemo` → `requireKnown` → route. Claim memos with a payload are **one-shot** (`claim:airdrop-1` cannot be processed twice). Soft `parseMemo` keeps unknown actions for logging; the desk refuses them. Bare `claim` (no payload) is not keyed into the seen set.

## What is true (executed)

| Rule | Result |
|------|--------|
| `claim` | `{ action: "claim", payload: null }` |
| `blend:pebble-to-rock` | known action + payload |
| `custom:xyz` | `{ action: "unknown", raw }` (no throw) |
| `requireKnown` | throws on unknown |
| Empty / >256 / null byte | Refused |
| Bad action case / empty payload / bad charset | Refused |
| `formatMemo` | Round-trips with `parseMemo` |
| Desk + claim payload | Second identical claim refused |

```bash
npm test
```

## Related

Shared pure checks: [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit). Domain blend/stake flows that **consume** this grammar stay in their domain repos.

MIT — Pixel Journey
