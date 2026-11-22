# AI handoff — memo action router

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [eosio.token](https://github.com/eosio/eosio.contracts) | Memo is opaque string |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | on_notify |
| Consumers | blend / tax / ledger labs |

## Non-negotiables

1. Grammar is `action` or `action:payload`. Actions are **lowercase only** (`CLAIM` refused).
2. Soft `parseMemo` may return `{ action: "unknown", raw }`. Hard `requireKnown` throws on unknown.
3. Soft parse must **not** move funds. Funded branches use the hard path.
4. Memos are **not** authorization and must never become an **inline action name**.
5. `claim:payload` is one-shot on the desk. Bare `claim` ≠ `claim:id`.
6. Bound length is **256**. Empty payload after `:` is refused.
7. Do not invent untested `dex:` tax exemptions.
8. Memo-as-routing-tag ports on every Antelope token transfer. Size limits and token contract accounts are chain-local.

## Prompt seeds

- "Parse `blend:recipe-3` and show action vs payload."
- "Show why soft unknown must not debit a balance."
- "Refuse using memo text as the inline action name."
- "Contrast with Alcor Bridge memo (routing tag, still not auth)."

## Do not

- Treat memo as a signed claim.
- Merge grammar with permission auth.
- Claim the private `pxmemo` wasm is deployed.
