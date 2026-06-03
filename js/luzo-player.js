/**
 * Reproductor LUZO — UI custom en móvil / in-app + nativo en escritorio
 */
(function (global) {
  "use strict";

  var active = { audio: null, player: null, title: "", wantedPlay: false };
  var backgroundReady = false;
  var MOBILE_MQ = "(max-width: 767.98px)";
  var IN_APP_RE = /Instagram|FBAN|FBAV|FB_IAB|Line\/|Twitter|LinkedInApp|Snapchat/i;

  function isInAppBrowser() {
    return IN_APP_RE.test(navigator.userAgent || "");
  }

  function markInAppRoot() {
    if (isInAppBrowser()) {
      document.documentElement.classList.add("in-app-browser");
    }
  }

  function usesCustomUI() {
    if (isInAppBrowser()) return true;
    if (window.matchMedia && window.matchMedia(MOBILE_MQ).matches) return true;
    if (navigator.maxTouchPoints > 0 && window.innerWidth < 1024) return true;
    return false;
  }

  function syncPlayerLayout(player, audio) {
    var custom = usesCustomUI();
    var shell = player.querySelector(".luzo-player__shell");
    player.classList.toggle("luzo-player--custom", custom);
    player.classList.toggle("luzo-player--native", !custom);
    if (custom) {
      audio.removeAttribute("controls");
      if (shell) shell.hidden = false;
    } else {
      audio.setAttribute("controls", "");
      if (shell) shell.hidden = true;
    }
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var ss = s < 10 ? "0" + s : String(s);
    if (h > 0) {
      var mm = m < 10 ? "0" + m : String(m);
      return h + ":" + mm + ":" + ss;
    }
    return m + ":" + ss;
  }

  function iconPlay() {
    return (
      '<svg class="luzo-player__icon luzo-player__icon--play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M8 5v14l11-7z"/>' +
      "</svg>" +
      '<svg class="luzo-player__icon luzo-player__icon--pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>' +
      "</svg>"
    );
  }

  /** Siempre incluye shell; CSS/JS eligen custom vs nativo */
  function buildPlayerMarkup(file, title) {
    return (
      '<div class="luzo-player" data-src="' +
      file +
      '" data-title="' +
      title +
      '">' +
      '<audio class="luzo-player__audio" preload="metadata" playsinline src="' +
      file +
      '"></audio>' +
      '<div class="luzo-player__shell glass">' +
      '<div class="luzo-player__top">' +
      '<button type="button" class="luzo-player__play" aria-label="Play ' +
      title +
      '">' +
      iconPlay() +
      "</button>" +
      '<div class="luzo-player__viz" aria-hidden="true">' +
      "<span></span><span></span><span></span><span></span><span></span>" +
      "</div>" +
      "</div>" +
      '<div class="luzo-player__main">' +
      '<div class="luzo-player__progress" role="slider" tabindex="0" aria-label="Track position" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
      '<div class="luzo-player__progress-track">' +
      '<div class="luzo-player__progress-fill"></div>' +
      '<div class="luzo-player__progress-glow"></div>' +
      '<div class="luzo-player__thumb"></div>' +
      "</div>" +
      "</div>" +
      '<div class="luzo-player__times">' +
      '<span class="luzo-player__current">0:00</span>' +
      '<span class="luzo-player__sep" aria-hidden="true">/</span>' +
      '<span class="luzo-player__duration">--:--</span>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function pauseOthers(except) {
    document.querySelectorAll(".luzo-player__audio").forEach(function (a) {
      if (a !== except && !a.paused) a.pause();
    });
  }

  function setPlayingState(player, audio, title) {
    active.audio = audio;
    active.player = player;
    active.title = title;
    document.querySelectorAll(".luzo-player").forEach(function (p) {
      p.classList.toggle("is-active", p === player);
    });
  }

  function updateMediaSession(title, playing) {
    if (!("mediaSession" in navigator)) return;
    try {
      if (playing) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title,
          artist: "LUZO",
          album: "Mis mezclas",
          artwork: [
            {
              src: "https://luzodj.com/assets/images/hero.jpg",
              sizes: "512x512",
              type: "image/jpeg",
            },
          ],
        });
        navigator.mediaSession.playbackState = "playing";
      } else {
        navigator.mediaSession.playbackState = "paused";
      }
    } catch (err) {
      /* ignore */
    }
  }

  function setupMediaSessionActions() {
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.setActionHandler("play", function () {
      if (active.audio) active.audio.play().catch(function () {});
    });
    navigator.mediaSession.setActionHandler("pause", function () {
      if (active.audio) active.audio.pause();
    });
    navigator.mediaSession.setActionHandler("seekbackward", function () {
      if (active.audio) active.audio.currentTime = Math.max(0, active.audio.currentTime - 15);
    });
    navigator.mediaSession.setActionHandler("seekforward", function () {
      if (!active.audio) return;
      var end = active.audio.duration || 0;
      active.audio.currentTime = Math.min(end, active.audio.currentTime + 15);
    });
  }

  function updateUI(player, audio) {
    if (!player.classList.contains("luzo-player--custom")) return;

    var fill = player.querySelector(".luzo-player__progress-fill");
    var glow = player.querySelector(".luzo-player__progress-glow");
    var thumb = player.querySelector(".luzo-player__thumb");
    var slider = player.querySelector(".luzo-player__progress");
    var cur = player.querySelector(".luzo-player__current");
    var dur = player.querySelector(".luzo-player__duration");
    var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;

    if (fill) fill.style.width = pct + "%";
    if (glow) glow.style.width = pct + "%";
    if (thumb) thumb.style.left = pct + "%";
    if (slider) slider.setAttribute("aria-valuenow", String(Math.round(pct)));
    if (cur) cur.textContent = formatTime(audio.currentTime);
    if (dur) dur.textContent = audio.duration ? formatTime(audio.duration) : "--:--";

    var playing = !audio.paused && !audio.ended;
    player.classList.toggle("is-playing", playing);
    player.classList.toggle("is-loading", audio.readyState < 3 && playing);
  }

  function seekFromPointer(player, audio, clientX) {
    var track = player.querySelector(".luzo-player__progress-track");
    if (!track || !audio.duration) return;
    var rect = track.getBoundingClientRect();
    if (!rect.width) return;
    var pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
    updateUI(player, audio);
  }

  function bindScrubber(player, audio) {
    var progress = player.querySelector(".luzo-player__progress");
    if (!progress) return;

    var dragging = false;

    function onDown(clientX) {
      if (!audio.duration) return;
      dragging = true;
      seekFromPointer(player, audio, clientX);
    }

    function onMove(clientX) {
      if (!dragging) return;
      seekFromPointer(player, audio, clientX);
    }

    function onUp() {
      dragging = false;
    }

    progress.addEventListener("pointerdown", function (e) {
      if (progress.setPointerCapture) progress.setPointerCapture(e.pointerId);
      onDown(e.clientX);
    });
    progress.addEventListener("pointermove", function (e) {
      onMove(e.clientX);
    });
    progress.addEventListener("pointerup", onUp);
    progress.addEventListener("pointercancel", onUp);

    progress.addEventListener(
      "touchstart",
      function (e) {
        if (!e.touches.length) return;
        onDown(e.touches[0].clientX);
        e.preventDefault();
      },
      { passive: false }
    );
    progress.addEventListener(
      "touchmove",
      function (e) {
        if (!dragging || !e.touches.length) return;
        onMove(e.touches[0].clientX);
        e.preventDefault();
      },
      { passive: false }
    );
    progress.addEventListener("touchend", onUp);
    progress.addEventListener("touchcancel", onUp);

    progress.addEventListener("click", function (e) {
      onDown(e.clientX);
    });

    progress.addEventListener("keydown", function (e) {
      if (!audio.duration) return;
      var step = e.shiftKey ? 30 : 10;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        audio.currentTime = Math.min(audio.duration, audio.currentTime + step);
        updateUI(player, audio);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - step);
        updateUI(player, audio);
      }
    });
  }

  function bindPlayer(player) {
    var audio = player.querySelector(".luzo-player__audio");
    var btn = player.querySelector(".luzo-player__play");
    var src = player.getAttribute("data-src");
    var title = player.getAttribute("data-title") || "LUZO";

    if (!audio || !src) return;

    audio.setAttribute("playsinline", "");
    audio.setAttribute("webkit-playsinline", "");
    audio.setAttribute("x-webkit-airplay", "allow");
    if (!audio.getAttribute("src")) audio.src = src;

    syncPlayerLayout(player, audio);

    audio.addEventListener("play", function () {
      pauseOthers(audio);
      setPlayingState(player, audio, title);
      active.wantedPlay = true;
      updateMediaSession(title, true);
      updateUI(player, audio);
    });

    audio.addEventListener("pause", function () {
      if (active.audio === audio) {
        updateMediaSession(title, false);
        if (!document.hidden) active.wantedPlay = false;
      }
      updateUI(player, audio);
    });

    audio.addEventListener("ended", function () {
      active.wantedPlay = false;
      updateMediaSession(title, false);
      updateUI(player, audio);
    });

    audio.addEventListener("timeupdate", function () {
      updateUI(player, audio);
    });

    audio.addEventListener("loadedmetadata", function () {
      updateUI(player, audio);
    });

    audio.addEventListener("waiting", function () {
      player.classList.add("is-loading");
    });

    audio.addEventListener("canplay", function () {
      player.classList.remove("is-loading");
      updateUI(player, audio);
    });

    if (!btn) return;

    btn.addEventListener("click", function () {
      if (audio.paused) {
        pauseOthers(audio);
        setPlayingState(player, audio, title);
        active.wantedPlay = true;
        audio.play().catch(function () {});
      } else {
        audio.pause();
        active.wantedPlay = false;
      }
    });

    bindScrubber(player, audio);
  }

  function initBackgroundPlayback() {
    if (backgroundReady) return;
    backgroundReady = true;

    document.addEventListener("visibilitychange", function () {
      var a = active.audio;
      if (!a) return;

      if (document.hidden) {
        if (!a.paused) active.wantedPlay = true;
        window.setTimeout(function () {
          if (document.hidden && active.audio === a && active.wantedPlay && a.paused) {
            a.play().catch(function () {});
          }
        }, 400);
      } else if (active.wantedPlay && a.paused) {
        a.play().catch(function () {});
      }
    });
  }

  function refreshLayouts() {
    document.querySelectorAll(".luzo-player[data-bound]").forEach(function (player) {
      var audio = player.querySelector(".luzo-player__audio");
      if (audio) syncPlayerLayout(player, audio);
    });
  }

  var resizeTimer;

  function init(root) {
    markInAppRoot();
    var scope = root || document;
    scope.querySelectorAll(".luzo-player:not([data-bound])").forEach(function (player) {
      player.setAttribute("data-bound", "1");
      bindPlayer(player);
      if (isInAppBrowser()) {
        player.classList.add("visible");
      }
    });
    setupMediaSessionActions();
    initBackgroundPlayback();

    if (!init.resizeBound) {
      init.resizeBound = true;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(refreshLayouts, 150);
      });
      window.addEventListener("orientationchange", function () {
        setTimeout(refreshLayouts, 300);
      });
    }
  }

  markInAppRoot();

  global.LuzoPlayer = {
    build: buildPlayerMarkup,
    init: init,
    refreshLayouts: refreshLayouts,
    isInAppBrowser: isInAppBrowser,
    usesCustomUI: usesCustomUI,
  };
})(window);
