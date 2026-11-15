# Worked examples — transfer memo router

Known actions in tests: `claim`, `blend`, `stake`, `unstake`, `vote` (and peers in the router table).

## parseMemo

| Input | Result |
| --- | --- |
| `claim` | action claim, payload null |
| `blend:pebble-to-rock` | action blend, payload pebble-to-rock |
| `custom:xyz` | action **unknown**, raw preserved |
| empty / null byte / over MAX_MEMO_BYTES | throws |
| `Blend:x` | bad action (case) |
| `blend:` | empty payload |
| `blend:HAS SPACE` | bad payload |
| payload longer than MAX_PAYLOAD_CHARS | payload too long |

## requireKnown / formatMemo

`requireKnown("stake:pool1")` → stake / pool1. `requireKnown("nope:x")` → unknown action.

`formatMemo("vote")` → `vote`. `formatMemo("blend", "r1")` → `blend:r1`. Round-trip with parseMemo holds.

`formatMemo("claim", "Bad")` refused (payload shape).

Teaching parse only — no on-chain transfer notify in this lab.
