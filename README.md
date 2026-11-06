# softenskill

> a film of growth

A cinematic milestone reel. Each entry in `data.js` becomes one scene: a year, a
chapter, a big serif line, a short body, and a set of tags. The scenes autoplay
like a film, the whole UI re-tints to the current scene's accent color, and the
segmented strip at the top is the reel itself.

No framework. No build step. No network calls. It runs from `index.html` on disk
or from any static host.

## Run it

```bash
# option 1 — zero-dependency local server
npm start          # http://localhost:4173

# option 2 — just open the file
start index.html   # Windows
open index.html    # macOS
```

## Controls

| Action            | Input                          |
| ----------------- | ------------------------------ |
| Next / previous   | `→` / `←`, buttons, or swipe   |
| Play / pause      | `space` or the middle button   |
| Jump to a chapter | click a segment in the top strip |
| First / last      | `Home` / `End`                 |
| Restart           | `replay`                       |

## Add a scene

Open `data.js` and append an object to `window.MILESTONES`:

```js
{
  year: "2026",
  chapter: "Chapter VIII",
  title: "Something real",
  body: "One or two sentences about what actually landed.",
  tags: ["ship", "evidence"],
  accent: "#ffd48a",   // any CSS color
  ms: 8000,            // time on screen
}
```

Order in the array is the order of the film. Delete an entry to cut a scene.

## Files

| File         | Purpose                                        |
| ------------ | ---------------------------------------------- |
| `index.html` | Shell: brand, reel strip, stage, transport bar |
| `styles.css` | The look — grain, glow, per-scene accent       |
| `app.js`     | Film engine: playback, timing, keys, swipe     |
| `data.js`    | The content. Edit this one most.               |
| `server.js`  | Optional zero-dependency static server         |

## Deploy

Settings → Pages → *Deploy from a branch* → `main` / root. Nothing to compile.

## License

See [LICENSE](LICENSE).
