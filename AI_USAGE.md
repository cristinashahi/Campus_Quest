# AI_USAGE.md — Team Rocket (Campus Quest)

ISE4133 Software Engineering, Fall 2026
Members: Shahi Cristina, Anwar Syeda Sumaila

This file records every time our team used an AI tool, what we asked, what we accepted or changed, and how we checked it. AI output is never counted as user evidence or test results.

---

## 1. M1 Product Vision — AI critique

- **Date:** 2026-09-18
- **Tool:** ChatGPT
- **Document:** M1_product_vision_Team_Rocket.docx (Worksheet 3)
- **What we asked:** acting as a critical product coach, restate our user, problem, and value; identify assumptions, ambiguities, and alternatives; suggest evidence for our riskiest assumption. Full prompt is in the M1 document. We told it not to invent user research or test results.
- **What it said (summary):** the main assumption is that quests, points, and rewards will motivate students to explore campus; test this with a small clickable prototype; it is uncertain whether users see Campus Quest as different from a normal campus map.
- **Team decisions:**
  - Accepted: quests and rewards are the key assumption. We will test it with a clickable prototype and 5–8 students.
  - Rejected: including AR in the first version, because it adds a lot of complexity and is not needed to test the core idea.
  - Accepted: a normal campus map is the main alternative, so we must show what quests add.
  - Accept / investigate: users may not care about points and badges. We will test different reward presentations.
- **How we checked:** both members reviewed each suggestion and recorded accept / modify / reject with a reason in the M1 table.

## 2. Week 4 Lab — user stories and acceptance criteria

- **Date:** 2026-09-22
- **Tool:** ChatGPT
- **Document:** week04_lab_Team_Rocket.docx
- **What we asked:** help drafting and organizing the wording of user stories S1 and S2 and their acceptance criteria, based on our existing Campus Quest draft.
- **What the team decided:** the user, the scenario, the two stories, the priorities, and excluding AR.
- **What we changed:** during review we found that the check-in type and the points/badge rules were not clearly defined. We clarified that the first version only needs a simple location check-in or challenge, and that completing an available quest records completion, awards points, and updates badge progress. Detailed scoring and badge rules will be decided during implementation.
- **How we checked:** both members reviewed the wording and confirmed it matches our agreed scope (recorded in the Week 4 review section).

## 3. Week 5 Worksheet — Architecture v1

- **Date:** 2026-09-29
- **Tool:** Claude
- **Document:** week05_worksheet_Team_Rocket.docx
- **What we asked:** draw the structure diagram from our components; draft the wording of the ID table, alternate (no-result) case, D1 trade-off, assumption, and next check.
- **Also asked:** what "location spoofing" (faking GPS location) means as a cost of GPS, and how it could be handled later (e.g., rejecting impossible jumps between quests). We kept it as a known cost and did not add a solution to version 1.
- **What the team decided:** the components and criterion paths, Options A (GPS) and B (QR code), and choosing GPS, because posting QR codes everywhere on campus would be difficult.
- **What we changed:** AI first suggested QR codes; we rejected that and chose GPS for the reason above. 
- **How we checked:** Shahi Cristina and Anwar Syeda Sumaila checked that the IDs match Week 4 and agreed on the costs and the planned GPS check. The GPS accuracy check is planned, not yet done.

## 4. Midterm prototype and report

- **Date:** 2026-10-21
- **Tool:** Claude
- **What we asked:** help checking and correcting code for the Campus Quest prototype, explaining errors, and guiding us through using GitHub to manage and update our project files.
- **What AI produced:** suggestions for code corrections, explanations of implementation issues, and step-by-step guidance on GitHub commands and workflow.
- **What the team decided:** the product, user stories, components, and GPS decision from earlier weeks, as well as the work split and plan in Section 7.
- **What we changed:** replaced placeholder quest coordinates with real campus locations and adjusted the check-in radius after the field test.
- **How we checked:** ran node --test (expected 9/9 pass, actual: 9/9 passed, 0 failed; tested check-in on our phones in demo mode from different locations and on campus, with results documented in Section 5 of the report. Both members reviewed every report section against our earlier documents to check consistency with the agreed requirements and project scope.
