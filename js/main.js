(function () {
  "use strict";

  var config = window.LUZO_CONFIG || {};

  function soundcloudEmbed(trackUrl) {
    return (
      "https://w.soundcloud.com/player/?url=" +
      encodeURIComponent(trackUrl) +
      "&color=%23e4a853&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
    );
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ── Links ── */
  function setHref(id, url) {
    var el = document.getElementById(id);
    if (el && url) el.href = url;
  }

  setHref("linkInstagram", config.instagram);
  setHref("linkWhatsapp", config.whatsapp);
  setHref("linkEmail", config.email);
  setHref("linkSoundcloud", config.soundcloud);
  setHref("heroCta", config.whatsapp);

  /* ── Mixes grid + filters ── */
  var mixes = config.mixes || [];
  var mixGrid = document.getElementById("mixGrid");
  var mixFilters = document.getElementById("mixFilters");

  var categories = ["TODAS"];
  mixes.forEach(function (m) {
    if (m.category && categories.indexOf(m.category) === -1) {
      categories.push(m.category);
    }
  });

  var activeFilter = "TODAS";

  function renderFilters() {
    if (!mixFilters) return;
    mixFilters.innerHTML = "";

    categories.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mix-filter" + (cat === activeFilter ? " is-active" : "");
      btn.textContent = cat;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", cat === activeFilter ? "true" : "false");
      btn.setAttribute("aria-controls", "mixGrid");
      btn.addEventListener("click", function () {
        activeFilter = cat;
        renderFilters();
        filterMixes();
      });
      mixFilters.appendChild(btn);
    });
  }

  function filterMixes() {
    if (!mixGrid) return;
    var tiles = mixGrid.querySelectorAll(".mix-tile");
    tiles.forEach(function (tile) {
      var cat = tile.getAttribute("data-category");
      var show = activeFilter === "TODAS" || cat === activeFilter;
      tile.classList.toggle("is-hidden", !show);
    });
  }

  function renderMixes() {
    if (!mixGrid) return;
    mixGrid.innerHTML = "";

    mixes.forEach(function (mix) {
      var embed = soundcloudEmbed(mix.url);
      var featured = mix.featured ? " mix-tile--featured" : "";
      var badgeClass = mix.featured ? " mix-tile__badge--featured" : "";
      var badgeLabel = mix.featured ? "Principal · " + mix.category : mix.category;

      var article = document.createElement("article");
      article.className = "mix-tile glass reveal" + featured;
      article.setAttribute("data-category", mix.category);

      article.innerHTML =
        '<div class="mix-tile__head">' +
        '<span class="mix-tile__badge' + badgeClass + '">' + escapeHtml(badgeLabel) + "</span>" +
        "<h3 class=\"mix-tile__title\">" + escapeHtml(mix.title) + "</h3>" +
        '<p class="mix-tile__desc">' + escapeHtml(mix.description) + "</p>" +
        "</div>" +
        '<div class="mix-tile__player">' +
        '<iframe loading="lazy" title="' + escapeHtml(mix.title) + '" allow="autoplay" src="' + embed + '"></iframe>' +
        "</div>";

      mixGrid.appendChild(article);
    });

    observeReveal(mixGrid.querySelectorAll(".reveal"));
  }

  renderFilters();
  renderMixes();

  /* ── Footer year ── */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ── Header scroll ── */
  var header = document.getElementById("header");

  function onScroll() {
    if (header) header.classList.toggle("header--scrolled", window.scrollY > 32);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile nav ── */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("nav__menu--open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navMenu.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("nav__menu--open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── Scroll reveal ── */
  function observeReveal(nodes) {
    var els = nodes || document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  observeReveal();
})();
