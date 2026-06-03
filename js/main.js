(function () {
  "use strict";

  var win = typeof window !== "undefined" ? window : {};
  var config = win.LUZO_CONFIG || {};

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

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
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

  /* ── Biblioteca completa (audio local) ── */
  var libraryList = document.getElementById("libraryList");
  var libraryFilters = document.getElementById("libraryFilters");
  var libraryActive = "TODOS";

  function renderLibraryFilters(items) {
    if (!libraryFilters) return;
    var types = ["TODOS", "set", "mezcla"];
    libraryFilters.innerHTML = "";
    types.forEach(function (type) {
      var label =
        type === "TODOS" ? "Todos" : type === "set" ? "Sets completos" : "Mezclas";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mix-filter" + (libraryActive === type ? " is-active" : "");
      btn.textContent = label;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", libraryActive === type ? "true" : "false");
      btn.setAttribute("aria-controls", "libraryList");
      btn.addEventListener("click", function () {
        libraryActive = type;
        renderLibraryFilters(items);
        renderLibrary(items);
      });
      libraryFilters.appendChild(btn);
    });
  }

  function renderLibrary(items) {
    if (!libraryList) return;
    libraryList.innerHTML = "";

    items.forEach(function (item) {
      if (libraryActive !== "TODOS" && item.type !== libraryActive) return;

      var typeLabel = item.type === "set" ? "Set completo" : "Mezcla";
      var genreLabel = item.genre || typeLabel;
      var card = document.createElement("article");
      card.className = "library-card glass reveal";
      card.setAttribute("data-type", item.type);

      card.innerHTML =
        '<div class="library-card__meta">' +
        '<span class="library-card__badge">' + escapeHtml(genreLabel) + "</span>" +
        '<span class="library-card__type">' + typeLabel + "</span>" +
        '<span class="library-card__size">' + item.sizeMB + " MB</span>" +
        "</div>" +
        "<h4 class=\"library-card__title\">" + escapeHtml(item.title) + "</h4>" +
        (item.subtitle
          ? '<p class="library-card__subtitle">' + escapeHtml(item.subtitle) + "</p>"
          : "") +
        (win.LuzoPlayer
          ? win.LuzoPlayer.build(escapeAttr(item.file), escapeAttr(item.title))
          : '<audio controls preload="metadata" playsinline src="' +
            escapeHtml(item.file) +
            '"></audio>') +
        '<div class="library-card__actions">' +
        '<a class="btn btn--download" href="' +
        escapeHtml(item.file) +
        '" download="' +
        escapeAttr("LUZO - " + (item.original || item.file.split("/").pop())) +
        '" aria-label="Descargar ' +
        escapeAttr(item.title) +
        '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="18" height="18" aria-hidden="true">' +
        '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>' +
        "</svg>" +
        "<span>Descargar</span>" +
        "</a>" +
        "</div>";

      libraryList.appendChild(card);
    });

    observeReveal(libraryList.querySelectorAll(".reveal"));

    if (win.LuzoPlayer) {
      win.LuzoPlayer.init(libraryList);
    }
  }

  var archivePanel = document.getElementById("boveda");
  var catalogLoaded = false;
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function loadCatalog() {
    if (!libraryList || catalogLoaded) return;
    catalogLoaded = true;

    fetch("audio/catalog.json?v=7")
      .then(function (r) {
        if (!r.ok) throw new Error("catalog");
        return r.json();
      })
      .then(function (items) {
        var statsEl = document.getElementById("vaultStats");
        if (statsEl) {
          statsEl.removeAttribute("aria-hidden");
          var sets = items.filter(function (i) {
            return i.type === "set";
          }).length;
          var mezclas = items.length - sets;
          statsEl.innerHTML =
            '<span class="vault-stat">' +
            items.length +
            " sesiones</span>" +
            '<span class="vault-stat">' +
            sets +
            " sets</span>" +
            '<span class="vault-stat">' +
            mezclas +
            " mezclas</span>";
        }
        renderLibraryFilters(items);
        try {
          renderLibrary(items);
        } catch (err) {
          console.error("LUZO biblioteca:", err);
          libraryList.innerHTML =
            '<p class="library__empty">No se pudo mostrar la biblioteca. Recarga la página.</p>';
        }
      })
      .catch(function (err) {
        console.error("LUZO catalog:", err);
        libraryList.innerHTML =
          '<p class="library__empty">Biblioteca en actualización. Vuelve pronto.</p>';
      });
  }

  function closeMobileNav() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("nav__menu--open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function showArchiveReveals() {
    if (!archivePanel) return;
    archivePanel.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  function openArchivePanel(scrollTo) {
    if (!archivePanel) return;

    archivePanel.classList.add("is-open");
    archivePanel.removeAttribute("hidden");
    archivePanel.setAttribute("aria-hidden", "false");
    loadCatalog();
    showArchiveReveals();

    if (scrollTo) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          archivePanel.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    if (typeof observeReveal === "function") {
      observeReveal(archivePanel.querySelectorAll(".reveal:not(.visible)"));
    }
  }

  function isArchiveTrigger(el) {
    if (!el || !el.closest) return null;
    return el.closest("[data-open-archive], a[href='#boveda'], a[href$='#boveda']");
  }

  function handleArchiveLinkClick(e) {
    var trigger = isArchiveTrigger(e.target);
    if (!trigger) return;

    e.preventDefault();
    closeMobileNav();
    openArchivePanel(true);

    if (history.replaceState) {
      history.replaceState(null, "", "#boveda");
    } else {
      location.hash = "boveda";
    }
  }

  document.addEventListener("click", handleArchiveLinkClick, true);

  function checkArchiveHash() {
    if (location.hash === "#boveda") {
      openArchivePanel(true);
    }
  }

  checkArchiveHash();
  window.addEventListener("hashchange", checkArchiveHash);

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
