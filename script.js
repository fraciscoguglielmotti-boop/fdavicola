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

  // Scroll reveal
  const revealEls = $$('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const ro = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); ro.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => ro.observe(el));
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

  // ─── Catálogo dinámico desde Supabase ───────────────────────────────────
  // Source of truth: tabla mn_productos en Supabase. Cuando cambian los
  // precios, cambian en un solo lugar y se reflejan acá, en el bot WhatsApp
  // y en AviGest. Si el fetch falla, mantenemos los precios del precios.json
  // estático como fallback.
  const SUPABASE_URL = "https://rcblopybnaljvoikjwqu.supabase.co";
  const SUPABASE_ANON = "sb_publishable_JenUKCfId4lGMkT_sUkerw_Y7rgpXl4";
  const WA_NUMBER = "541139467076";

  // Mapeo: SKU en Supabase → key del atributo data-precio en el HTML
  const SKU_TO_DATA_KEY = {
    "PEC_KG": "pechuga_kg",
    "PAT_KG": "pata_muslo_kg",
    "MAP_HUE": "maple_huevos",
    "PACK_FAMILIAR": "pack_familiar",
    "PACK_ASADO": "pack_asado",
    "PACK_FAMILIA_XL": "pack_familia_xl",
  };

  function formatPrecio(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
  }

  function buildWaLink(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  async function cargarCatalogo() {
    try {
      const res = await fetch(SUPABASE_URL + "/rest/v1/rpc/get_catalogo_publico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON,
          "Authorization": "Bearer " + SUPABASE_ANON,
        },
        body: "{}",
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const productos = await res.json();
      const porSku = {};
      productos.forEach((p) => { porSku[p.sku] = p; });

      // Rellenar todos los <span data-precio="...">
      Object.entries(SKU_TO_DATA_KEY).forEach(([sku, dataKey]) => {
        const prod = porSku[sku];
        if (!prod) return;
        $$("[data-precio='" + dataKey + "']").forEach((el) => {
          el.textContent = formatPrecio(prod.precio);
        });
      });

      // Construir el mensaje WhatsApp con la cantidad elegida en el input.
      // El bot (v9+) entiende texto libre del estilo "quiero N kg de X" y arma el carrito.
      function buildMensaje(sku, cantidad) {
        const prod = porSku[sku];
        if (!prod) return "Hola FD Avícola, quiero hacer un pedido.";
        if (prod.tipo === "por_kg") {
          return "Hola FD Avícola, quiero pedir " + cantidad + " kg de " + prod.nombre + ".";
        }
        if (prod.tipo === "unidad") {
          const palabra = cantidad === 1 ? "maple" : "maples";
          return "Hola FD Avícola, quiero pedir " + cantidad + " " + palabra + " de huevos.";
        }
        if (prod.tipo === "combo") {
          return "Hola FD Avícola, quiero el " + prod.nombre + " (" + (prod.descripcion || prod.nombre) + ").";
        }
        return "Hola FD Avícola, quiero pedir " + prod.nombre + ".";
      }

      // Para cada botón con data-wa-producto, sincronizarlo con su input de cantidad
      $$("[data-wa-producto]").forEach((btn) => {
        const sku = btn.getAttribute("data-wa-producto");
        const prod = porSku[sku];
        if (!prod) return;

        const qtyInput = $("[data-qty-for='" + sku + "']");

        const refresh = () => {
          let cantidad = 1;
          if (qtyInput) {
            const v = parseFloat(qtyInput.value || "0");
            cantidad = isNaN(v) || v <= 0 ? 1 : v;
          }
          btn.setAttribute("href", buildWaLink(buildMensaje(sku, cantidad)));
        };

        refresh();
        if (qtyInput) {
          qtyInput.addEventListener("input", refresh);
          qtyInput.addEventListener("change", refresh);
        }
      });
    } catch (err) {
      console.warn("No se pudo cargar catálogo desde Supabase, usando fallback:", err);
      // Fallback: cargar precios.json estático (precios viejos, pero mejor que vacío)
      try {
        const res = await fetch("data/precios.json");
        const fallback = await res.json();
        Object.entries(fallback).forEach(([key, precio]) => {
          $$("[data-precio='" + key + "']").forEach((el) => {
            el.textContent = formatPrecio(precio);
          });
        });
      } catch (e) {
        console.error("Fallback también falló:", e);
      }
    }
  }

  cargarCatalogo();
})();
