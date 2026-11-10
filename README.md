# px-memo-action-router

> **Trust:** private educational lab (Tier B)
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** Teach a **structured transfer memo** format — `action` or `action:payload` — with hard length, charset, and known-action checks used by blend/stake/claim flows.

**Real code:** `npm test` (7 tests). **Not** wasm, **not** a live transfer.

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

## License

MIT — Pixel Journey

---

*Seeded 2026-11-10. No wasm.*
