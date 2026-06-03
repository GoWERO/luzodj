/**
 * LUZO — ES / EN
 */
(function (win) {
  "use strict";

  var STORAGE_KEY = "luzo-lang";
  var DEFAULT_LANG = "es";

  var STRINGS = {
    es: {
      "meta.title": "LUZO — DJ & Selector de Atmósferas | House, Deep House & Organic House",
      "meta.description":
        "LUZO es DJ y selector de atmósferas sonoras en México. House, deep house, organic house y curaduría musical para rooftops, bares, restaurantes y venues con identidad.",
      "skip": "Saltar al contenido",
      "lang.label": "Idioma del sitio",
      "nav.about": "Sobre mí",
      "nav.philosophy": "Filosofía",
      "nav.soundcloud": "SoundCloud",
      "nav.archive": "Mis mezclas (descargar)",
      "nav.archiveTitle": "Sets y mezclas para escuchar y descargar",
      "nav.audience": "Ideal para",
      "nav.services": "Servicios",
      "nav.process": "Proceso",
      "nav.experience": "Experiencia",
      "nav.contact": "Contacto",
      "nav.openMenu": "Abrir menú",
      "hero.eyebrow": "DJ · Selector · Curador",
      "hero.tagline": "DJ & selector de atmósferas sonoras",
      "hero.statement":
        "House, deep house, organic house y sonidos electrónicos para espacios con identidad.",
      "hero.pitch":
        "Transformo espacios a través del sonido, creando atmósferas que conectan personas, conversaciones y experiencias.",
      "hero.archive": "Mis mezclas (para descargarlas)",
      "hero.cta": "Hablemos de tu espacio",
      "hero.imgAlt": "LUZO — DJ y selector de atmósferas sonoras en sesión",
      "about.label": "Sobre mí",
      "about.title": "Música con intención",
      "about.lead":
        "Nací en León, Guanajuato, y desde muy joven desarrollé una fascinación profunda por la música y el poder que tiene para transformar la manera en que vivimos un espacio.",
      "about.p1":
        "Con el tiempo descubrí que detrás de cada gran sesión existe mucho más que una selección de canciones. Existe una <em>intención</em>. Una <em>narrativa</em>. Una energía capaz de conectar personas que nunca se habían visto y convertir una noche cualquiera en una experiencia memorable.",
      "about.p2":
        "A los 19 años tuve mi primer acercamiento al arte de mezclar música de la mano de un DJ colombiano que me mostró una nueva forma de entender el sonido. Desde entonces he dedicado incontables horas a explorar géneros, descubrir artistas y desarrollar un criterio musical propio.",
      "about.p3":
        "Hoy entiendo el DJing como una forma de curaduría. Mi interés no está únicamente en hacer bailar a la gente, sino en construir atmósferas que generen conexión, identidad y presencia.",
      "about.p4":
        "Creo que la música tiene la capacidad de crear comunidad. De acompañar conversaciones, encuentros y momentos que permanecen mucho después de que termina la última canción.",
      "about.closing":
        "Esa es la experiencia que busco crear cada vez que me presento frente a una audiencia.",
      "about.quote":
        "La música tiene la capacidad de crear comunidad, identidad y experiencias que permanecen mucho después de que termina la última canción.",
      "values.label": "Valores",
      "values.1": "Criterio musical",
      "values.2": "Sensibilidad estética",
      "values.3": "Profesionalismo",
      "values.4": "Curaduría",
      "values.5": "Lectura del ambiente",
      "philosophy.label": "Mi filosofía",
      "philosophy.title": "Cada espacio merece su propia banda sonora",
      "philosophy.lead": "No creo en playlists genéricas.",
      "philosophy.p1": "Cada espacio tiene una energía distinta.",
      "philosophy.p2":
        "La música correcta puede transformar una conversación, elevar una experiencia gastronómica o convertir una noche ordinaria en un recuerdo.",
      "philosophy.closing": "Mi trabajo consiste en encontrar esa banda sonora.",
      "soundcloud.label": "SoundCloud",
      "soundcloud.title": "Selecciones destacadas",
      "soundcloud.desc":
        "Muestras y sesiones en SoundCloud. Explora por categoría y conoce la dirección sonora de LUZO.",
      "soundcloud.filtersAria": "Filtrar selecciones SoundCloud",
      "soundcloud.gridAria": "Selecciones SoundCloud",
      "soundcloud.profile": "Perfil completo en SoundCloud →",
      "archive.label": "Mis mezclas (para descargarlas)",
      "archive.title": "Escucha o descarga cada sesión",
      "archive.desc":
        "Sets y mezclas en alta fidelidad. Reproduce en el navegador o descarga cada sesión.",
      "archive.filtersAria": "Filtrar mis mezclas para descargar",
      "archive.listAria": "Mis mezclas para descargar, LUZO",
      "audience.label": "Para quién es mi propuesta",
      "audience.title": "Ideal para",
      "audience.1.title": "Rooftops",
      "audience.1.desc": "Atardeceres, vistas y transiciones sonoras que acompañan el horizonte.",
      "audience.2.title": "Cocktail Bars",
      "audience.2.desc": "Elegancia, conversación y presencia sin invadir la experiencia.",
      "audience.3.title": "Restaurantes",
      "audience.3.desc": "Curaduría que eleva la experiencia gastronómica con sensibilidad.",
      "audience.4.title": "Eventos privados",
      "audience.4.desc": "Ambientes íntimos con identidad musical personalizada.",
      "audience.5.title": "Aperturas / Warm-Ups",
      "audience.5.desc": "Apertura gradual que prepara la noche con criterio y flow.",
      "audience.6.title": "Espacios con identidad artística",
      "audience.6.desc": "Locales que buscan diferenciarse a través del sonido.",
      "services.label": "Servicios",
      "services.title": "Qué puedo ofrecer",
      "services.1.title": "Warm up sets",
      "services.1.desc": "Apertura gradual que prepara el ambiente sin forzar la energía.",
      "services.2.title": "Música para bares y restaurantes",
      "services.2.desc": "Selección que acompaña la experiencia social sin invadir la conversación.",
      "services.3.title": "Curaduría sonora",
      "services.3.desc": "Identidad musical, mood boards y dirección artística del sonido.",
      "services.4.title": "Sesiones sunset",
      "services.4.desc": "Atmósferas cálidas para rooftops y la transición del día a la noche.",
      "services.5.title": "Noches house / deep house",
      "services.5.desc": "Grooves profundos para noches con presencia y carácter.",
      "services.6.title": "Ambientes experimentales",
      "services.6.desc": "Sonidos alternativos para venues que buscan sorprender.",
      "process.label": "Metodología",
      "process.title": "Cómo trabajo",
      "process.1.title": "Conozco tu espacio",
      "process.1.desc": "Entiendo la esencia, el público y la personalidad de tu venue o evento.",
      "process.2.title": "Entiendo la atmósfera que buscas",
      "process.2.desc": "Íntima, expansiva, relajada, sofisticada o con energía progresiva.",
      "process.3.title": "Diseño una selección musical personalizada",
      "process.3.desc": "Curaduría con intención — no un set genérico, sino una narrativa sonora.",
      "process.4.title": "Creamos una experiencia memorable",
      "process.4.desc": "Una noche que tu público recordará mucho después de la última canción.",
      "experience.label": "Trayectoria",
      "experience.title": "Experiencia",
      "experience.p1":
        "Aunque mi trayectoria continúa construyéndose, he dedicado años a desarrollar criterio musical, explorar nuevos sonidos y perfeccionar la capacidad de leer la energía de un espacio.",
      "experience.p2":
        "Mi enfoque combina curaduría, sensibilidad estética y una búsqueda constante de experiencias memorables a través de la música.",
      "contact.label": "Contacto",
      "contact.title": "¿Listo para crear la atmósfera perfecta?",
      "contact.desc":
        "Cuéntame qué experiencia quieres construir y prepararé una propuesta musical pensada específicamente para tu espacio.",
      "contact.cta": "Hablemos de tu espacio",
      "contact.emailAria": "Enviar correo a hola@luzodj.com",
      "footer.tagline": "DJ · Selector · Curador de atmósferas",
      "footer.copy": "Todos los derechos reservados.",
      "filter.all": "TODAS",
      "filter.allLibrary": "Todos",
      "filter.sets": "Sets completos",
      "filter.mixes": "Mezclas",
      "mix.featured": "Principal",
      "library.set": "Set completo",
      "library.mix": "Mezcla",
      "library.download": "Descargar",
      "library.downloadAria": "Descargar",
      "vault.stats": "{n} sesiones · {sets} sets · {mezclas} mezclas",
      "library.empty": "No se pudo mostrar la biblioteca. Recarga la página.",
      "library.updating": "Biblioteca en actualización. Vuelve pronto.",
      "whatsapp.text":
        "Hola Luzo, escuché tu propuesta musical y me gustaría platicar sobre mi espacio.",
    },
    en: {
      "meta.title": "LUZO — DJ & Sonic Atmosphere Selector | House, Deep House & Organic House",
      "meta.description":
        "LUZO is a DJ and sonic atmosphere selector in Mexico. House, deep house, organic house and musical curation for rooftops, bars, restaurants and venues with character.",
      "skip": "Skip to content",
      "lang.label": "Site language",
      "nav.about": "About",
      "nav.philosophy": "Philosophy",
      "nav.soundcloud": "SoundCloud",
      "nav.archive": "My mixes (download)",
      "nav.archiveTitle": "Sets and mixes to listen and download",
      "nav.audience": "Ideal for",
      "nav.services": "Services",
      "nav.process": "Process",
      "nav.experience": "Experience",
      "nav.contact": "Contact",
      "nav.openMenu": "Open menu",
      "hero.eyebrow": "DJ · Selector · Curator",
      "hero.tagline": "DJ & sonic atmosphere selector",
      "hero.statement":
        "House, deep house, organic house and electronic sounds for spaces with character.",
      "hero.pitch":
        "I transform spaces through sound, creating atmospheres that connect people, conversations and experiences.",
      "hero.archive": "My mixes (download)",
      "hero.cta": "Let's talk about your space",
      "hero.imgAlt": "LUZO — DJ and sonic atmosphere selector performing",
      "about.label": "About me",
      "about.title": "Music with intention",
      "about.lead":
        "I was born in León, Guanajuato, and from a young age developed a deep fascination with music and its power to transform how we experience a space.",
      "about.p1":
        "Over time I discovered that behind every great session there is much more than a selection of tracks. There is <em>intention</em>. A <em>narrative</em>. An energy capable of connecting people who had never met and turning an ordinary night into a memorable experience.",
      "about.p2":
        "At 19 I had my first approach to mixing with a Colombian DJ who showed me a new way to understand sound. Since then I have dedicated countless hours to exploring genres, discovering artists and developing my own musical taste.",
      "about.p3":
        "Today I understand DJing as a form of curation. My focus is not only on making people dance, but on building atmospheres that create connection, identity and presence.",
      "about.p4":
        "I believe music can build community — accompanying conversations, encounters and moments that last long after the last song.",
      "about.closing": "That is the experience I aim to create every time I perform.",
      "about.quote":
        "Music can build community, identity and experiences that last long after the last song ends.",
      "values.label": "Values",
      "values.1": "Musical taste",
      "values.2": "Aesthetic sensitivity",
      "values.3": "Professionalism",
      "values.4": "Curation",
      "values.5": "Reading the room",
      "philosophy.label": "My philosophy",
      "philosophy.title": "Every space deserves its own soundtrack",
      "philosophy.lead": "I don't believe in generic playlists.",
      "philosophy.p1": "Every space has a different energy.",
      "philosophy.p2":
        "The right music can transform a conversation, elevate a dining experience or turn an ordinary night into a memory.",
      "philosophy.closing": "My job is to find that soundtrack.",
      "soundcloud.label": "SoundCloud",
      "soundcloud.title": "Featured selections",
      "soundcloud.desc":
        "Samples and sessions on SoundCloud. Browse by category and discover LUZO's sonic direction.",
      "soundcloud.filtersAria": "Filter SoundCloud selections",
      "soundcloud.gridAria": "SoundCloud selections",
      "soundcloud.profile": "Full profile on SoundCloud →",
      "archive.label": "My mixes (download)",
      "archive.title": "Listen or download each session",
      "archive.desc":
        "High-fidelity sets and mixes. Play in your browser or download each session.",
      "archive.filtersAria": "Filter mixes to download",
      "archive.listAria": "LUZO mixes to download",
      "audience.label": "Who this is for",
      "audience.title": "Ideal for",
      "audience.1.title": "Rooftops",
      "audience.1.desc": "Sunsets, views and sonic transitions that follow the horizon.",
      "audience.2.title": "Cocktail bars",
      "audience.2.desc": "Elegance, conversation and presence without overpowering the experience.",
      "audience.3.title": "Restaurants",
      "audience.3.desc": "Curation that elevates the dining experience with sensitivity.",
      "audience.4.title": "Private events",
      "audience.4.desc": "Intimate settings with a tailored musical identity.",
      "audience.5.title": "Openings / warm-ups",
      "audience.5.desc": "A gradual opening that sets the night with taste and flow.",
      "audience.6.title": "Artistic venues",
      "audience.6.desc": "Spaces that want to stand out through sound.",
      "services.label": "Services",
      "services.title": "What I offer",
      "services.1.title": "Warm-up sets",
      "services.1.desc": "A gradual opening that prepares the room without forcing the energy.",
      "services.2.title": "Music for bars & restaurants",
      "services.2.desc": "Selections that support social moments without overpowering conversation.",
      "services.3.title": "Sonic curation",
      "services.3.desc": "Musical identity, mood boards and artistic direction of sound.",
      "services.4.title": "Sunset sessions",
      "services.4.desc": "Warm atmospheres for rooftops and the day-to-night transition.",
      "services.5.title": "House / deep house nights",
      "services.5.desc": "Deep grooves for nights with presence and character.",
      "services.6.title": "Experimental atmospheres",
      "services.6.desc": "Alternative sounds for venues that want to surprise.",
      "process.label": "Method",
      "process.title": "How I work",
      "process.1.title": "I learn your space",
      "process.1.desc": "I understand the essence, audience and personality of your venue or event.",
      "process.2.title": "I understand the atmosphere you want",
      "process.2.desc": "Intimate, expansive, relaxed, sophisticated or progressively energetic.",
      "process.3.title": "I design a tailored musical selection",
      "process.3.desc": "Curation with intention — not a generic set, but a sonic narrative.",
      "process.4.title": "We create a memorable experience",
      "process.4.desc": "A night your audience will remember long after the last track.",
      "experience.label": "Background",
      "experience.title": "Experience",
      "experience.p1":
        "While my path is still growing, I have spent years developing musical taste, exploring new sounds and refining how I read a room's energy.",
      "experience.p2":
        "My approach combines curation, aesthetic sensitivity and a constant search for memorable experiences through music.",
      "contact.label": "Contact",
      "contact.title": "Ready to create the perfect atmosphere?",
      "contact.desc":
        "Tell me what experience you want to build and I will prepare a musical proposal tailored to your space.",
      "contact.cta": "Let's talk about your space",
      "contact.emailAria": "Send email to hola@luzodj.com",
      "footer.tagline": "DJ · Selector · Atmosphere curator",
      "footer.copy": "All rights reserved.",
      "filter.all": "ALL",
      "filter.allLibrary": "All",
      "filter.sets": "Full sets",
      "filter.mixes": "Mixes",
      "mix.featured": "Featured",
      "library.set": "Full set",
      "library.mix": "Mix",
      "library.download": "Download",
      "library.downloadAria": "Download",
      "vault.stats": "{n} sessions · {sets} sets · {mezclas} mixes",
      "library.empty": "Could not load the library. Please reload the page.",
      "library.updating": "Library updating. Check back soon.",
      "whatsapp.text":
        "Hi Luzo, I heard your musical proposal and would like to talk about my venue.",
    },
  };

  var MIX_DESC = {
    es: [
      "Selección principal — grooves house con presencia y dirección para noches con identidad.",
      "Fusión sensual entre ritmo, textura electrónica y atmósferas envolventes.",
      "Groove nocturno con líneas de bajo profundas y tensión progresiva.",
      "Percusión orgánica y ritmos afro con sensibilidad experimental.",
      "Grooves espaciales, vocales y ritmo constante para mantener el flow.",
      "Set cálido y emocional — ideal para transiciones al atardecer.",
      "Selección rotativa de house con carácter y consistencia groove.",
    ],
    en: [
      "Main selection — house grooves with presence and direction for nights with character.",
      "Sensual blend of rhythm, electronic texture and enveloping atmospheres.",
      "Night groove with deep basslines and progressive tension.",
      "Organic percussion and afro rhythms with an experimental touch.",
      "Spacious grooves, vocals and steady rhythm to keep the flow.",
      "Warm, emotional set — ideal for sunset transitions.",
      "Rotating house selection with groove, character and consistency.",
    ],
  };

  var currentLang = DEFAULT_LANG;

  function getStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      return stored === "en" || stored === "es" ? stored : DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function t(key, vars) {
    var bag = STRINGS[currentLang] || STRINGS.es;
    var str = bag[key] != null ? bag[key] : STRINGS.es[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace("{" + k + "}", String(vars[k]));
      });
    }
    return str;
  }

  function mixDescription(index) {
    var bag = MIX_DESC[currentLang] || MIX_DESC.es;
    return bag[index] != null ? bag[index] : MIX_DESC.es[index] || "";
  }

  function whatsappUrl() {
    var text = encodeURIComponent(t("whatsapp.text"));
    return "https://wa.me/5214771595715?text=" + text;
  }

  function applyTextNodes() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (!key) return;
      el.innerHTML = t(key);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (!key) return;
      el.setAttribute("aria-label", t(key));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (!key) return;
      el.setAttribute("alt", t(key));
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (!key) return;
      el.setAttribute("title", t(key));
    });
  }

  function updateMeta() {
    document.title = t("meta.title");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));
    document.documentElement.lang = currentLang === "en" ? "en" : "es-MX";
  }

  function updateWhatsAppLinks() {
    var url = whatsappUrl();
    ["heroCta", "linkWhatsapp"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.href = url;
    });
    if (win.LUZO_CONFIG) win.LUZO_CONFIG.whatsapp = url;
  }

  function updateLangSwitch() {
    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      var lang = btn.getAttribute("data-lang-set");
      var active = lang === currentLang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setLang(lang) {
    if (lang !== "es" && lang !== "en") return;
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore */
    }
    applyTextNodes();
    updateMeta();
    updateWhatsAppLinks();
    updateLangSwitch();
    win.dispatchEvent(
      new CustomEvent("luzo:langchange", { detail: { lang: currentLang } })
    );
  }

  function initSwitch() {
    var group = document.getElementById("langSwitch");
    if (!group) return;
    group.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang-set"));
      });
    });
  }

  function init() {
    currentLang = getStoredLang();
    applyTextNodes();
    updateMeta();
    updateWhatsAppLinks();
    updateLangSwitch();
    initSwitch();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  win.LuzoI18n = {
    t: t,
    getLang: function () {
      return currentLang;
    },
    setLang: setLang,
    mixDescription: mixDescription,
    whatsappUrl: whatsappUrl,
  };
})(window);
