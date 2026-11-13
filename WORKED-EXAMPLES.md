# Worked examples — memo grammar

## Example A — bare and payload

| Memo | parseMemo |
| --- | --- |
| `stake` | `{ action: "stake", payload: null }` |
| `stake:farm-1` | `{ action: "stake", payload: "farm-1" }` |
| `vote:prop.42` | known + payload |

## Example B — unknown soft vs hard

```text
parseMemo("custom:xyz") → unknown + raw
requireKnown("custom:xyz") → throw
```

## Example C — refusals

| Input | Error |
| --- | --- |
| `` | empty |
| length 257 | too long |
| contains `\0` | null byte |
| `Claim` | bad action |
| `claim:` | empty payload |
| `blend:BAD` | bad payload charset |

## Example D — one-shot desk

Process `claim:airdrop-1` once → ok. Same memo again → refused. Bare `claim` may be allowed multiple times depending on desk policy (composition documents the payload keying).

## Example E — round-trip

```text
formatMemo("blend", "pebble-to-rock") === "blend:pebble-to-rock"
parseMemo(that).action === "blend"
```
