// app.js — Quest Map UI + Quest Manager for the Campus Quest prototype.
import { QUESTS, CAMPUS_CENTER } from "./quests.js";
import { checkIn, completeQuest, badgesFor, nextBadge, BADGES } from "./geo.js";

const STORAGE_KEY = "campusQuestProgress";
let progress = loadProgress();
let selected = null;

// ---------- Quest & Progress Data (this device only) ----------
function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.completed)) return saved;
  } catch (e) { /* storage blocked or empty */ }
  return { completed: [], points: 0 };
}
function saveProgress() {
  // Only quest IDs and points are saved — never coordinates.
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) {}
}

// ---------- Quest Map UI ----------
const map = L.map("map").setView([CAMPUS_CENTER.lat, CAMPUS_CENTER.lng], 17);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const markers = {};
for (const q of QUESTS) {
  markers[q.id] = L.circleMarker([q.lat, q.lng], markerStyle(q))
    .addTo(map)
    .bindTooltip(q.title)
    .on("click", () => selectQuest(q.id));
}

function markerStyle(q) {
  const done = progress.completed.includes(q.id);
  const color = !q.available ? "#9aa5a3" : done ? "#1f5f52" : "#2f7d6d";
  return { radius: 10, color, weight: 2, fillColor: color, fillOpacity: done ? 0.9 : 0.45 };
}

function statusTag(q) {
  if (!q.available) return '<span class="tag off">Unavailable</span>';
  if (progress.completed.includes(q.id)) return '<span class="tag done">Completed</span>';
  return `<span class="tag">${q.points} pts</span>`;
}

function renderList() {
  const list = document.getElementById("quest-list");
  list.innerHTML = "";
  for (const q of QUESTS) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${q.title}</span>${statusTag(q)}`;
    li.addEventListener("click", () => selectQuest(q.id));
    list.appendChild(li);
  }
}

function renderScore() {
  document.getElementById("score").textContent = `${progress.points} pts`;
  const earned = badgesFor(progress.completed.length).map((b) => b.id);
  const next = nextBadge(progress.completed.length);
  document.getElementById("badges").innerHTML =
    BADGES.map((b) => `<span class="badge ${earned.includes(b.id) ? "" : "locked"}">${b.name}</span>`).join("") +
    `<p class="muted">${next ? `${next.remaining} more quest(s) to unlock <b>${next.name}</b>.` : "All badges unlocked!"}</p>`;
}

// S1-AC2: show the selected quest's location and basic information.
function selectQuest(id) {
  selected = QUESTS.find((q) => q.id === id);
  map.panTo([selected.lat, selected.lng]);
  const done = progress.completed.includes(id);
  document.getElementById("details").innerHTML = `
    <h3>${selected.title}</h3>
    <p class="muted">${selected.place} · ${selected.points} pts · check-in within ${selected.radius} m</p>
    <p>${selected.task}</p>
    <button class="primary" id="checkin" ${done ? "disabled" : ""}>${done ? "Already completed" : "Check in here"}</button>`;
  if (!done) document.getElementById("checkin").addEventListener("click", onCheckIn);
  hideResult();
}

// ---------- Quest Manager: check-in flow (S2-AC1, S2-AC2, alternate case) ----------
function onCheckIn() {
  const quest = selected;
  if (document.getElementById("demo").checked) {
    // Simulated position for demos: exactly at the quest.
    handlePosition(quest, { lat: quest.lat, lng: quest.lng }, "demo");
    return;
  }
  if (!navigator.geolocation) {
    showResult(false, "This browser cannot read your location.");
    return;
  }
  showResult(null, "Reading your location…");
  // Location is read once, only now, and is not stored anywhere.
  navigator.geolocation.getCurrentPosition(
    (pos) => handlePosition(quest, { lat: pos.coords.latitude, lng: pos.coords.longitude }, "gps", pos.coords.accuracy),
    (err) => showResult(false, err.code === 1
      ? "Location permission was denied, so we cannot check you in."
      : "Could not get your location. Try again outside or near a window."),
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  );
}

function handlePosition(quest, position, source, accuracy) {
  const result = checkIn(quest, position); // Location Checker
  const where = source === "demo" ? " (demo location)" : accuracy ? ` (GPS accuracy ±${Math.round(accuracy)} m)` : "";

  if (!result.ok) {
    const msg = result.reason === "unavailable"
      ? "This quest is currently unavailable, so it cannot be completed."
      : `You are not at the quest location yet: about ${result.distance} m away, need to be within ${quest.radius} m${where}.`;
    showResult(false, msg); // no points change in the failure case
    return;
  }

  const r = completeQuest(progress, quest); // Points & Badge System
  progress = r.progress;
  saveProgress();
  markers[quest.id].setStyle(markerStyle(quest));
  renderList();
  renderScore();
  selectQuest(quest.id);
  const badgeText = r.newBadges.length ? ` New badge: <b>${r.newBadges.map((b) => b.name).join(", ")}</b>!` : "";
  showResult(true, `Quest completed! +${r.added} points (you were ${result.distance} m away${where}).${badgeText}`);
}

function showResult(ok, html) {
  const el = document.getElementById("result");
  el.className = "card" + (ok === true ? " ok" : ok === false ? " fail" : "");
  el.innerHTML = html;
}
function hideResult() { document.getElementById("result").className = "card hidden"; }

document.getElementById("reset").addEventListener("click", () => {
  progress = { completed: [], points: 0 };
  saveProgress();
  QUESTS.forEach((q) => markers[q.id].setStyle(markerStyle(q)));
  renderList(); renderScore();
  if (selected) selectQuest(selected.id);
});

renderList();
renderScore();
