# Education — transfer memo grammar

> **Rung:** `npm test` passes. No live transfer.  
> **The test is the rule.** Token contracts treat memos as opaque; **your** dapp must parse before branching.

Official: [docs.wax.io](https://docs.wax.io/) · [eosio.token](https://github.com/eosio/eosio.contracts).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Parse `action` vs `action:payload` |
| Intermediate | Soft unknown vs `requireKnown`; format round-trip |
| Masterclass | One-shot claim payloads and injection surface |

Known actions in this lab: `blend`, `stake`, `unstake`, `claim`, `vote`.

---

## Beginner — one scene

```text
"claim"              → { action: "claim", payload: null }
"blend:pebble-to-rock" → { action: "blend", payload: "pebble-to-rock" }
"custom:xyz"         → { action: "unknown", raw: "custom:xyz" }  // parseMemo soft
requireKnown("custom:xyz") → throws
```

Empty memo, null byte, length > 256, bad charset → refused.

```bash
npm test
```

1. `formatMemo("claim", "airdrop-1")` round-trips with `parseMemo`.
2. `claim:` (empty payload) refused.
3. Uppercase action refused (`ACTION_RE` is lowercase only).

---

## Intermediate — desk composition

`memo.composition.test.ts`: `formatMemo` → `requireKnown` → route. Claim memos **with payload** are one-shot (`claim:airdrop-1` cannot be processed twice). Bare `claim` is not keyed into the seen set.

| Helper | Role |
| --- | --- |
| `parseMemo` | Soft; unknown becomes `{ action: "unknown", raw }` |
| `requireKnown` | Hard; unknown throws |
| `formatMemo` | Inverse for known actions |

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Soft-unknown funds move | soft is not for funding paths |
| Uppercase `CLAIM` | refused |
| `claim:airdrop-1` twice | one-shot refuses second |
| Memo as inline action name | never |

---

## Masterclass

- Memos are **not** authorization. Always `require_auth` / notify hygiene independently.
- Do not let memo text become an **inline action name**.
- Domain flows that **consume** this grammar: blend, stake, claim labs.

### Common mistakes

1. Bare `claim` vs `claim:id` counted as the same one-shot.  
2. Using soft parse to move funds.  
3. Treating the memo as `require_auth`.  
4. Letting a DEX-style memo skip tax without a tested path ([dex tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax)).  
5. Routing treasury and user deposits with the same parser and no symbol check.

### Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Versioned prefix `v2:blend:12` | Lets you migrate grammar |
| Memo hash in the receipt | Indexers can join without storing the full string |
| Per-action payload schema | blend ids vs stake asset ids |

### Exercises

1. Is `CLAIM` a valid action? (**No** — lowercase only.)  
2. Can `claim:airdrop-1` process twice on the desk? (**No**.)  
3. Is the memo a signature? (**No**.)

---

## What this course will not teach

- That the system token validates your grammar
- UTF-8 multi-byte edge cases beyond length ≈ bytes for ASCII
- That a soft-unknown path is safe to fund
