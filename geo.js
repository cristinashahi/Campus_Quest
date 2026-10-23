// geo.js — Location Checker and Points & Badge logic for Campus Quest.
// Pure functions (no browser APIs), so they can be tested with Node.

const EARTH_RADIUS_M = 6371000;

// Distance in metres between two {lat, lng} points (haversine formula).
export function distanceMeters(a, b) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

// Location Checker (D1, Option A): is the user within the quest's radius?
// Returns { ok, reason, distance } — reason is "ok", "unavailable" or "too_far".
export function checkIn(quest, position) {
  if (!quest.available) {
    return { ok: false, reason: "unavailable", distance: null };
  }
  const distance = Math.round(distanceMeters(position, quest));
  if (distance <= quest.radius) {
    return { ok: true, reason: "ok", distance };
  }
  return { ok: false, reason: "too_far", distance };
}

// Badge rules (draft — detailed rules are decided during implementation).
export const BADGES = [
  { id: "first-steps", name: "First Steps", needed: 1 },
  { id: "explorer", name: "Campus Explorer", needed: 3 },
  { id: "master", name: "Quest Master", needed: 5 },
];

// Points & Badge System: returns a NEW progress object after completing a quest.
// Progress stores only quest IDs and points — never the user's coordinates.
// Temporary rule: a completed quest cannot be repeated (still an open team decision).
export function completeQuest(progress, quest) {
  if (progress.completed.includes(quest.id)) {
    return { progress, added: 0, newBadges: [], alreadyDone: true };
  }
  const completed = [...progress.completed, quest.id];
  const points = progress.points + quest.points;
  const before = badgesFor(progress.completed.length).map((b) => b.id);
  const after = badgesFor(completed.length);
  const newBadges = after.filter((b) => !before.includes(b.id));
  return { progress: { completed, points }, added: quest.points, newBadges, alreadyDone: false };
}

export function badgesFor(count) {
  return BADGES.filter((b) => count >= b.needed);
}

// Next badge and how many more quests it needs (for the progress display).
export function nextBadge(count) {
  const next = BADGES.find((b) => count < b.needed);
  return next ? { ...next, remaining: next.needed - count } : null;
}
