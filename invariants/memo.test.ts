import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseMemo,
  requireKnown,
  formatMemo,
  MAX_MEMO_BYTES,
  MAX_PAYLOAD_CHARS,
} from "./memo.ts";

describe("parseMemo", () => {
  it("parses action-only and action:payload", () => {
    assert.deepEqual(parseMemo("claim"), { action: "claim", payload: null });
    assert.deepEqual(parseMemo("blend:pebble-to-rock"), {
      action: "blend",
      payload: "pebble-to-rock",
    });
  });

  it("marks unknown actions without throwing", () => {
    const p = parseMemo("custom:xyz");
    assert.equal(p.action, "unknown");
    if (p.action === "unknown") assert.equal(p.raw, "custom:xyz");
  });

  it("refuses empty, overlong, and null-byte memos", () => {
    assert.throws(() => parseMemo(""), /empty memo/);
    assert.throws(() => parseMemo("a".repeat(MAX_MEMO_BYTES + 1)), /too long/);
    assert.throws(() => parseMemo("claim\0x"), /null byte/);
  });

  it("refuses bad action and payload shapes", () => {
    assert.throws(() => parseMemo("Blend:x"), /bad action/);
    assert.throws(() => parseMemo("blend:"), /empty payload/);
    assert.throws(() => parseMemo("blend:HAS SPACE"), /bad payload/);
    assert.throws(
      () => parseMemo("blend:" + "x".repeat(MAX_PAYLOAD_CHARS + 1)),
      /payload too long/,
    );
  });
});

describe("requireKnown / formatMemo", () => {
  it("requireKnown accepts known and refuses unknown", () => {
    assert.deepEqual(requireKnown("stake:pool1"), {
      action: "stake",
      payload: "pool1",
    });
    assert.throws(() => requireKnown("nope:x"), /unknown action/);
  });

  it("formatMemo round-trips", () => {
    assert.equal(formatMemo("vote"), "vote");
    assert.equal(formatMemo("blend", "r1"), "blend:r1");
    assert.deepEqual(parseMemo(formatMemo("unstake", "a1")), {
      action: "unstake",
      payload: "a1",
    });
  });

  it("formatMemo refuses bad payload", () => {
    assert.throws(() => formatMemo("claim", "Bad"), /bad payload/);
  });
});
