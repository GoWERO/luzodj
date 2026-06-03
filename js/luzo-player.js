/**
 * Reproductor LUZO — UI personalizada + Media Session (lock screen / segundo plano)
 */
(function (global) {
  "use strict";

  var active = { audio: null, player: null, title: "", wantedPlay: false };
  var backgroundReady = false;

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
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

  function buildPlayerMarkup(file, title) {
    return (
      '<div class="luzo-player" data-src="' +
      file +
      '" data-title="' +
      title +
      '">' +
      '<audio class="luzo-player__audio" preload="metadata" playsinline></audio>' +
      '<div class="luzo-player__shell glass">' +
      '<button type="button" class="luzo-player__play" aria-label="Reproducir ' +
      title +
      '">' +
      iconPlay() +
      "</button>" +
      '<div class="luzo-player__viz" aria-hidden="true">' +
      "<span></span><span></span><span></span><span></span><span></span>" +
      "</div>" +
      '<div class="luzo-player__main">' +
      '<div class="luzo-player__progress">' +
      '<div class="luzo-player__progress-track">' +
      '<div class="luzo-player__progress-fill"></div>' +
      '<div class="luzo-player__progress-glow"></div>' +
      "</div>" +
      '<input type="range" class="luzo-player__seek" min="0" max="100" value="0" step="0.1" aria-label="Posición en la pista">' +
      "</div>" +
      '<div class="luzo-player__times">' +
      '<span class="luzo-player__current">0:00</span>' +
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
    var fill = player.querySelector(".luzo-player__progress-fill");
    var glow = player.querySelector(".luzo-player__progress-glow");
    var seek = player.querySelector(".luzo-player__seek");
    var cur = player.querySelector(".luzo-player__current");
    var dur = player.querySelector(".luzo-player__duration");
    var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;

    if (fill) fill.style.width = pct + "%";
    if (glow) glow.style.width = pct + "%";
    if (seek && document.activeElement !== seek) seek.value = String(pct);
    if (cur) cur.textContent = formatTime(audio.currentTime);
    if (dur) dur.textContent = audio.duration ? formatTime(audio.duration) : "--:--";

    var playing = !audio.paused && !audio.ended;
    player.classList.toggle("is-playing", playing);
    player.classList.toggle("is-loading", audio.readyState < 3 && playing);
  }

  function bindPlayer(player) {
    var audio = player.querySelector(".luzo-player__audio");
    var btn = player.querySelector(".luzo-player__play");
    var seek = player.querySelector(".luzo-player__seek");
    var src = player.getAttribute("data-src");
    var title = player.getAttribute("data-title") || "LUZO";

    if (!audio || !src || !btn) return;

    audio.setAttribute("playsinline", "");
    audio.setAttribute("webkit-playsinline", "");
    if (!audio.getAttribute("src")) audio.src = src;

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

    seek.addEventListener("input", function () {
      if (!audio.duration) return;
      var pct = parseFloat(seek.value, 10) / 100;
      audio.currentTime = pct * audio.duration;
      updateUI(player, audio);
    });

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
    });
  }

  function initBackgroundPlayback() {
    if (backgroundReady) return;
    backgroundReady = true;

    document.addEventListener("visibilitychange", function () {
      var a = active.audio;
      if (!a) return;

      if (document.hidden) {
        if (!a.paused) active.wantedPlay = true;
        /* Android: a veces pausa al bloquear; reintento suave */
        window.setTimeout(function () {
          if (document.hidden && active.audio === a && active.wantedPlay && a.paused) {
            a.play().catch(function () {});
          }
        }, 400);
      } else if (active.wantedPlay && a.paused) {
        a.play().catch(function () {});
      }
    });

    /* iOS: mantener sesión de audio viva mientras suena en segundo plano */
    document.addEventListener(
      "pagehide",
      function () {
        if (active.audio && active.wantedPlay && !active.audio.paused) {
          active.audio.play().catch(function () {});
        }
      },
      { capture: true }
    );
  }

  function init(root) {
    var scope = root || document;
    scope.querySelectorAll(".luzo-player:not([data-bound])").forEach(function (player) {
      player.setAttribute("data-bound", "1");
      bindPlayer(player);
    });
    setupMediaSessionActions();
    initBackgroundPlayback();
  }

  global.LuzoPlayer = {
    build: buildPlayerMarkup,
    init: init,
  };
})(window);
