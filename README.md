# Transfer memo action router

Educational grammar for dapp transfer memos: `action` or `action:payload`. Soft `parseMemo` vs hard `requireKnown`. Known actions include blend, stake, unstake, claim, vote. Composition desk one-shots keyed claim payloads.

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Parse / format tables |
| [SECURITY.md](SECURITY.md) | Injection and replay |
| [SOURCES.md](SOURCES.md) | docs.wax.io + pxmemo mirror |

**Official context:** token memos are opaque to eosio.token; **your** contract must parse. [docs.wax.io](https://docs.wax.io/) · [eosio.token](https://github.com/eosio/eosio.contracts).

```bash
npm test
```

MIT — Pixel Journey
