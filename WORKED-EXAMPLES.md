# Worked examples — transfer memo router

Known actions in tests: `claim`, `blend`, `stake`, `unstake`, `vote` (and peers in the router table).

## parseMemo (soft)

| Input | Result |
| --- | --- |
| `claim` | action claim, payload null |
| `blend:pebble-to-rock` | action blend, payload pebble-to-rock |
| `custom:xyz` | action **unknown**, raw preserved |
| empty / null byte / over MAX_MEMO_BYTES | throws |
| `Blend:x` | bad action (case — lowercase only) |
| `blend:` | empty payload |
| `blend:HAS SPACE` | bad payload |
| payload longer than MAX_PAYLOAD_CHARS | payload too long |

Soft parse may return unknown. **Do not move funds on soft parse.**

## requireKnown / formatMemo (hard)

`requireKnown("stake:pool1")` → stake / pool1. `requireKnown("nope:x")` → unknown action throws.

`formatMemo("vote")` → `vote`. `formatMemo("blend", "r1")` → `blend:r1`. Round-trip with parseMemo holds.

`formatMemo("claim", "Bad")` refused (payload shape).

## Desk composition — claim one-shot

| Step | Result |
| --- | --- |
| formatMemo → requireKnown → route `claim:airdrop-1` | processed once |
| same `claim:airdrop-1` again | refused (seen set) |
| bare `claim` | not the same key as `claim:id` |

Bare `claim` and `claim:payload` are **different** product policies. Do not count them as the same one-shot.

## What the memo is not

| Mistake | Rule |
| --- | --- |
| Memo as Antelope action name | Inline names stay **constants** |
| Memo as authorization | Always `require_auth` / notify rules separately |
| Invented `dex:` tax skip | Not tested — see [dex tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax) |

Teaching parse only — no on-chain transfer notify in this lab. C++ mirror: `wax-contract-compiler` (private; not this public course).
