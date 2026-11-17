# Official sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | Transfers and contract patterns |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | `on_notify`, action data |
| [eosio.token](https://github.com/eosio/eosio.contracts) | Memo field is opaque string |

The system token does **not** validate your grammar. Soft parse must not move funds; hard path (`requireKnown`) is for funded branches.

## Production mirror

| Artifact | Link |
| --- | --- |
| C++ `pxmemo` | [wax-contract-compiler/contracts/pxmemo](https://github.com/pixel-journey/wax-contract-compiler/tree/main/contracts/pxmemo) |
| CI | [run 26](https://github.com/pixel-journey/wax-contract-compiler/actions/runs/42824476528) |
| WASM SHA256 | `62faa0a05cedf643ce27d3df50068631ccb90a17c075d84eabc0f816913d17a3` |

## Related labs (consumers of the grammar)

| Lab | Memo shape |
| --- | --- |
| [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) | `blend:recipe-id` |
| [schema wildcard](https://github.com/pixel-journey/px-blend-schema-wildcard-recipes) | same, after match |
| [hybrid blend](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft) | `blend:` + FT notify |
| [token ledger](https://github.com/pixel-journey/px-token-balance-ledger) | transfer routing |
| [dex tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax) | do not invent untested `dex:` exemptions |
| [invariant kit](https://github.com/pixel-journey/px-invariant-kit) | Shared gates |
