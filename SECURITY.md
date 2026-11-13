# Security notes — memo router

## Mitigated in the lab

| Issue | Behavior |
| --- | --- |
| Empty / overlong / null byte | refused |
| Bad action/payload charset | refused |
| Unknown on hard path | `requireKnown` throws |
| Replay claim with payload | desk one-shot set |

## Production still needs

- Notify hygiene (`get_first_receiver`, ignore self-outbound)
- Auth independent of memo
- No user-chosen inline action names
- Explicit policy for bare `claim` vs keyed payloads

C++ mirror validates grammar only; [run 26](https://github.com/pixel-journey/wax-contract-compiler/actions/runs/42824476528), wasm SHA256 `62faa0a05cedf643ce27d3df50068631ccb90a17c075d84eabc0f816913d17a3`.
