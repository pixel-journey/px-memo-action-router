# Official sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | Transfers and contract patterns |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | `on_notify`, action data |
| [eosio.token](https://github.com/eosio/eosio.contracts) | Memo field is opaque string |
| [Alcor Bridge memo lab](https://github.com/pixel-journey/px-alcor-bridge-memo-and-credit-rules) | Cross-chain deposit memo — **different** grammar |
| [wharfkit/skill](https://github.com/wharfkit/skill) | SessionKit if a host later transfers |

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

The system token does **not** validate your grammar. Soft parse must not move funds; hard path (`requireKnown`) is for funded branches.

## Product facts locked by this lab

- Grammar is `action` or `action:payload`. Actions are **lowercase only** (`CLAIM` is refused).
- Soft `parseMemo` may return `{ action: "unknown", raw }`. Hard `requireKnown` throws on unknown.
- Soft parse must **not** move funds. Funded branches use the hard path.
- Memos are **not** authorization and must never become an **inline action name**. Inline names stay constants.
- `claim:payload` is one-shot on the desk. Bare `claim` is not the same key as `claim:id`.
- Bound length is **256**. Empty payload after `:` is refused.
- Do not invent a `dex:` tax exemption without a test. See [dex tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax).

## Portability

Memo-as-routing-tag ports on every Antelope token transfer. Size limits, charset, and token contract accounts are chain-local. Alcor Bridge deposit memos use a different product rule set.

## Build record, not this course

A private compiler tree named `pxmemo` produced wasm SHA256 `62faa0a05cedf643ce27d3df50068631ccb90a17c075d84eabc0f816913d17a3`. It is grammar only, not deployed, and not public. Read the TypeScript tests here.

## Related labs (consumers of the grammar)

| Lab | Memo shape |
| --- | --- |
| [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) | `blend:recipe-id` |
| [schema wildcard](https://github.com/pixel-journey/px-blend-schema-wildcard-recipes) | same, after match |
| [hybrid blend](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft) | `blend:` + FT notify |
| [token ledger](https://github.com/pixel-journey/px-token-balance-ledger) | transfer routing |
| [dex tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax) | do not invent untested `dex:` exemptions |
| [invariant kit](https://github.com/pixel-journey/px-invariant-kit) | Shared gates |
