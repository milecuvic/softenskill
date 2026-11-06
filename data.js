/**
 * The reel. Edit this file to change the film — no build step required.
 * Every entry becomes one scene, in order.
 *
 *   year    string   shown in the kicker
 *   chapter string   e.g. "Chapter I"
 *   title   string   the big serif line
 *   body    string   one or two sentences
 *   tags    string[] optional pills
 *   note    string   optional footnote, monospace
 *   accent  string   any CSS color; the whole UI re-tints to it
 *   ms      number   how long the scene is on screen (default 8000)
 */
window.MILESTONES = [
  {
    year: "2026",
    chapter: "Chapter I",
    title: "A blank frame",
    body: "Every film opens on an empty screen. A new account, a new workspace, and one repository holding nothing but a license. This is that frame.",
    tags: ["origin", "milecuvic", "workspace"],
    accent: "#8ef0c0",
    ms: 7500,
  },
  {
    year: "2026",
    chapter: "Chapter II",
    title: "Soft skills, hard proof",
    body: "Soft skills are invisible until someone records them. The name is the thesis: build the evidence, then let it speak for itself.",
    tags: ["thesis", "practice", "evidence"],
    accent: "#ffd48a",
    ms: 7500,
  },
  {
    year: "2026",
    chapter: "Chapter III",
    title: "Source greeding",
    body: "Collecting workspaces the way a film collects footage — greedily, then cutting all of it into something with a shape.",
    tags: ["EGas", "mega workspace", "archive"],
    accent: "#ff9f8a",
    ms: 7500,
  },
  {
    year: "2026",
    chapter: "Chapter IV",
    title: "The first commit",
    body: "November 5, 2026. One commit, one file, one branch called main. Small enough to forget — which is exactly why it gets a scene.",
    tags: ["6e03b57", "initial commit", "main"],
    accent: "#b7a8ff",
    ms: 8000,
  },
  {
    year: "2026",
    chapter: "Chapter V",
    title: "Static, but alive",
    body: "No framework, no build step, no network calls. A few hundred lines that run anywhere a browser does — even straight off the disk.",
    tags: ["html", "css", "vanilla js"],
    accent: "#8ad8ff",
    ms: 8000,
  },
  {
    year: "2026",
    chapter: "Chapter VI",
    title: "Behind the door",
    body: "Visibility is a switch, not a wall. Flip the repository private and the film keeps playing — access simply belongs to whoever holds the key.",
    tags: ["private", "access", "pat"],
    accent: "#ff9ecb",
    ms: 8000,
  },
  {
    year: "—",
    chapter: "Chapter VII",
    title: "Next take",
    body: "The reel is not the work. It is the argument that the work happened. Add a scene every time something real lands.",
    tags: ["roadmap", "keep rolling"],
    accent: "#c6f08a",
    ms: 9000,
  },
];
