# Security notes

| Issue | Lab mitigation |
|-------|----------------|
| Oversized memo | `MAX_MEMO_BYTES` 256 |
| Null byte in memo | Refused |
| Case-variant actions | Lowercase-only action regex |
| Open payload charset | `[a-z0-9._-]` only |
| Treating unknown as known | `requireKnown` throws |

Production still needs `require_auth`, amount checks, and not trusting memo alone for value movement.
