// Technical check for the Location Checker and Points & Badge logic.
// Run with:  node --test   (or: npm test)
import { test } from "node:test";
import assert from "node:assert/strict";
import { distanceMeters, checkIn, completeQuest, nextBadge } from "./geo.js";

const quest = { id: "q1", lat: 37.4503, lng: 126.6536, radius: 50, points: 10, available: true };

// Move a point north by a number of metres (1 degree of latitude ≈ 111,195 m).
const north = (p, m) => ({ lat: p.lat + m / 111195, lng: p.lng });

test("distance: same point is 0 m", () => {
  assert.equal(Math.round(distanceMeters(quest, quest)), 0);
});

test("distance: 100 m north is measured as about 100 m", () => {
  const d = distanceMeters(quest, north(quest, 100));
  assert.ok(Math.abs(d - 100) < 1, `got ${d}`);
});

test("S2-AC1: user 30 m away (inside 50 m radius) -> check-in succeeds", () => {
  const r = checkIn(quest, north(quest, 30));
  assert.equal(r.ok, true);
  assert.equal(r.distance, 30);
});

test("Alternate case: user 100 m away -> check-in fails, too_far", () => {
  const r = checkIn(quest, north(quest, 100));
  assert.equal(r.ok, false);
  assert.equal(r.reason, "too_far");
});

test("Boundary: exactly at the radius (50 m) counts as inside", () => {
  assert.equal(checkIn(quest, north(quest, 50)).ok, true);
});

test("Unavailable quest is never completed, even at the exact spot", () => {
  const r = checkIn({ ...quest, available: false }, quest);
  assert.equal(r.ok, false);
  assert.equal(r.reason, "unavailable");
});

test("S2-AC2: completing a quest adds its points and the first badge", () => {
  const r = completeQuest({ completed: [], points: 0 }, quest);
  assert.equal(r.progress.points, 10);
  assert.deepEqual(r.newBadges.map((b) => b.id), ["first-steps"]);
  assert.deepEqual(nextBadge(1), { id: "explorer", name: "Campus Explorer", needed: 3, remaining: 2 });
});

test("Repeat rule (temporary): same quest twice gives no extra points", () => {
  const first = completeQuest({ completed: [], points: 0 }, quest).progress;
  const second = completeQuest(first, quest);
  assert.equal(second.alreadyDone, true);
  assert.equal(second.progress.points, 10);
});

test("Privacy: saved progress holds only quest IDs and points, no coordinates", () => {
  const { progress } = completeQuest({ completed: [], points: 0 }, quest);
  assert.deepEqual(Object.keys(progress).sort(), ["completed", "points"]);
});
