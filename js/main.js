/**
 * main.js — Lógica de renderizado con i18n.
 */

(function () {
  var d = PORTFOLIO_DATA;
  var lang = "es";
  var firstRender = true;

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); };

  var UI = {
    es: {
      greeting: "Hola, soy ",
      viewProjects: "Ver proyectos",
      contact: "Contáctame",
      downloadCV: "↓ CV",
      badgeAvailable: "Disponible para prácticas / empleo",
      badgeExploring: "Explorando nuevas oportunidades",
      eyebrowProjects: "proyectos",
      titleProjects: "Cosas que he construido",
      eyebrowAbout: "sobre-mi",
      titleAbout: "Quién está detrás del código",
      cmdWho: "quien-soy",
      cmdWork: "como-trabajo",
      connect: "Conéctate",
      madeWith: "Hecho con HTML, CSS y JS.",
      code: "Código",
      demo: "Demo",
      preview: "Vista previa de",
      termComment: "# escríbeme si quieres conversar sobre alguno",
      skillLenguajes: "Lenguajes",
      skillFrameworks: "Frameworks",
      skillBD: "Bases de datos",
      skillHerramientas: "Herramientas",
      skillGestion: "Gestión",
      compBlandas: "Habilidades blandas",
      compGenerales: "Herramientas generales",
      compIdiomas: "Idiomas",
      showMore: "Ver más proyectos",
      showLess: "Ver menos",
      navFooter: "Navegación",
      navHome: "Inicio",
      navProjects: "Proyectos",
      navAbout: "Sobre mí"
    },
    en: {
      greeting: "Hi, I'm ",
      viewProjects: "View projects",
      contact: "Contact me",
      downloadCV: "↓ Resume",
      badgeAvailable: "Available for internships / jobs",
      badgeExploring: "Exploring new opportunities",
      eyebrowProjects: "projects",
      titleProjects: "Things I've built",
      eyebrowAbout: "about-me",
      titleAbout: "Who's behind the code",
      cmdWho: "about-me",
      cmdWork: "how-i-work",
      connect: "Connect",
      madeWith: "Made with HTML, CSS & JS.",
      code: "Code",
      demo: "Demo",
      preview: "Preview of",
      termComment: "# reach out if you want to chat about any of these",
      skillLenguajes: "Languages",
      skillFrameworks: "Frameworks",
      skillBD: "Databases",
      skillHerramientas: "Tools",
      skillGestion: "Management",
      compBlandas: "Soft skills",
      compGenerales: "General tools",
      compIdiomas: "Languages",
      showMore: "Show more projects",
      showLess: "Show less",
      navFooter: "Navigation",
      navHome: "Home",
      navProjects: "Projects",
      navAbout: "About me"
    }
  };

  function t(key) { return UI[lang][key] || UI.es[key]; }

  function loc(section, key) {
    if (lang === "en" && d.en && d.en[section] && d.en[section][key]) return d.en[section][key];
    return d[section] ? d[section][key] : undefined;
  }

  function updateDataT() {
    $$("[data-t]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-t"));
    });
  }

  function iniciales(nombre) {
    return nombre.split(" ").filter(Boolean).slice(0, 2).map(function (p) { return p[0].toUpperCase(); }).join("");
  }

  function chipHTML(name) {
    var slug = name.toLowerCase().replace(/[\s.]+/g, "-").replace(/-+/g, "-").replace(/-$/, "");
    return '<span class="chip"><img src="assets/icons/' + slug + '.svg" alt="" width="14" height="14" onerror="this.remove()">' + name + "</span>";
  }

  function renderBrand() {
    $$(".brand-nick").forEach(function (el) { el.textContent = d.perfil.nick || "portafolio"; });
    document.title = (lang === "en" ? "Portfolio" : "Portafolio") + " — " + (d.perfil.nick || d.perfil.nombre);
  }

  function renderHero() {
    $("#hero-badge-text").textContent = d.perfil.disponible ? t("badgeAvailable") : t("badgeExploring");
    $("#hero-badge").style.display = "inline-flex";
    $("#hero-nombre").textContent = d.perfil.nombre;

    var desc = $("#hero-desc");
    desc.innerHTML = "";
    var rolText = loc("perfil", "rolDestacado");
    var descText = loc("perfil", "descripcion");
    var partes = descText.split(rolText);
    desc.append(document.createTextNode(partes[0] || ""));
    if (partes.length > 1) {
      var span = document.createElement("span");
      span.className = "highlight";
      span.textContent = rolText;
      desc.append(span);
      desc.append(document.createTextNode(partes.slice(1).join(rolText)));
    }

    $("#hero-email").href = "mailto:" + d.perfil.email;
    $("#hero-linkedin").href = d.perfil.linkedin;
    $("#hero-linkedin").style.display = d.perfil.linkedin ? "inline-flex" : "none";

    if (d.perfil.github) {
      $("#hero-github").href = d.perfil.github;
      $("#hero-github").style.display = "inline-flex";
    }
    if (d.perfil.whatsapp) {
      $("#hero-whatsapp").href = d.perfil.whatsapp;
      $("#hero-whatsapp").style.display = "inline-flex";
    }
    if (d.perfil.cv) {
      $("#hero-cv").href = d.perfil.cv;
      $("#hero-cv").style.display = "inline-flex";
    }

    var avatarWrap = $("#hero-avatar");
    if (firstRender) {
      if (d.perfil.avatar) {
        var img = new Image();
        img.onload = function () { avatarWrap.innerHTML = ""; avatarWrap.appendChild(img); };
        img.onerror = function () { avatarWrap.textContent = iniciales(d.perfil.nombre); };
        img.src = d.perfil.avatar;
        img.alt = d.perfil.nombre;
      } else {
        avatarWrap.textContent = iniciales(d.perfil.nombre);
      }
    }
  }

  function renderTerminal() {
    var body = $("#terminal-body");
    var lines = [
      { prompt: "$", cmd: "whoami" },
      { out: d.perfil.nombre },
      { prompt: "$", cmd: "cat rol.txt" },
      { out: loc("perfil", "rolDestacado") + " · " + d.perfil.ubicacion },
      { prompt: "$", cmd: "ls proyectos/" },
      { out: d.proyectos.map(function (p) { return p.nombre; }).join("  ") },
      { comment: t("termComment") }
    ];

    body.innerHTML = "";

    if (firstRender) {
      var i = 0;
      function nextLine() {
        if (i >= lines.length) return;
        var l = lines[i];
        var div = document.createElement("div");
        div.className = "line";
        if (l.prompt) {
          div.innerHTML = '<span class="prompt">' + l.prompt + '</span><span class="cmd"></span>';
          body.appendChild(div);
          typeText(div.querySelector(".cmd"), l.cmd, function () { i++; setTimeout(nextLine, 220); });
        } else if (l.comment) {
          div.classList.add("comment");
          div.textContent = l.comment;
          body.appendChild(div);
          i++;
          setTimeout(nextLine, 220);
        } else {
          div.classList.add("out");
          div.textContent = l.out;
          body.appendChild(div);
          i++;
          setTimeout(nextLine, 260);
        }
      }

      function typeText(el, text, done) {
        var idx = 0;
        (function step() {
          if (idx <= text.length) { el.textContent = text.slice(0, idx); idx++; setTimeout(step, 28); }
          else { done(); }
        })();
      }

      nextLine();
    } else {
      lines.forEach(function (l) {
        var div = document.createElement("div");
        div.className = "line";
        if (l.prompt) {
          div.innerHTML = '<span class="prompt">' + l.prompt + '</span><span class="cmd">' + l.cmd + '</span>';
        } else if (l.comment) {
          div.classList.add("comment");
          div.textContent = l.comment;
        } else {
          div.classList.add("out");
          div.textContent = l.out;
        }
        body.appendChild(div);
      });
    }
  }

  var PROJECTS_VISIBLE = 3;
  var showAllProjects = false;

  function renderProyectos() {
    var grid = $("#projects-grid");
    var btn = $("#btn-show-more");
    grid.innerHTML = "";

    var total = d.proyectos.length;
    var limit = showAllProjects ? total : PROJECTS_VISIBLE;

    d.proyectos.slice(0, limit).forEach(function (p) {
      var card = document.createElement("article");
      card.className = "project-card";
      var chips = p.stack.map(chipHTML).join("");
      var demoLink = p.demo ? '<a href="' + p.demo + '" target="_blank" rel="noopener">↗ ' + t("demo") + '</a>' : "";
      var githubLink = p.github ? '<a href="' + p.github + '" target="_blank" rel="noopener">↗ ' + t("code") + '</a>' : "";

      card.innerHTML =
        '<div class="project-thumb"><img src="' + p.imagen + '" alt="' + t("preview") + ' ' + p.nombre + '" loading="lazy" onerror="this.style.display=\'none\'"></div>' +
        '<div class="project-body"><h3>' + p.nombre + '</h3><p>' + p.descripcion + '</p>' +
        '<div class="chip-row">' + chips + '</div>' +
        '<div class="project-links">' + githubLink + demoLink + '</div></div>';
      grid.appendChild(card);
    });

    if (total > PROJECTS_VISIBLE) {
      btn.style.display = "";
      btn.textContent = showAllProjects ? t("showLess") : t("showMore");
    } else {
      btn.style.display = "none";
    }
  }

  function setupShowMore() {
    $("#btn-show-more").addEventListener("click", function () {
      showAllProjects = !showAllProjects;
      renderProyectos();
      if (!showAllProjects) document.getElementById("proyectos").scrollIntoView({ behavior: "smooth" });
    });
  }

  function renderSobreMi() {
    $("#about-quien-soy").textContent = loc("sobreMi", "quienSoy");
    $("#about-como-trabajo").textContent = loc("sobreMi", "comoTrabajo");

    var skillGroups = [
      { label: t("skillLenguajes"), items: d.skills.lenguajes },
      { label: t("skillFrameworks"), items: d.skills.frameworks },
      { label: t("skillBD"), items: d.skills.basesDeDatos },
      { label: t("skillHerramientas"), items: d.skills.herramientas },
      { label: t("skillGestion"), items: d.skills.gestion }
    ];

    var panel = $("#skills-panel");
    panel.innerHTML = "";
    skillGroups.forEach(function (g) {
      if (!g.items || !g.items.length) return;
      var group = document.createElement("div");
      group.className = "skill-group";
      group.innerHTML = '<div class="label">' + g.label + '</div><div class="skill-tags">' + g.items.map(chipHTML).join("") + '</div>';
      panel.appendChild(group);
    });
  }

  function renderCompetencias() {
    var grid = $("#competencias-grid");
    var cats = [
      { title: t("compBlandas"), items: d.competencias.blandas },
      { title: t("compGenerales"), items: d.competencias.generales },
      { title: t("compIdiomas"), items: d.competencias.idiomas }
    ];
    grid.innerHTML = cats.map(function (c) {
      return '<div class="competencia-card"><h5>' + c.title + '</h5><div class="skill-tags">' +
        c.items.map(function (i) { return '<span class="chip">' + i + '</span>'; }).join("") +
        '</div></div>';
    }).join("");
  }

  function renderFooter() {
    $("#footer-tagline").textContent = lang === "en" && d.en && d.en.footer ? d.en.footer.tagline : d.footer.tagline;
    $("#footer-year").textContent = d.footer.anio;
    $("#footer-github").href = d.perfil.github;
    $("#footer-linkedin").href = d.perfil.linkedin;
    $("#footer-whatsapp").href = d.perfil.whatsapp || "#";
    $("#footer-whatsapp").parentElement.style.display = d.perfil.whatsapp ? "" : "none";
    $("#footer-email").href = "mailto:" + d.perfil.email;
  }

  function renderAll() {
    renderBrand();
    renderHero();
    renderTerminal();
    renderProyectos();
    renderSobreMi();
    renderCompetencias();
    renderFooter();
    updateDataT();
    firstRender = false;
  }

  function setupNav() {
    var toggle = $("#nav-toggle");
    var links = $("#nav-links");
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    $$("#nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });

    var sections = $$("main section[id]");
    var navAnchors = $$("#nav-links a");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) { a.classList.remove("active"); });
          var match = navAnchors.find(function (a) { return a.getAttribute("href") === "#" + entry.target.id; });
          if (match) match.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });

    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); reveal.unobserve(e.target); } });
    }, { threshold: 0.1 });
    $$(".section").forEach(function (s) { reveal.observe(s); });
  }

  function setupTheme() {
    var btn = $("#theme-toggle");
    function apply(light) {
      document.body.classList.toggle("light", light);
      btn.textContent = light ? "☾" : "☀︎";
      btn.setAttribute("aria-label", light ? "Dark mode" : "Light mode");
      localStorage.setItem("theme", light ? "light" : "dark");
    }
    var saved = localStorage.getItem("theme");
    apply(saved ? saved === "light" : matchMedia("(prefers-color-scheme:light)").matches);
    btn.addEventListener("click", function () {
      apply(!document.body.classList.contains("light"));
    });
  }

  function setupLang() {
    var btn = $("#lang-toggle");
    var saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "es") lang = saved;

    function apply() {
      btn.textContent = lang === "es" ? "EN" : "ES";
      btn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a Español");
      document.documentElement.lang = lang;
      localStorage.setItem("lang", lang);
      renderAll();
    }

    apply();

    btn.addEventListener("click", function () {
      lang = lang === "es" ? "en" : "es";
      apply();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupNav();
    setupTheme();
    setupShowMore();
    setupLang();
  });
})();
