# Tips — structured transfer memos

## Grammar this lab locks

`action:payload` with a small allowlist (`blend`, `stake`, `claim`, and the shapes the tests name). Unknown actions fail on the **hard** path (`requireKnown`). Soft parse can return unknown without throwing — do not use soft parse to move funds.

## Do

- Publish the grammar where wallets show the raw memo (README, Discord).
- Bound length (256 in this lab).
- Use payloads as idempotency keys (`claim:drop-7`), and store them in a seen set.
- Keep inline action names as **constants**. The memo picks a branch inside your contract.

## Don't

- `action` the user typed as an Antelope action name.
- Treat the memo as `require_auth`.
- Let a DEX memo (`dex:` or similar) skip a tax unless that path is tested. See [dex tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax) for the untested prefix warning.

## Common mistakes

1. Bare `claim` vs `claim:id` counted as the same one-shot.
2. Unicode / null bytes the ASCII tests never accepted.
3. Routing treasury and user deposits with the same parser and no symbol check.
4. Parsing the memo and then still trusting `to` from the transfer for a destination the memo also names.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Versioned prefix `v2:blend:12` | Lets you migrate grammar |
| Memo hash in the receipt | Indexers can join without storing the full string |
| Per-action payload schema | blend ids vs stake asset ids |

## Related

| Flow | Lab |
| --- | --- |
| NFT blend | [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) |
| Wildcard slots | [schema wildcard](https://github.com/pixel-journey/px-blend-schema-wildcard-recipes) |
| Token book | [ledger](https://github.com/pixel-journey/px-token-balance-ledger) |
| C++ mirror | `wax-contract-compiler` (private; not this public course) |
