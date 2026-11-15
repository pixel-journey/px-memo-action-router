# Worked examples — transfer memo router

## parse

| memo | result |
| --- | --- |
| `claim` | action claim, payload null |
| `blend:pebble-to-rock` | blend + payload |
| `custom:xyz` | soft `unknown` (no throw) |

## refusals

Empty, over `MAX_MEMO_BYTES`, null byte, `Blend:x` (case), empty payload `blend:`, space in payload, payload over `MAX_PAYLOAD_CHARS`.

## requireKnown / format

`requireKnown("stake:pool1")` ok. `requireKnown("nope:x")` → unknown action.

`formatMemo("vote")` → `vote`. `formatMemo("blend", "r1")` → `blend:r1`. Round-trip with parse.

## composition desk

Routes all of: blend, stake, unstake, claim+payload, vote.

Claim `airdrop-1` once; second same payload throws `claim already processed`. Different payload `airdrop-2` ok.

Soft parse keeps unknown; requireKnown refuses it.

Claim **without** payload is not one-shot (seen set stays empty for two bare `claim` memos in the batch test).
