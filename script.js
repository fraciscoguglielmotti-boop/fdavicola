(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = $(".nav-toggle");
  const menu = $("#nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
      }
    });

    document.addEventListener("click", (e) => {
      if (!menu.classList.contains("is-open")) return;
      if (!e.target.closest(".nav")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        toggle.focus();
      }
    });
  }

  // Coverage map (Leaflet)
  const mapEl = $("#coverage-map");
  if (mapEl && window.L) {
    const L = window.L;

    const map = L.map(mapEl, {
      center: [-34.510, -58.530],
      zoom: 11,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // GBA Norte: reparto programado, sin mínimo
    const gbaNorte = [
      [-34.395, -58.640], // Tigre / Don Torcuato
      [-34.410, -58.580], // Tigre costero
      [-34.443, -58.535], // San Fernando costa
      [-34.470, -58.500], // San Isidro costa
      [-34.515, -58.475], // Vicente López costa
      [-34.555, -58.460], // Núñez/CABA borde
      [-34.580, -58.515], // San Martín borde sur
      [-34.580, -58.580], // Tres de Febrero borde
      [-34.555, -58.620], // Hurlingham/Pilar borde
      [-34.500, -58.645], // San Miguel borde
      [-34.450, -58.680], // Pilar/Tigre interior
    ];

    const polyPrimary = L.polygon(gbaNorte, {
      color: "#0a4a39",
      weight: 2,
      fillColor: "#138562",
      fillOpacity: 0.40,
    }).addTo(map);

    polyPrimary.bindPopup(
      "<strong>GBA Norte</strong>" +
      "Reparto programado · <b>sin compra mínima</b>.<br/>" +
      "Vicente López · San Isidro · San Fernando · Tigre · San Martín."
    );

    // CABA + GBA aproximado: entrega a demanda con mínimo
    const cabaYResto = [
      [-34.530, -58.520], // CABA NW
      [-34.530, -58.350], // CABA NE (costa)
      [-34.705, -58.350], // CABA SE (Riachuelo)
      [-34.770, -58.430], // Quilmes / Avellaneda
      [-34.770, -58.620], // GBA Sur / Lanús / La Matanza
      [-34.700, -58.720], // La Matanza Oeste
      [-34.620, -58.730], // GBA Oeste
      [-34.580, -58.620], // borde con GBA Norte (limita con polígono superior)
      [-34.555, -58.620], // ~
      [-34.580, -58.580], // ~
      [-34.580, -58.515], // ~
      [-34.555, -58.460], // borde Núñez
      [-34.530, -58.520], // cierre
    ];

    const polySecondary = L.polygon(cabaYResto, {
      color: "#d99815",
      weight: 1.5,
      fillColor: "#f0b429",
      fillOpacity: 0.18,
      dashArray: "4,4",
    }).addTo(map);

    polySecondary.bindPopup(
      "<strong>CABA y resto del GBA</strong>" +
      "Entrega a demanda · <b>mínimo 200 cajones de pollo</b>.<br/>" +
      "Coordinamos día y horario por WhatsApp."
    );

    // Activate scroll wheel zoom on click (better UX on long pages)
    map.on("click focus", () => map.scrollWheelZoom.enable());
    map.on("mouseout", () => map.scrollWheelZoom.disable());

    // Fit both polygons in view
    const group = L.featureGroup([polyPrimary, polySecondary]);
    map.fitBounds(group.getBounds().pad(0.05));
  }

  // Scroll spy: highlight active nav link
  const navLinks = $$(".nav-menu a[href^='#']");
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const setActive = (id) => {
      navLinks.forEach((a) => {
        const isActive = a.getAttribute("href") === `#${id}`;
        a.classList.toggle("is-active", isActive);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
  }
})();
