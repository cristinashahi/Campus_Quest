// quests.js — Quest & Progress Data (temporary, hard-coded quest list).
// IMPORTANT: coordinates are APPROXIMATE placeholders around Inha University.
// Before field testing, replace each lat/lng with the real spot
// (Google Maps: long-press the place -> copy the numbers).

export const CAMPUS_CENTER = { lat: 37.4505, lng: 126.6545 };

export const QUESTS = [
  {
    id: "q1",
    title: "Main Building Steps",
    place: "Main Building (본관)",
    lat: 37.4503, lng: 126.6536,
    radius: 50, points: 10, available: true,
    task: "Find the main entrance and check in at the front steps.",
  },
  {
    id: "q2",
    title: "Library Explorer",
    place: "Jungseok Library (정석학술정보관)",
    lat: 37.4517, lng: 126.6545,
    radius: 50, points: 15, available: true,
    task: "Visit the library lobby and check in near the entrance gates.",
  },
  {
    id: "q3",
    title: "Lakeside Break",
    place: "Inha Lake (인하호수)",
    lat: 37.4495, lng: 126.6548,
    radius: 60, points: 10, available: true,
    task: "Walk to the lake and check in at the bench area.",
  },
  {
    id: "q4",
    title: "60th Anniversary Hall",
    place: "60th Anniversary Hall (60주년기념관)",
    lat: 37.4508, lng: 126.6568,
    radius: 50, points: 15, available: true,
    task: "Find the hall's main entrance and check in.",
  },
  {
    id: "q5",
    title: "Festival Stage (closed)",
    place: "Student Union area",
    lat: 37.4499, lng: 126.6560,
    radius: 50, points: 20, available: false,
    task: "Only open during festival week — used to test the 'unavailable' case.",
  },
];
