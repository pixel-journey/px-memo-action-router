/**
 * Composition: a transfer-memo desk.
 * format → requireKnown → route. Claim payloads are one-shot so the same
 * claim:id cannot be processed twice. Soft parse keeps unknown memos for
 * logging without routing them.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  formatMemo,
  parseMemo,
  requireKnown,
  type KnownAction,
} from "./memo.ts";

type Route = {
  action: KnownAction;
  payload: string | null;
  memo: string;
};

type Desk = {
  routes: Route[];
  seenClaims: Set<string>;
};

function openDesk(): Desk {
  return { routes: [], seenClaims: new Set() };
}

function routeKnown(desk: Desk, memo: string): Route {
  const { action, payload } = requireKnown(memo);
  if (action === "claim" && payload !== null) {
    if (desk.seenClaims.has(payload)) throw new Error("claim already processed");
    desk.seenClaims.add(payload);
  }
  const route: Route = { action, payload, memo };
  desk.routes.push(route);
  return route;
}

describe("composition: memo transfer desk", () => {
  it("format → requireKnown → route for every known action", () => {
    const desk = openDesk();
    const cases: [KnownAction, string | null][] = [
      ["blend", "pebble-to-rock"],
      ["stake", "pool1"],
      ["unstake", "pool1"],
      ["claim", "job42"],
      ["vote", null],
    ];
    for (const [action, payload] of cases) {
      const memo = formatMemo(action, payload);
      const r = routeKnown(desk, memo);
      assert.equal(r.action, action);
      assert.equal(r.payload, payload);
      assert.deepEqual(parseMemo(memo), { action, payload });
    }
    assert.equal(desk.routes.length, 5);
  });

  it("same claim payload is one-shot; different payload is allowed", () => {
    const desk = openDesk();
    routeKnown(desk, formatMemo("claim", "airdrop-1"));
    assert.throws(
      () => routeKnown(desk, formatMemo("claim", "airdrop-1")),
      /claim already processed/,
    );
    const second = routeKnown(desk, formatMemo("claim", "airdrop-2"));
    assert.equal(second.payload, "airdrop-2");
    assert.equal(desk.seenClaims.size, 2);
  });

  it("soft parse keeps unknown; requireKnown refuses it", () => {
    const soft = parseMemo("custom:xyz");
    assert.equal(soft.action, "unknown");
    assert.throws(() => requireKnown("custom:xyz"), /unknown action/);
    assert.throws(() => routeKnown(openDesk(), "custom:xyz"), /unknown action/);
  });

  it("batch order is preserved and claim-only memos skip the seen set", () => {
    const desk = openDesk();
    const batch = [
      formatMemo("stake", "pool1"),
      formatMemo("claim"),
      formatMemo("claim"),
      formatMemo("blend", "r1"),
    ];
    for (const m of batch) routeKnown(desk, m);
    assert.equal(desk.routes.length, 4);
    assert.equal(desk.seenClaims.size, 0);
    assert.deepEqual(
      desk.routes.map((r) => r.action),
      ["stake", "claim", "claim", "blend"],
    );
  });
});
