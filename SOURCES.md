# Official sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX development overview |
| [WAX API reference](https://docs.wax.io/build/api-reference/) | Chain API for transfers and history |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | Actions, permissions, transfer patterns |
| [eosio.token (reference)](https://github.com/eosio/eosio.contracts) | Classic transfer + memo field shape |

Transfer memos are free-form bytes from the token contract’s point of view. **This lab** imposes a small grammar so dapp actions (`blend`, `stake`, `claim`, …) are not typo-sensitive free text.

## Related org work

| Piece | Link |
| --- | --- |
| Production C++ mirror + wasm | [wax-contract-compiler `pxmemo`](https://github.com/pixel-journey/wax-contract-compiler/tree/main/contracts/pxmemo) — [run 26](https://github.com/pixel-journey/wax-contract-compiler/actions/runs/42824476528) |
| Shared pure gates | [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit) |
| Vault index | [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault) |
