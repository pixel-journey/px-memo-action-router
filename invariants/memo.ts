/**
 * Structured transfer-memo router (educational).
 * Format: <action> or <action>:<payload>
 * Used by blend/stake/claim flows that branch on memo text alone.
 */

export const MAX_MEMO_BYTES = 256;
export const MAX_PAYLOAD_CHARS = 64;

export const KNOWN_ACTIONS = [
  "blend",
  "stake",
  "unstake",
  "claim",
  "vote",
] as const;

export type KnownAction = (typeof KNOWN_ACTIONS)[number];

export type ParsedMemo =
  | { action: KnownAction; payload: string | null }
  | { action: "unknown"; raw: string };

const ACTION_RE = /^[a-z]{1,16}$/;
const PAYLOAD_RE = /^[a-z0-9._-]{1,64}$/;

export function isKnownAction(s: string): s is KnownAction {
  return (KNOWN_ACTIONS as readonly string[]).includes(s);
}

/**
 * Parse a transfer memo. Does not decode UTF-8 beyond JS string length
 * (treat length as character count ≈ byte count for ASCII memos).
 */
export function parseMemo(memo: string): ParsedMemo {
  if (typeof memo !== "string") throw new Error("memo must be a string");
  if (memo.length === 0) throw new Error("empty memo");
  if (memo.length > MAX_MEMO_BYTES) throw new Error("memo too long");
  if (memo.includes("\0")) throw new Error("memo has null byte");

  const colon = memo.indexOf(":");
  const actionPart = colon === -1 ? memo : memo.slice(0, colon);
  const payloadPart = colon === -1 ? null : memo.slice(colon + 1);

  if (!ACTION_RE.test(actionPart)) throw new Error("bad action");

  if (payloadPart !== null) {
    if (payloadPart.length === 0) throw new Error("empty payload");
    if (payloadPart.length > MAX_PAYLOAD_CHARS) throw new Error("payload too long");
    if (!PAYLOAD_RE.test(payloadPart)) throw new Error("bad payload");
  }

  if (isKnownAction(actionPart)) {
    return { action: actionPart, payload: payloadPart };
  }
  return { action: "unknown", raw: memo };
}

/** Require a known action; refuse unknown. */
export function requireKnown(memo: string): {
  action: KnownAction;
  payload: string | null;
} {
  const p = parseMemo(memo);
  if (p.action === "unknown") throw new Error("unknown action");
  return { action: p.action, payload: p.payload };
}

/** Build a memo string (inverse of parse for known actions). */
export function formatMemo(action: KnownAction, payload?: string | null): string {
  if (!isKnownAction(action)) throw new Error("unknown action");
  if (payload == null || payload === "") return action;
  if (payload.length > MAX_PAYLOAD_CHARS) throw new Error("payload too long");
  if (!PAYLOAD_RE.test(payload)) throw new Error("bad payload");
  const out = `${action}:${payload}`;
  if (out.length > MAX_MEMO_BYTES) throw new Error("memo too long");
  return out;
}
