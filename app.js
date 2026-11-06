(function () {
  "use strict";

  var DATA = window.MILESTONES || [];
  var stage = document.getElementById("scenes");
  var timeline = document.getElementById("timeline");
  var countEl = document.getElementById("count");
  var btnPrev = document.getElementById("prev");
  var btnNext = document.getElementById("next");
  var btnPlay = document.getElementById("play");
  var btnReplay = document.getElementById("replay");
  var intro = document.getElementById("intro");
  var enterBtn = document.getElementById("enter");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var scenes = [];
  var segments = [];
  var index = 0;
  var playing = false;
  var elapsed = 0;
  var lastTs = 0;
  var raf = 0;
  var started = false;

  if (!DATA.length) {
    stage.innerHTML = '<p class="scene is-active">No scenes yet — add some in data.js.</p>';
    return;
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function durationOf(i) {
    return DATA[i].ms || 8000;
  }

  DATA.forEach(function (m, i) {
    var el = document.createElement("article");
    el.className = "scene";
    el.setAttribute("role", "group");
    el.setAttribute("aria-roledescription", "chapter");
    el.setAttribute("aria-label", (i + 1) + " of " + DATA.length + ": " + m.title);
    el.innerHTML =
      '<p class="scene__kicker">' +
        '<span class="scene__year">' + esc(m.year) + "</span>" +
        '<span class="scene__sep" aria-hidden="true"></span>' +
        esc(m.chapter) +
      "</p>" +
      '<h2 class="scene__title">' + esc(m.title) + "</h2>" +
      '<p class="scene__body">' + esc(m.body) + "</p>" +
      (m.tags && m.tags.length
        ? '<ul class="scene__tags">' +
          m.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
          "</ul>"
        : "") +
      (m.note ? '<p class="scene__note">' + esc(m.note) + "</p>" : "");
    stage.appendChild(el);
    scenes.push(el);

    var seg = document.createElement("span");
    seg.className = "timeline__seg";
    seg.appendChild(document.createElement("i"));
    timeline.appendChild(seg);
    segments.push(seg);
  });

  function paint() {
    var p = Math.min(1, elapsed / durationOf(index));
    segments.forEach(function (seg, k) {
      var fill = seg.firstChild;
      if (k < index) fill.style.transform = "scaleX(1)";
      else if (k === index) fill.style.transform = "scaleX(" + p + ")";
      else fill.style.transform = "scaleX(0)";
      seg.classList.toggle("is-current", k === index);
    });
  }

  function show(i) {
    index = Math.max(0, Math.min(scenes.length - 1, i));
    elapsed = 0;
    scenes.forEach(function (s, k) {
      s.classList.toggle("is-active", k === index);
      s.setAttribute("aria-hidden", k === index ? "false" : "true");
    });
    var accent = DATA[index].accent || "#8ef0c0";
    document.documentElement.style.setProperty("--accent", accent);
    countEl.textContent = pad(index + 1) + " / " + pad(scenes.length);
    paint();
  }

  function tick(ts) {
    if (!playing) return;
    if (!lastTs) lastTs = ts;
    // Clamp so a backgrounded tab doesn't jump several scenes at once.
    elapsed += Math.min(ts - lastTs, 250);
    lastTs = ts;

    var dur = durationOf(index);
    if (elapsed >= dur) {
      if (index < scenes.length - 1) {
        show(index + 1);
      } else {
        elapsed = dur;
        paint();
        pause();
        btnPlay.textContent = "↺";
        btnPlay.setAttribute("aria-label", "Replay film");
        return;
      }
    } else {
      paint();
    }
    raf = requestAnimationFrame(tick);
  }

  function play() {
    if (index === scenes.length - 1 && elapsed >= durationOf(index) - 1) {
      show(0);
    }
    playing = true;
    lastTs = 0;
    btnPlay.textContent = "❚❚";
    btnPlay.setAttribute("aria-label", "Pause film");
    btnPlay.setAttribute("aria-pressed", "true");
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  function pause() {
    playing = false;
    cancelAnimationFrame(raf);
    btnPlay.textContent = "▶";
    btnPlay.setAttribute("aria-label", "Play film");
    btnPlay.setAttribute("aria-pressed", "false");
  }

  function toggle() {
    if (playing) pause();
    else play();
  }

  function go(delta) {
    var target = index + delta;
    if (target < 0) target = 0;
    if (target > scenes.length - 1) target = scenes.length - 1;
    show(target);
    if (playing) {
      lastTs = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }
  }

  function begin() {
    if (started) return;
    started = true;
    intro.classList.add("is-gone");
    intro.setAttribute("aria-hidden", "true");
    window.setTimeout(function () {
      if (intro.parentNode) intro.parentNode.removeChild(intro);
    }, 900);
    show(0);
    if (!reduceMotion) play();
    else {
      // Reduced motion: stay on the first frame until asked to play.
      document.documentElement.style.setProperty("--accent", DATA[0].accent || "#8ef0c0");
    }
  }

  enterBtn.addEventListener("click", begin);
  btnNext.addEventListener("click", function () { go(1); });
  btnPrev.addEventListener("click", function () { go(-1); });
  btnPlay.addEventListener("click", toggle);
  btnReplay.addEventListener("click", function () { show(0); play(); });

  segments.forEach(function (seg, i) {
    seg.style.cursor = "pointer";
    seg.style.pointerEvents = "auto";
    seg.addEventListener("click", function () { go(i - index); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === " " || e.key === "Spacebar") { e.preventDefault(); toggle(); }
    else if (e.key === "Home") { e.preventDefault(); go(-index); }
    else if (e.key === "End") { e.preventDefault(); go(scenes.length - 1 - index); }
  });

  var touchX = null;
  document.addEventListener("touchstart", function (e) {
    touchX = e.changedTouches[0].clientX;
  }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (touchX == null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  }, { passive: true });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden && playing) pause();
  });

  // Pre-show state: first scene rendered behind the intro overlay.
  show(0);
  countEl.textContent = pad(1) + " / " + pad(scenes.length);
})();
