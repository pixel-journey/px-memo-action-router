# Tips — memos in WAX dapps

## Do

- Document the grammar in your README and Discord; wallets show raw memos.
- Prefer **allowlists** of actions (`requireKnown`) for state-changing desks.
- Bound length (256 is a common Antelope memo practical cap in this lab).
- Use payloads for **idempotency keys** (`claim:drop-7`).

## Don’t

- Execute `eosio::action` named from memo text.
- Treat memo as proof of identity.
- Allow open-ended Unicode if you only tested ASCII.

## Related

| Flow | Lab |
| --- | --- |
| NFT blend | [px-blend-simple-nft-to-nft](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) |
| Token book | [px-token-balance-ledger](https://github.com/pixel-journey/px-token-balance-ledger) |
| C++ mirror | [pxmemo](https://github.com/pixel-journey/wax-contract-compiler/tree/main/contracts/pxmemo) |
