// quests.js — Quest & Progress Data (temporary, hard-coded quest list).
// IMPORTANT: coordinates are APPROXIMATE placeholders around Inha University.
// Before field testing, replace each lat/lng with the real spot
// (Google Maps: long-press the place -> copy the numbers).

export const CAMPUS_CENTER = { lat: 37.4505, lng: 126.6545 };

export const QUESTS = [
  {
    id: "q1",
    title: "Back Gate Check-in",
    place: "Inha University Back Gate (후문)",
    lat: 37.451120, lng: 126.656422,
    radius: 50, points: 10, available: true,
    task: "Go to the back gate entrance and check in at the gate.",
  },
  {
    id: "q2",
    title: "Library Explorer",
    place: "Jungseok Library (정석학술정보관)",
    lat: 37.449261, lng: 126.652622,
    radius: 50, points: 15, available: true,
    task: "Visit the library lobby and check in near the entrance gates.",
  },
  {
    id: "q3",
    title: "Lakeside Break",
    place: "Inkyung Lake (인경호)",
    lat: 37.449832, lng: 126.656275,
    radius: 60, points: 10, available: true,
    task: "Walk to the lake and check in at the bench area.",
  },
  {
    id: "q4",
    title: "60th Anniversary Hall",
    place: "60th Anniversary Hall (60주년기념관)",
    lat: 37.450886, lng: 126.654349,
    radius: 50, points: 15, available: true,
    task: "Find the hall's main entrance and check in.",
  },
  {
    id: "q5",
    title: "Festival Stage (closed)",
    place: "Student Union area",
    lat: 37.449189, lng: 126.656106,
    radius: 50, points: 20, available: false,
    task: "Only open during festival week — used to test the 'unavailable' case.",
  },
];
