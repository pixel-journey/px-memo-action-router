# px-memo-action-router

> **Trust:** private educational lab (Tier B)  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Sources:** [SOURCES.md](SOURCES.md)

**One-sentence goal:** Teach a **structured transfer memo** format — `action` or `action:payload` — with hard length, charset, and known-action checks used by blend/stake/claim flows.

**Real code:** `npm test` (7 tests). **Not** wasm in this repo, **not** a live transfer.

**Production mirror (C++ → wasm):** [wax-contract-compiler `pxmemo`](https://github.com/pixel-journey/wax-contract-compiler/tree/main/contracts/pxmemo) — [run 26](https://github.com/pixel-journey/wax-contract-compiler/actions/runs/42824476528), wasm SHA256 `62faa0a05cedf643ce27d3df50068631ccb90a17c075d84eabc0f816913d17a3`, audit 0/0. **Not deployed.**

Token contracts treat memos as opaque. This lab is the **grammar** a dapp should apply before branching. Official network docs: [docs.wax.io](https://docs.wax.io/).

---

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

```bash
npm test
```

---

## Layout

| Path | Role |
|------|------|
| `invariants/memo.ts` | parse / requireKnown / format |
| `invariants/memo.test.ts` | Executed claims |
| `EDUCATION.md` | Why memos need a grammar |
| `SECURITY.md` | Injection and length surface |
| `SOURCES.md` | docs.wax.io and production mirror |

## Related

Shared pure checks (name, auth stand-in, ranges) live in [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit). Domain blend/stake flows that **consume** this grammar stay in their domain repos.

## License

MIT — Pixel Journey
