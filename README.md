# Campus Quest — midterm prototype (ISE4133, Team Rocket)

A small web app for the core Campus Quest task: see quests on a campus map, pick one, walk there, and check in with GPS to earn points and badges.

## What works in this version
| Story / criterion | Feature | Where in code |
|---|---|---|
| S1-AC1 | Map shows selectable quest locations | `app.js` (Quest Map UI) |
| S1-AC2 | Selecting a quest shows its location and information | `app.js` → `selectQuest()` |
| S2-AC1 | GPS check-in marks the quest completed when within the radius | `geo.js` → `checkIn()` |
| S2-AC2 | Completion adds points and updates badge progress | `geo.js` → `completeQuest()` |
| Alternate case | Too far away or unavailable → not completed, no points | `geo.js` → `checkIn()` |

**Temporary / simulated parts**
- Quests are hard-coded in `quests.js`. Coordinates are approximate and must be replaced with real spots.
- Progress is saved only in the browser on this device (no server or login yet).
- "Demo mode" simulates standing at the selected quest, for classroom demos. Real check-ins use GPS.

**Privacy:** the location is read only when the user taps *Check in*, and it is never saved. Only completed quest IDs and points are stored.

## Run it

### Option 1 — on your computer
Needs Python 3 (or any static file server).
```
cd campus-quest
python -m http.server 8000
```
Open http://localhost:8000 in a browser. GPS works on `localhost`; on a laptop the location may be inaccurate, so use Demo mode.

### Option 2 — on your phone (for real GPS tests)
Phones only allow GPS on HTTPS pages, so publish with GitHub Pages:
1. Push this folder to a GitHub repository.
2. Repository → Settings → Pages → Source: *Deploy from a branch*, Branch: `main`, folder `/ (root)` → Save.
3. After about a minute, open `https://<your-username>.github.io/<repo-name>/` on your phone and allow location access.

## Technical check (automated tests)
Needs Node.js 18 or newer. No installation needed.
```
cd campus-quest
node --test
```
Expected: `# tests 9`, `# pass 9`, `# fail 0`. The tests cover the distance calculation, check-in inside/outside the radius, the exact-radius boundary, the unavailable quest, points and badges, the no-repeat rule, and that saved progress contains no coordinates.

## Files
- `index.html`, `style.css` — page layout
- `app.js` — Quest Map UI and Quest Manager (check-in flow)
- `geo.js` — Location Checker and Points & Badge System (pure functions, tested)
- `quests.js` — temporary quest data
- `tests/geo.test.js` — technical check
- `AI_USAGE.md` — record of AI use
