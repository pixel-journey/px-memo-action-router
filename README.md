# Transfer memo grammar: action and action:payload

> **Domain:** structured transfer memos  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**Goal:** `action` or `action:payload` with hard length, charset, and known-action checks for blend/stake/claim flows.

**Code under test:** `npm test` (unit + transfer-desk composition).

**Production mirror:** [pxmemo](https://github.com/pixel-journey/wax-contract-compiler/tree/main/contracts/pxmemo) — [run 26](https://github.com/pixel-journey/wax-contract-compiler/actions/runs/42824476528). **Not deployed.**

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Parse, refuse, one-shot desk |
| [TIPS.md](TIPS.md) | Allowlists and idempotency keys |
| [SECURITY.md](SECURITY.md) | Injection surface |
| [SOURCES.md](SOURCES.md) | Official + pxmemo |

## What is true (executed)

| Rule | Result |
|------|--------|
| `claim` / `blend:pebble-to-rock` | known parse |
| `custom:xyz` | soft unknown; hard path throws |
| Empty / >256 / null byte / bad charset | refused |
| Desk + claim payload | second identical claim refused |

```bash
npm test
```

MIT — Pixel Journey
