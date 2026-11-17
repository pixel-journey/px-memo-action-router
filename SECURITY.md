# Security — structured transfer memos

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty / overlong / null byte | refused |
| Bad action/payload charset | refused |
| Unknown on hard path | `requireKnown` throws |
| Replay claim with payload | desk one-shot set |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Notify hygiene | `get_first_receiver`; ignore self-outbound |
| Auth | Independent of memo — always `require_auth` / notify rules |
| Inline actions | **Constants only** — never the user-typed action string |
| Bare `claim` vs keyed | Explicit product policy |
| Symbol check | Same parser must not route treasury and user deposits without it |

## Attack angles

1. Using the memo text as an Antelope action name.
2. Treating the memo as authorization.
3. Bare `claim` and `claim:id` counted as the same one-shot.
4. Letting a DEX-style memo skip tax without a tested path.
5. Trusting `to` from the transfer for a destination the memo also names.

## Honesty limits

Grammar only. C++ mirror: [pxmemo](https://github.com/pixel-journey/wax-contract-compiler/tree/main/contracts/pxmemo) (run 26, wasm SHA256 `62faa0a05cedf643ce27d3df50068631ccb90a17c075d84eabc0f816913d17a3`). Related: [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) · [ledger](https://github.com/pixel-journey/px-token-balance-ledger).
